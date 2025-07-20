<template>
  <a-modal v-model:visible="dialogShow" @ok="handleOk" @cancel="handleCancel">
    输入框
    <a-input v-model="formInfo.name"></a-input>
    下拉框
    <a-select v-model="formInfo.keys" :options="formInfo.opts" :field-names="{
      label: 'name',
      value: 'key'
    }">

    </a-select>
  </a-modal>
</template>

<script setup>
import { ref, watch, computed, toRefs, onMounted } from 'vue';
import CommonCard from '@/components/common-card.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  editData: {
    type: Object,
    default: () => { }
  }
});

const { visible, editData } = toRefs(props);

const dialogShow = computed({
  get: () => props.visible,
  set: (newValue) => emit('update:visible', newValue),
});

const emit = defineEmits(['update:visible']);

const formInfo = ref({
  name: '',
  keys: [],
  opts: []
});


const handleOk = () => {
  emit('update:visible', false);

};
const handleCancel = () => {
  emit('update:visible', false);
};

const init = () => {
  if (editData.value.key) {
    setTimeout(() => {
      formInfo.value = editData.value;
    }, 300);
  } else {
    formInfo.value = {
      name: '',
      keys: [],
      opts: []
    }
  }
}

watch(visible,
  (newVal) => {
    console.log('我被监听了');
    newVal && init();
  }
);

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>