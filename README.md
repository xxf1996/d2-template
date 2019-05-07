# d2-template

一套基于`d2admin`的后台管理模板。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
# or
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 模板说明

### vuex结构

`vuex`相关设置放在`store`文件夹中，对`d2admin`原有结构作了一些调整；每个文件夹作为一个`module`，而文件夹中的每个`js`文件（除`index.js`）作为其中的一个子模块。

`d2admin`原有的`vuex`设置放在`store/d2admin`下，即相当于`store`中`d2admin`模块，与原有的并不冲突。若要增加业务相关的`vuex`设置可参照`store/demo`，视复杂程度决定是否进行子模块的拆分（若不复杂直接使用`index.js`即可）。


### 数据持久化

1. `cookie`操作相关函数在`libs/cookies.js`文件中；

2. `cookie`和`localstorage`的`key`默认都加了前缀（`package.json`中的`name` + `version`）

3. 利用`package.json`中的`appName`来设置站点名称；

### mock数据

`mock`数据的设置在`src/mock`文件夹，是否开启`mock`可以在`vue.config.js`中进行设置。
