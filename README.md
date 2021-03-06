# manageGulp-包含多个测试版本


## 搭建步骤  

``` bash
# 进入view文件夹  

cd view  

# 安装依赖包    

npm install  


# 清空编译文件 

gulp del 


# 开发时——执行文件编译和监听 (包含less编译压缩合并、js压缩、图片压缩,html内容替换)  

gulp 

# 生成线上环境代码——一次执行清空、编译静态文件、增加版本号  

gulp del  
gulp static  
gulp html  


```

``` bash
# 开发过程中执行 

npm run dev  



# 生成线上文件时 

npm run build  
 


```

## 项目说明

### 功能  

1、使用less编译css，并执行压缩  

2、js的压缩     

3、图片压缩      

4、html页面内容的替换（增加头部代码'# coding: utf-8 \n'；替换css和js及img的路径）      

5、css和js的版本号控制（增加css和js版本号）       

6、px与rem像素的自适应  

7、页面自动刷新（更改html/css/js） 

8、生成sourcemaps文件（更改html/css/js）
 

 


## view目录说明  

**html/**       *-----本地编写的静态html文件*  
**src/**            *-----本地less、js、图片源文件*  
**static_dest/**    *-----本地css、js、图片过渡文件，也是html/的静态文件引用的资源路径,其中css和js未压缩，发布问题处理*  


---
## 备注  
**非自己写的公用文件不能更改，可以联系文件作者酌情调整**  
**src/less/lib/、src/js/plug/、src/js/common可自己添加需要用的新文件**  
**src/js/plug/、src/js/common添加新文件后，需要在src/js/require-config.js注册才能使用**   

---

### 1、src/less详细说明  
**common/common.less** *-----公共样式，包含弹框、提示框、通用颜色、字体大小等;*  
**lib/** *-----通用的特效样式，date/是jqueryMobile的日期插件样式；iosselect是仿iOS选择的日期样式*  
其余文件，对应相应的html需要的css文件，文件名称尽量保持与html文件名称一致  
**引入公用文件的方法**   @import "./common/common";  双引号里面为文件路径，可以省略.less后缀  


---

### 2、src/js详细说明  
**common/** *-----公共插件，包含弹框、提示框、日期、js模板等*  
**plug/** *-----通用的特效插件，date/是jqueryMobile的日期插件；iosselect是仿iOS选择的日期插件*  
其余文件，对应相应的html的路径及需要的js文件，文件名称尽量保持与html文件名称一致  
关于公用js的功能说明，可以查看require-config.js   
**改配置的js模块化使用的是require.js**  

---
---


## view目录说明 
1、view——一步到位，本地编译压缩后复制到线上文件夹（压缩、map、版本）  
2、view_mun——分成本地开发和线上部署两个步骤  
3、view_on——同上  
4、view_on2——在3的基础上，将压缩、生成sourcemaps都转移到线上部署npm run build执行；同上不删除开发过程中的img文件夹（img压缩执行不完全）；小于10M的图片转化成base64编码，减少http请求  
5、view_on2——在4的基础上，尝试将require模块合并  
6、view_on5——正式环境,分npm run dev  和 npm run build 两种方式，增加了mock数据的模式。A-mock数据的name.js文件统一放在src/js/common/mock 文件夹下面，名字name保持与调用该js的主文件名字相同（便于后期测试维护）；B-mock文件夹下面的js文件同样需要在require-config.js中进行路径名称注册，名称格式mock_name,便于查看文件逻辑；mock查看http://mockjs.com/0.1/#natural  
  



