<template>
  <div class="water-mark" ref="waterMarkRef"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const waterMarkRef = ref();

function createWaterMarkDom(){
  const waterMarkDom = document.createElement('div');
  waterMarkDom.classList.add('water-mark');
  waterMarkDom.style.position = 'fixed';
  waterMarkDom.style.top = 0;
  waterMarkDom.style.right = 0;
  waterMarkDom.style.bottom = 0;
  waterMarkDom.style.left = 0;
  waterMarkDom.style.pointerEvents = 'none';
  waterMarkDom.style.backgroundRepeat = 'repeat';
  waterMarkDom.style.zIndez = 9999;
  
  document.body.appendChild(waterMarkDom);
  return waterMarkDom;
};

// 产生水印
function createWaterMark() {
  // 生成水印的时候，最好水印的容器都是由js 生成，避免人为删除元素导致元素消失，最后不能生成水印
  // const waterMarkDom = createWaterMarkDom();
 
  const { innerHeight, innerWidth } = window;
  const xCount = 6,
    yCount = 10,
    angle = 0,
    opacity = 0.1;
  const textArr = [
    "臣本布衣躬耕于南阳苟全性命于乱世不求闻达于诸侯猥自枉屈",
    "09让42碳4碳停语言5一53<・)))><<5u55456u",
    "09",
  ];
  const canvas = document.createElement("canvas");
  canvas.width = innerWidth / xCount;
  canvas.height = innerHeight / yCount;
  const rowWidth = Math.floor(canvas.width);
  const ctx = canvas.getContext("2d");
  // 通过将区域中的元素设置完全透明的黑色，达到擦除区域中元素的目的
  ctx.clearRect(0, 0, innerWidth / xCount, innerHeight / yCount);
  ctx.fillStyle = "#000";
  ctx.globalAlpha = opacity;
  ctx.font = "14px ui-sans-serif";
  ctx.rotate((Math.PI / 180) * angle);
  const offsetTop = (innerHeight / yCount - textArr.length * 20) / 2;

  let resultTextArr = [];

  textArr.forEach((item) => {
    if (ctx.measureText(item).width > rowWidth) {
      const result = generateResultTextArr(ctx, item, rowWidth) || [];
      resultTextArr = resultTextArr.concat(result);
    } else {
      resultTextArr.push(item);
    }
  });

  for (let i = 0; i < resultTextArr.length; i += 1) {
    ctx.fillText(resultTextArr[i], 0, offsetTop + 20 * i);
  }
  const bgUrl = canvas.toDataURL();
  // waterMarkDom.style.backgroundImage = "url(" + bgUrl + ")";

  waterMarkRef.value.style.backgroundImage = "url(" + bgUrl + ")";
}

// 根据canvas宽度自动换行
function generateResultTextArr(ctx, str, rowWidth, result = []) {
  const strLen = str.length;
  let textArr = result;
  for (let i = 0; i < strLen; i++) {
    const subStr = str.substring(0, i);
    if (ctx.measureText(subStr).width > rowWidth) {
      textArr.push(str.substring(0, i));
      const restStr = str.substring(i);
      if (ctx.measureText(restStr).width > rowWidth) {
        generateResultTextArr(ctx, restStr, rowWidth, textArr);
      } else {
        textArr.push(restStr);
      }
      break;
    }
  }
  return textArr;
}

function observeWaterMark() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((item) => {
      if (item.removedNodes.length > 0) {
        console.log("水印已经移除");
        createWaterMark();
      }
      if (item.type == "attributes") {
        console.log("检测到水印属性被修改，已重置属性");
        createWaterMark();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true,
    attributesOldValue: true,
    characterData: true,
    characterDataOldValue: true,
  });
}

onMounted(() => {
  createWaterMark();
  // 监控水印是否被删除
  //  observeWaterMark();
});
</script>

<style lang="scss" scoped>
.water-mark {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  pointer-events: none;
  background-repeat: repeat;
  z-index: 9999;
}
</style>
