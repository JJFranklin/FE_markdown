<template>
    <div class="base-tree">
        <el-button type="primary" @click="add">+1</el-button>
        reactive:
        {{ obj.arr }}
        {{ obj.num }}
        {{ obj.test.a.b.c.d }}
        ref:
        {{ numObj.count }}
        {{ numObj.arr }}

        {{ initVal }}

    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

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

function add() {
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
</script>

<style lang="scss" scoped></style>