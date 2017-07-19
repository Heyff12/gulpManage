/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-less gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr gulp-autoprefixer gulp-rev-append gulp-shell amd-optimize fs path browser-sync del --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩
    less = require('gulp-less'), //less
    minifycss = require('gulp-minify-css'), //css压缩
    jshint = require('gulp-jshint'), //js检查
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'), //清空文件夹--同del，本例取消clean
    autoprefixer = require('gulp-autoprefixer'), //使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀
    rev = require('gulp-rev-append'), //给页面的引用添加版本号，清除页面引用缓存
    shell = require('gulp-shell'),
    amdOptimize = require('amd-optimize'), //打包 require.js 模块依赖
    fs = require('fs'),
    path = require('path'),
    browserSync = require('browser-sync'), //同步浏览器更新
    del = require('del'), //删除文件
    header = require('gulp-header'), //给文件头部增加特殊内容
    changed = require('gulp-changed'), //检测变化的文件
    jscs = require('gulp-jscs'), //代码风格检测
    ev = require('gulp-rev'), //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'), //- 路径替换
    //px2rem = require('gulp-px2rem'),//单位转化
    postcss = require('gulp-postcss'), //单位转化px--rem
    px2rem = require('postcss-px2rem'), //单位转化px--rem
    tinylr = require('tiny-lr'), //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'); //livereload
var file_road = {
    cssSrc: './src/less/**/*.less',
    cssSrc_mid: './src/css',
    cssDst: './static_dest/static/new/css',
    cssDst_end: '../bin/static/new/css',

    jsSrc: ['./src/js/**/*.js'],
    jsDst: './static_dest/static/new/js',
    jsDst_mid: ['./static_dest/static/new/js/**/*.js', '!./static_dest/static/new/js/require-config.js', '!./static_dest/static/new/js/require-config2.js'],
    jsDst_end: '../bin/static/new/js',

    imgSrc: './src/img/**/*',
    imgDst: './static_dest/static/new/img',
    imgDst_end: '../bin/static/new/img',

    htmlSrc: './html/**/*.html',
    htmlDst: './static_dest/template',

    w_cssSrc: 'src/less/**/*.less',
    w_jsSrc: ['src/js/**/*.js', '!src/js/require-config.js', '!src/js/require-config2.js'],
    w_imgSrc: 'src/img/**/*',
    w_htmlSrc: 'html/**/*.html',

    src_source: './src/**/*',
    w_src_source: 'src/**/*',
    w_dst_source: './static_dest/static/new/**/*',
    w_dsthtml_source: './static_dest/template/**/*',

    copy_src: './static_dest/static/new/**/*',
    copy_dest: '../bin/static/new',
};
var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');
// 样式处理
gulp.task('css', function() {
    var processors = [px2rem({ remUnit: 37.5 })];
    gulp.src(file_road.cssSrc)
        .pipe(less({ style: 'expanded' }))
        .pipe(livereload(server))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'last 2 Explorer versions', 'last 3 Safari versions', 'Firefox >= 20', '> 5%'],
            cascade: true, //是否美化属性值 默认：true 像这样：//-webkit-transform: rotate(45deg);transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        //.pipe(px2rem())----变很大
        .pipe(postcss(processors)) //--变得有点小
        .pipe(header(banner, { pkg: pkg })) //增加头部注释
        .pipe(gulp.dest(file_road.cssDst)) //本地目录
        .pipe(minifycss()) //todo暂时隐藏压缩
        .pipe(gulp.dest(file_road.cssDst_end)); //最终目录
});

//语法检查
gulp.task('jshint', function() {
    return gulp.src(file_road.jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// js处理
gulp.task('js', function() {
    gulp.src(file_road.jsSrc)
        .pipe(jshint.reporter('default')) //代码检测
        .pipe(gulp.dest(file_road.jsDst));
    gulp.src(file_road.jsDst_mid)     //本地目录
        .pipe(uglify({ //todo暂时隐藏压缩
            mangle: false, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
            mangle: { except: ['require', 'exports', 'module', '$'] } //排除混淆关键字
        }))
        .pipe(header(banner, { pkg: pkg })) //增加头部注释
        .pipe(livereload(server))
        .pipe(gulp.dest(file_road.jsDst_end)); //最终目录
});

// 图片处理
gulp.task('images', function() {
    gulp.src(file_road.imgSrc)
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(livereload(server))
        .pipe(gulp.dest(file_road.imgDst)) //本地目录
        .pipe(gulp.dest(file_road.imgDst_end)); //最终目录
});

// 清空图片、样式、js
gulp.task('clean', function(cb) {
    del(file_road.w_dst_source, cb);
});
gulp.task('cleanhtml', function(cb) {
    del(file_road.w_dsthtml_source, cb);
});

// HTML处理--不使用
gulp.task('html', function() {
    gulp.src(file_road.htmlSrc)
        .pipe(header('# coding: utf-8 \n')) //增加头部代码
        .pipe(livereload(server))
        .pipe(gulp.dest(file_road.htmlDst))
});

//赋值另一份static---删除文件无效
gulp.task('copy', function() {
    //del(file_road.copy_dest);
    gulp.src(file_road.copy_src)
        .pipe(livereload(server))
        .pipe(gulp.dest('./static_dest1/static/new'));
});


// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {

    // 监听html
    //gulp.watch(file_road.w_htmlSrc, ['html']);

    // 监听css
    gulp.watch(file_road.w_cssSrc, ['css']);

    // 监听images
    gulp.watch(file_road.w_imgSrc, ['images']);

    // 监听js
    gulp.watch(file_road.w_jsSrc, ['js']);

    //监听删除
    var watcher = gulp.watch([file_road.w_src_source, file_road.w_htmlSrc]);
    watcher.on('change', function(event) {
        //console.log(event.type);
        if (event.type === 'deleted') {
            var src = path.relative(path.resolve('src'), event.path);
            src = src.replace(/.es6$/, '.js');
            console.log(src);
            var dest;
            if (src.split('/')[0] == 'less') {
                //src=src.split('.')[0]+'.css';
                src = src.replace(/less/g, 'css');
            }
            // if (src.split('/')[1] == 'html') {
            //     //src=src.split('.')[0]+'.css';
            //     src = src.replace(/\.\.\/html\//, '');
            //     dest = path.resolve(file_road.w_dsthtml_source, src);
            //     console.log(src);
            //     del.sync(dest);
            //     return false;
            // }
            console.log(src);
            dest = path.resolve(file_road.w_dst_source, src);
            del.sync(dest);
        }
    });
});
// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('init', ['clean', 'jshint'], function() {
    gulp.start('css', 'images', 'js', 'html', 'watch');
});
gulp.task('default', function() {
    gulp.start('css', 'images', 'js', 'watch');
});
//重要备注：less文件名和路径中当中不能包含‘less’；html文件名当中不能包含‘.’
