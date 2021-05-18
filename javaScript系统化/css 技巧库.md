1. flex 布局下，min-heigeht 和min-width 不生效的问题，将flex 布局容器外面套一个flex容器

2. ie 11 下 `flex:1` 解析`flex:1 1 0 ` ，分来写成 `flex-grow:1,flex-basic:auto,flex-shrik:1`

3. 浮动

   ```
   1、浮动元素脱离文档流
   2、浮动元素脱离了文档流，表现为display:block块状元素，会占据dom位置，并且遮挡其他元素
   3、浮动元素的位置，向左浮动，最远到父元素左边界，向右浮动，最到父元素的右边界，最高的位置在父元素的内边距最顶部；
   4、向左浮动元素的左边界不超过之前浮动元素的右边界，向右浮动元素的右边界，一定不超过之前向右浮动元素的左边界；
   5、同一行的两个浮动元素，一个向左浮动，一个向右边浮动，两个元素宽度之和大于父元素的宽度，向右浮动的元素会换行，并向右浮动；
   - 包含浮动元素的父元素会高度发生坍塌，因为，父元素限制了浮动元素的上、左、右的边界，浮动元素脱离了父元素，此时父元素，就只能依据内容高度撑开
   - 解决坍塌的方式：清除浮动
   清除浮动原理：挨着浮动的元素，清除浮动之后，挨着的元素会被浮动元素挤到下一行，并且在还在父元素内部，所以父元素只有增加高度才能包裹下内部的元素；
   表现起来，就像在浮动元素后插入了一个display:block的元素，此元素还在父元素内部，因此整个高度就被撑起来
   清除浮动方式：
   1、挨着浮动元素的元素，设置clear:both 属性，清除掉浮动；
   2、根据原理，在父元素中，插入一个display:block；clear:both;height:0;的元素;
   3、父元素设置伪元素:after{content:" ";display:table;clear:both;}
   4、利用bfc 原理清除浮动：bfc 区域内外布局不会相互影响，会将浮动元素的高度计算在内；
   
   —— BFC 原理
   独立的渲染区域，内部元素的选择不会影响外部元素的样式
   1、块状格式化上下文：能解决浮动的问题和上下margin,重叠的问题；
   产生bfc方式
   1、float不是 none;
   2、display是inline-block、table-cell、flex;
   3、position是absolute或者fixed;
   4、overflow不是visible;
   
   ```

   资料参考

   [1、清除浮动](https://juejin.im/post/6844903504545316877)

   [2、BFC ](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

4、自定义滚动条样式

```css
// .scorll 出现滚动条样式的dom元素
/*滚动条整体样式*/
.scorll::-webkit-scrollbar {
    width: 4px;
    height: 0px;
}

/*滚动条滑块*/
.scorll::-webkit-scrollbar-thumb {
    background: #fff;
}

/*滚动条轨道*/
.scorll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    background: rgb(135,90,207);
}
```

```css
flex布局技巧
1、让所有的子元素宽度相等，flex:1 1 0,基础的长度为0，剩余的空间全部均匀分给子元素；
2、所有的子元素宽度相等，并且不换行，超过你长度，出现省略号
box{
  flex:1 1 100px; // 设置基础的长度，剩余的长度按照比例分配
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:no-wrap;
}
3、收缩比例的问题
flex-shrink
触发条件：子元素的总长度超过容器的长度，就会按照比例收缩
例子：三个box 分别是100px 200px 3000px,flex-shrink分别为1，2，3容器总长是500px，超出的100px,按照比例减少
总权重:100*1+2*200+3*300 = 1400;
收缩宽度：100*1/1400 * 100,200*2/1400 *100,300*3/1400 *100
剩余宽度 = 原长度 - 收缩宽度
```



5、使用padding 水平居中显示显示

```css
padding:calc(父元素宽度50% - 子元素宽度*50%);
```

marging 负值的情况

Marging-top、margin-left  本身元素向上、向左移动

Marigin-bottom、margin-ritgh 本身元素不变化，挨着的元素向上、向左移动

![image-20210516213336538](/Users/hemingming/Library/Application Support/typora-user-images/image-20210516213336538.png)



6、水平垂直居中

```css
// 需要知道子元素宽高或者子元素尺寸，兼容性好的情况
ele{
  position:absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
  margin:auto;
}
// transform  兼容性比较差
ele{
  position:absolute;
  top:50%;
  left:50%;
	transform:translate(-50%,-50%);
}
```

line-height 继承

父级的line-height 是具体px 或者1.4、3这样的数字，那么子元素继承父元素的line-height 的值，然后和自己的font-size 的值相乘，得到本元素的line-height

父元素的line-height 值是百分比，此时，子元素继承的是，父元素font-size * 父元素line-height 的值，子元素继承上面计算后的结果