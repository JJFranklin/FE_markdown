<template>
  <el-form-item :label="item.label" :prop="item.prop" :label-width="item.labelWidth" :required="item.required"
    :rules="item.rules">
    <!-- 输入框 -->
    <el-input v-if="item.type === 'input'" v-model="modelValue" v-bind="item.attrs"
      :placeholder="item.placeholder || `请输入${item.label}`" clearable />

    <!-- 数字输入框 -->
    <el-input-number v-else-if="item.type === 'number'" v-model="modelValue" v-bind="item.attrs"></el-input-number>

    <!-- 下拉选择器 -->
    <el-select v-else-if="item.type === 'select'" v-model="modelValue" v-bind="item.attrs"
      :placeholder="item.placeholder || `请选择${item.label}`" clearable>
      <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
    </el-select>

    <!-- 单选按钮组 -->
    <el-radio-group v-else-if="item.type === 'radio'" v-model="modelValue" v-bind="item.attrs">
      <el-radio v-for="option in item.options" :key="option.value" :label="option.value">
        {{ option.label }}
      </el-radio>
    </el-radio-group>

    <!-- 多选框组 -->
    <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="modelValue" v-bind="item.attrs">
      <el-checkbox v-for="option in item.options" :key="option.value" :label="option.value">
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>

    <!-- 开关 -->
    <el-switch v-else-if="item.type === 'switch'" v-model="modelValue" v-bind="item.attrs" />

    <!-- 日期选择器 -->
    <el-date-picker v-else-if="item.type === 'date'" v-model="modelValue" v-bind="item.attrs"
      :placeholder="item.placeholder || `请选择${item.label}`" />

    <!-- 时间选择器 -->
    <el-time-picker v-else-if="item.type === 'time'" v-model="modelValue" v-bind="item.attrs"
      :placeholder="item.placeholder || `请选择${item.label}`" />

    <!-- 日期时间选择器 -->
    <el-date-picker v-else-if="item.type === 'datetime'" v-model="modelValue" type="datetime" v-bind="item.attrs"
      :placeholder="item.placeholder || `请选择${item.label}`" />

    <!-- 级联选择器 -->
    <el-cascader v-else-if="item.type === 'cascader'" v-model="modelValue" :options="item.options" v-bind="item.attrs"
      :placeholder="item.placeholder || `请选择${item.label}`" />

    <!-- 滑块 -->
    <el-slider v-else-if="item.type === 'slider'" v-model="modelValue" v-bind="item.attrs" />

    <!-- 评分 -->
    <el-rate v-else-if="item.type === 'rate'" v-model="modelValue" v-bind="item.attrs" />

    <!-- 颜色选择器 -->
    <el-color-picker v-else-if="item.type === 'color'" v-model="modelValue" v-bind="item.attrs" />

    <!-- 自定义插槽 -->
    <slot v-else-if="item.slot" :name="item.slot" :item="item" :value="modelValue" />

    <!-- 默认渲染为文本输入框 -->
    <el-input v-else v-model="modelValue" :placeholder="item.placeholder || `请输入${item.label}`" clearable />
  </el-form-item>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Date, Object],
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

// 处理双向绑定
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    emit('change', value);
  }
});
</script>