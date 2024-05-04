function autoScale(selector, options) {
  // 获取大屏容器元素
  const el = document.querySelector(selector);
  // 设计稿上的宽度和高度
  const { width, height } = options;
  // 设置初始缩放比例和中心点
  el.style.transformOrigin = "top left";
  function init() {
    // innerWidth 屏幕实时缩放大小的宽度
    // innerHeight 屏幕实时缩放大小的高度
    const scaleX = innerWidth / width;
    const scaleY = innerHeight / height;
    // 取缩放比例小的值，保证大屏内容完整显示在容器内
    const scale = Math.min(scaleX, scaleY);
    // 计算偏移量，将大屏内容居中显示
    const left = (innerWidth - width * scale) / 2;
    const top = (innerHeight - height * scale) / 2;
    // 应用缩放和偏移量
    el.style.transform = `translate (${left}px, ${top}px) scale (${scale})`;
  }
  init();
  addEventListener("resize", init);
}
