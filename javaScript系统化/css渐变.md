### 渐变

分类

- 线性渐变
- 径向渐变
- 圆锥渐变

常见的应用场景

- 背景图渐变
- 边框渐变
- 文字渐变



#### 1、线性渐变

语法

```css
非重复渐变
background-image: linear-gradient(direction, color1 color-start,color-stop,color2 color-start,color-stop,color3 color-start,color-stop...);

direction: 渐变方向，默认是从上到下 to bottom 可选
语法：to left|right|top|bottom|top left|top right|bottom left|bottom right
color: 颜色值
color-start: 百分比 30%、80px 非必须 颜色开始的位置 可选
color-stop:百分比 30%、80px 颜色结束的位置

重复渐变
background-image: repeating-linear-gradient(direction, color1 color-start,color-stop,color2 color-start,color-stop,color3 color-start,color-stop...);
```

[示例](../static-pages/css-gradient-example.html/#example1)

#### 2、径向渐变

语法

```css
非重复渐变
background-image: radial-gradient(shape size at position, color1 color-start,color-stop,color2 color-start,color-stop...);

shape：定义形状（圆形或椭圆）circle|ellipse，可选，默认为椭圆 
size：半径大小/指定形渐变结束的边界，可选。closest-side|farthest-side|closest-corner|farthest-corner|具体数值、一个值为圆|两个值为椭圆 默认值为
position：定义圆心位置，可选，默认为形状的中心点at center|top|right|bottom|left|top left|top right|bottom left|bottom right|具体数值
start-color：定义开始颜色
stop-color：定义结束颜色


重复渐变
background-image: repeating-radial-gradient(shape size at position, color1 color-start,color-stop,color2 color-start,color-stop...);
```

[示例](../static-pages/css-gradient-example.html)

![圆形径向渐变起止位置示意](https://image.zhangxinxu.com/image/blog/201711/circle-gradient-end.png)

![radial-side.png](https://segmentfault.com/img/remote/1460000021694788)



![radial-corner.png](https://segmentfault.com/img/remote/1460000021745376)

#### 3、圆锥渐变

语法

```css
非重复渐变
background-image: conic-gradient(from angle at position, color1 color-start color-stop,color2 color-start color-stop,color3 color-start color-stop... )

语法
from angle：起始的角度，可选，默认为从上到下，默认角度 0deg
position：圆锥锥点的位置
color-start: 颜色开始的位置 百分比|deg
color-stop:颜色结束的位置 百分比|deg

重复渐变
background-image: repeating-conic-gradient(from angle at position, color1 color-start,color-stop,color2 color-start,color-stop,color3 color-start,color-stop... )
```

[示例](../static-pages/css-gradient-example.html)

![lottery.png](https://segmentfault.com/img/remote/1460000021731406)



#### border-image-slice 基本原理图解

![微信图片_20210906094537](C:\Users\hemingming\OneDrive - 北京旷视科技有限公司\桌面\微信图片_20210906094537.png)

border-image-slice: top right bottom left;

表示切片边界线（红色线）离边界的距离，然后把切片填充在边框的对应区域，根据实际情况进行缩放，能够放下。

0-50% ：切片逐渐增大 , 填充到对应的边框区域；

50% ：所有的边界线到了中间位置，切出了上下左右四个角的切片，填充到边框上下左右四个角，所以会出现边框中间段是空白。

50% - 100%：切片逐渐增大 , 填充到对应的边框区域



```css
.lottery {
    position: relative;
    margin: 0 auto;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background-image: repeating-conic-gradient(#ff8586 0 45deg, #ff9e9d 45deg 90deg);
    border: solid 30px #fd5d5c;
    li{
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -50px;
        width: 100px;
        height: 210px;
        line-height: 100px;
        color: #fff;
        text-align: center;
        transform-origin: center 100%;
        list-style: none;
    }
    @for $i from 1 through 8 {
        $deg: 360 / 8;
        li:nth-child(#{$i}) {
            transform: rotate((22.5 + $deg * ($i - 1))* 1deg);

            &:before {
                content: '奖品#{$i}';
            }
        }
    }
}

.button-lottery {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -60px 0 0 -60px;
    padding: 12px;
    width: 120px;
    height: 120px;
    font-size: 24px;
    font-weight: bold;
    color: #f6524f;
    background: #ffde43;
    border-radius: 50%;
    border: solid 15px #fcf087;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;

    &:before {
        position: absolute;
        bottom: 99%;
        width: 20px;
        height: 50px;
        background: #ffde43;
        clip-path: polygon(50% 0, 100% 100%, 0 100%);
        content: ''
    }

    &:hover {
        background: #ffd621;

        &:before {
            background: #ffd621;
        }
    }
}
```





