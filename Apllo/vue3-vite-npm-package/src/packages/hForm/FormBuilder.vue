<template>
  <div class="form-builder">
    <el-form ref="formRef" :model="formData" :rules="formRules" :label-width="config.labelWidth || '120px'"
      :label-position="config.labelPosition || 'right'" :size="config.size || 'default'"
      :status-icon="config.statusIcon" :inline="config.inline" @validate="handleValidate">
      <template v-for="(item, index) in config.items" :key="index">
        <FormItem :item="item" v-model="formData[item.prop]" @change="handleItemChange(item.prop, $event)"></FormItem>
      </template>

      <!-- 表单操作按钮 -->
      <el-form-item v-if="config.action && config.action.btns">
        <el-space v-bind="config.action.attr">
          <el-button v-for="(btn, idx) in config.action.btns" :key="idx" :type="btn.type || 'primary'"
            :size="btn.size || config.size || 'default'" :icon="btn.icon" :loading="btn.loading"
            @click="handleAction(btn)">
            {{ btn.label }}
          </el-button>
        </el-space>
      </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import FormItem from './FormItem.vue';

const props = defineProps({
  config: {
    type: Object,
    required: true,
    default: () => ({})
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'validate', 'action']);

// 表单引用
const formRef = ref(null);

// 表单数据
const formData = reactive({ ...props.modelValue });

// 表单验证规则
const formRules = computed(() => {
  const rules = {};
  props.config.sections?.forEach(section => {
    section.items?.forEach(item => {
      if (item.rules) {
        rules[item.prop] = item.rules;
      }
    });
  });
  return rules;
});

// 监听外部数据变化
watch(() => props.modelValue, (newVal) => {
  Object.assign(formData, newVal);
}, { deep: true });

// 处理表单项变化
const handleItemChange = (prop, value) => {
  formData[prop] = value;
  emit('update:modelValue', formData);
};

// 处理验证事件
const handleValidate = (prop, isValid, message) => {
  emit('validate', { prop, isValid, message });
};

// 处理操作按钮点击
const handleAction = (action) => {
  if (action.validate) {
    formRef.value.validate((valid) => {
      if (valid) {
        emit('action', { name: action.name, data: formData });
      } else {
        console.log('表单验证失败');
      }
    });
  } else {
    emit('action', { name: action.name, data: formData });
  }
};

// 公开表单验证方法
defineExpose({
  validate: () => formRef.value.validate(),
  resetFields: () => formRef.value.resetFields(),
  clearValidate: () => formRef.value.clearValidate(),
  getFormData: () => formData
});
</script>

<style scoped>
.form-builder {
  /* padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); */
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  padding: 12px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
  color: #303133;
}

.form-actions {
  margin-top: 24px;
  /* text-align: center; */
}
</style>