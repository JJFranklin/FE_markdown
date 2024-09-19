<template>
    <div class="base-tree">
        <el-button type="primary" @click="add">+1</el-button>
        reactive:
        <!-- {{ obj.arr }} -->
        {{ obj.num }}
        {{ obj.test.a.b.c.d }}
        ref:
        <!-- {{ numObj.count }}
        {{ numObj.arr }} -->

        {{ initVal }}

        {{ customNum }}

    </div>
</template>

<script setup>
import { ref, reactive, computed,readonly, shallowReadonly, shallowReactive, watch } from 'vue';

const initVal = 5;

const rawNumObj = {
    count: 0,
    arr: [1, 2, 3],
    test: {
        a: {
            b: {
                c: {
                    d: 1
                }
            }
        }
    }
};
const numObj = ref(rawNumObj);
const obj = reactive({
    num: 0, arr: [1, 2, 3], test: {
        a: {
            b: {
                c: {
                    d: 1
                }
            }
        }
    }
});

let customNum = ref(10);
watch(obj,(newVal)=>{
    console.log('newVal', newVal.num);
});

function add() {
    customNum.value ++;
    obj.num++;
    obj.arr.push(Math.random());
    obj.test.a.b.c.d++;

    numObj.value.count++;
    numObj.value.test.a.b.c.d++;
    numObj.value.arr.push(Math.random());

    console.log(obj, '----', numObj, '-----', rawNumObj);
}

// 计算属性
const c1 = computed(() => {
    return { name: '' };
});

const name = ref('franklin');
console.log('refName',name);
const person = shallowReactive({
    name:'franklin',
    age:19
},true,true);
console.log('reactive-person',person);
</script>

<style lang="scss" scoped></style>