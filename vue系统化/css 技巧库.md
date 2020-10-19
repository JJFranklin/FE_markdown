1. flex 布局下，min-heigeht 和min-width 不生效的问题，将flex 布局容器外面套一个flex容器

2. ie 11 下 `flex:1` 解析`flex:1 1 0 ` ，分来写成 `flex-grow:1,flex-basic:auto,flex-shrik:1`

3. 浮动

   ```
   1、浮动元素脱离文档流
   2、浮动元素脱离了文档流，表现为display:block块状元素，会占据dom位置，对比绝对定位，绝对定位脱离文档流，并且遮挡其他元素
   3、浮动元素的位置，向左浮动，最远到父元素左边界，向右浮动，最到父元素的右边界，最高的位置在父元素的内边距最顶部；
   4、向左浮动元素的左边界不超过之前浮动元素的右边界，向右浮动元素的右边界，一定不超过之前向右浮动元素的左边界；
   5、同一行的两个浮动元素，一个向左浮动，一个向右边浮动，两个宽度大于父元素的宽度，向右浮动的元素会换行，并向右浮动；
   - 包含浮动元素的父元素会高度发生坍塌，因为，浮父元素限制了浮动元素的上、左、右的边界，浮动元素脱离了父元素，此时父元素，就只能依据内容高度撑开
   - 解决坍塌的方式：清除浮动
   清除浮动原理：挨着浮动的元素，清除浮动之后，挨着的元素会被浮动元素挤到下一行，并且在还在父元素内部，所有父元素只有增加高度才能包裹下清除浮动的元素；
   表现起来，就像在浮动元素后插入了一个display:block的元素，此元素还在父元素内部，因此整个高度就被撑起来
   清除浮动方式：
   1、挨着浮动元素的元素，设置clear:both 属性，清除掉浮动；
   2、根据原理，在父元素中，插入一个display:block；clear:both;height:0;的元素;
   3、父元素设置伪元素:after{content:".";display:block;clear:both;height:0;}
   4、利用bfc 原理清除浮动：bfc 区域内外布局不会相互影响，会将浮动元素的高度计算在内；
   
   —— BFC 原理
   1、块状格式化上下文：能解决浮动的问题和上下margin,重叠的问题；
   产生bfc方式
   1、float不是 none;
   2、display是inline-block、table-cell;
   3、position是absolute或者fixed;
   4、overflow不是visible;
   
   ```

   资料参考

   [1、清除浮动](https://juejin.im/post/6844903504545316877)

   [2、BFC ](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

   

   

   

   

