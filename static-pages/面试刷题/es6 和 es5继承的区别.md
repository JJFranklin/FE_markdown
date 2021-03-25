https://zh.javascript.info/class-inheritancex

ES5 继承
```
1、首先生成子类对象实例，
2、然后在调用子类的构造函数，将父类的属性和方法添加到对象实例的this上；
```

ES6
```javaScript
1、先有父类对象实例属性和方法添加到this上面；
2、在子类的构造函数中修饰this的指向，指向子类的构造函数实例
子类是父类的实例 c.__proto__ = p
子类原型对象是父类原型对象的实例 c.prototype.__proto__ = p.prototype;
```

super
```
1、作为函数使用的时候，是父类的构造函数，可以调用父类的属性和方法；
2、作为对象使用时，是父类的原型对象；
```
