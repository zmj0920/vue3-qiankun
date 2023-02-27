# qiankun-example

qiankun 实战 demo，使用vue3+ts搭建项目。

## 开始

安装根目录工程依赖

```
npm i
```

一键安装所有主子应用的依赖

```
npm run install
```

一键启动所有所有应用

```
npm start
```

通过 [http://localhost:8080/](http://localhost:8080/) 访问主应用。

## 发布

一键构建并打包所有主子应用

```
npm run build
```


判断是否独立环境
```
isInQiankun () {
    return window.__POWERED_BY_QIANKUN__
}
```
是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
```
window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 
```