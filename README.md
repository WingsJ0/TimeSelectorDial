# 移动端转盘时间选择器

Demo 链接：http://skywingjiang.gitee.io/timeselectordial

## 主要特点

- 时间选择
- 移动端，触摸旋转
- 简单地修改CSS就可以修改样式

## 依赖技术

 - HTML，CSS，Javascript

## 图片

![image](http://skywingjiang.gitee.io/timeselectordial/DemoImage_1.jpg)

## 用法

1. 引入TimeSelectorDial.js

```html
<script src='TimeSelectorDial.js'></script>
```

脚本会创建window属性TimeSelectorDial。

2. 实例化类

```javascript
let timeSelectorDial=new TimeSelectorDial();
```

timeSelectorDial适用于管理DOM对象的虚拟对象。

3. 添加DOM对象

```javascript
body.appendChild(timeSelectorDial.dom);
```

timeSelectorDial.dom指向真正DOM元素。

4. 显示DOM对象

```javascript
let callback=function({year,month,day,hour,minute,second}){}
timeSelectorDial.show(callback);
```

显示DOM对象并传入回调函数。若点击确认按钮则向回调函数传入时间对象，若点击取消按钮则向回调函数传入null。

