<template>
  <div class="form-demo-container">
    <div class="form-preview">
      <FormBuilder v-model="formData" :config="formConfig" @action="handleAction" @validate="handleValidate"></FormBuilder>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import FormBuilder from './FormBuilder.vue';
import { userFormConfig } from './formConfig';
import { ElMessage } from 'element-plus'

const formConfig = ref(userFormConfig);
const formData = reactive({
  username: '',
  phone: '',
  role: '',
  birthday: '',
  status: true,
  gender: 'male',
  loginCount: 0,
  hobbies: ['music'],
  description: '',
  skillLevel: 50
});

const handleAction = ({ name, data }) => {
  if (name === 'submit') {
    console.log('提交表单:', data);
    ElMessage.success('表单提交成功');
  } else if (name === 'reset') {
    // 重置表单数据
    Object.assign(formData, {
      username: '',
      phone: '',
      role: '',
      birthday: '',
      status: true,
      gender: 'male',
      loginCount: 0,
      hobbies: ['music'],
      description: '',
      skillLevel: 50
    });
    ElMessage.info('表单已重置');
  }
};

const handleValidate = ({ prop, isValid, message }) => {
  if (!isValid) {
    console.log(`字段 ${prop} 验证失败: ${message}`);
  }
};
</script>

<style scoped>
.form-demo-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #f5f7fa; */
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #409EFF, #337ecc);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 32px;
}

.header p {
  margin: 10px 0 0;
  font-size: 16px;
  opacity: 0.9;
}

.content {
  display: flex;
  gap: 30px;
}

.config-preview,
.form-preview {
  /* background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); */
}

.config-preview {
  flex: 1;
  max-width: 500px;
  overflow: auto;
  max-height: 800px;
}

.form-preview {
  flex: 2;
}

h3 {
  margin-top: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
  color: #409EFF;
}

pre {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 6px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.5;
}

.form-data {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #dcdfe6;
}
</style>