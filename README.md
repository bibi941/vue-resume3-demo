# 在线简历编辑器

# Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


基于Vue实现的在线简历编辑器，具有注册、登录、编辑、分享、打印等功能，目前已发布上线。主要使用 Vue.js、Element-ui、LeanCloud 实现。
# Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 主页面
在不登录的情况下，点击编辑按钮进行编辑，可以更改、添加、删除个人信息和技能以及项目经历，点击打印按钮调用打印机,点击保存按钮则跳转到登录页面，登录后则可以登出，使用local storage存储用户id实现保存登录状态功能
![](https://user-gold-cdn.xitu.io/2018/6/10/163ea2e5400d2590?imageView2/2/w/900)
![](https://user-gold-cdn.xitu.io/2018/6/10/163ea3815d7bd9e7?imageView2/2/w/900)
![](https://user-gold-cdn.xitu.io/2018/6/10/163ea3895a98d54e?imageView2/2/w/900)

## 登录界面
基于LeanCloud后台实现了注册、登录功能，
![](https://user-gold-cdn.xitu.io/2018/6/10/163ea3fe81d117be?imageView2/2/w/900)

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea47afac0ea96?imageView2/2/w/900)
