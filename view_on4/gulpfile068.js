/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-less gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr gulp-autoprefixer gulp-rev-append gulp-shell amd-optimize fs path browser-sync del --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库

    imagemin = require('gulp-imagemin'), //图片压缩
    pngquant = require('imagemin-pngquant'), //深度压缩png
    cache = require('gulp-cache'), //只压缩修改的图片--未使用（压缩不全）——目前开发使用

    less = require('gulp-less'), //less
    minifycss = require('gulp-minify-css'), //css压缩
    autoprefixer = require('gulp-autoprefixer'), //使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀
    postcss = require('gulp-postcss'), //单位转化px--rem
    px2rem = require('postcss-px2rem'), //单位转化px--rem
    base64 = require('gulp-base64'),//图片转base64编码

    jshint = require('gulp-jshint'), //js检查
    babel = require("gulp-babel"), //编译es6; //代码风格检测
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'), //js压缩
    
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'), //清空文件夹--同del，本例取消clean
    del = require('del'), //删除文件
    header = require('gulp-header'), //给文件头部增加特殊内容
    replace = require('gulp-replace'), //替换str
    path = require('path'),
    runSequence = require('run-sequence'), //按顺序执行
    rev = require('gulp-rev'), //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'), //- 路径html替换
    browserSync = require('browser-sync').create(), //页面实时刷新
    sourcemaps = require('gulp-sourcemaps'); //soucemap--生成，，sourcemaps.write('../maps/js')——>sourcemaps.write(),变成行内sourcemaps，解决了部分map不生成的问题
var file_road = {
    cssSrc: './src/less/**/*.less', //开发过程——带编译less源文件——less编译，px rem转化，,实时刷新
    cssDst: './static_dest/static/new/css', //开发过程——生成地址
    cssSrc_mid: './static_dest/static/new/css/**/*.css', //build中带转移的css源文件（待生成版本号,压缩，生成sourcemaps,）
    cssDst_end: '../bin/static/new/css', //build生成地址
    cssDst_src_mid: '../bin/static/new/css/**/*.css', //build中替换css中的图片版本号地址--源文件

    reqconjs_src: ['./src/js/require-config.js', './src/js/require-config2.js'], //开发过程——config源文件——代码检测，实时更新
    jsSrc: ['./src/js/{common,plug}/**/*.js', './src/js/require.2.1.11.min.js'], //开发过程—— 通用 源文件——代码检测，增加头部注释、压缩，实时刷新
    jsNum_src: ['./src/js/**/*.js', '!./src/js/common/*.js', '!./src/js/plug/**/*.js', '!./src/js/require.2.1.11.min.js', '!./src/js/require-config.js', '!./src/js/require-config2.js'],
    //开发过程——每个页面的独立js 源文件——代码检测，es6使用，增加头部注释，生成sourcemaps，压缩，,实时刷新
    jsDst: './static_dest/static/new/js', //开发过程——生成地址
    jsDst_end: '../bin/static/new/js', //build生成地址
    reqconjs_src_mid: ['./static_dest/static/new/js/require-config.js', './static_dest/static/new/js/require-config2.js'], //build——config源文件——替换静态路径
    jsSrc_mid: ['./static_dest/static/new/js/{common,plug}/**/*.js', './static_dest/static/new/js/require.2.1.11.min.js'], //build——通用 源文件
    jsNum_src_mid: ['./static_dest/static/new/js/**/*.js', '!./static_dest/static/new/js/common/*.js', '!./static_dest/static/new/js/plug/**/*.js', '!./static_dest/static/new/js/require.2.1.11.min.js', '!./static_dest/static/new/js/require-config.js', '!./static_dest/static/new/js/require-config2.js'],
    //build——每个页面的独立js 源文件——生成版本号

    imgSrc: './src/img/**/*', //开发过程——图片源文件——压缩，实时刷新
    imgDst: './static_dest/static/new/img', //开发过程——生成地址
    imgSrc_mid: './static_dest/static/new/img/**/*', //build——源文件——生成版本号
    imgDst_end: '../bin/static/new/img', //build生成地址

    htmlSrc: './html/**/*.html', //开发过程——源文件——实时刷新
    htmlDst_mid: './static_dest/template', //开发过程——生成地址
    htmlSrc_mid: './static_dest/template/**/*.html', //build——源文件——替换版本号、增加特定头部代码、替换静态资源路径
    htmlDst: '../bin/template', //build生成地址

    w_cssSrc: 'src/less/**/*.less', //开发过程——less源文件——监听
    w_jsrecon_Src: ['src/js/require-config.js', 'src/js/require-config2.js'], //开发过程——config源文件——监听
    w_jsSrc: ['src/js/common/*.js', 'src/js/plug/**/*.js', 'src/js/require.2.1.11.min.js'], //开发过程——通用 源文件——监听
    w_jsnum_Src: ['src/js/**/*.js', '!src/js/common/*.js', '!src/js/plug/**/*.js', '!src/js/require.2.1.11.min.js', '!src/js/require-config.js', '!src/js/require-config2.js'],
    //开发过程——每个页面的独立js 源文件——监听
    w_imgSrc: 'src/img/**/*', //开发过程——图片 源文件——监听
    w_htmlSrc: 'html/**/*.html', //开发过程——html 源文件——监听（删除）
    w_src_source: 'src/**/*', //开发过程——静态资源 源文件——删除
    w_dst_source: './static_dest/static/new/**/*', //开发过程——静态资源--对应删除地址
    w_dsthtml_source: './static_dest/template/**/*', //开发过程——html资源--对应删除地址

    w_cleanall_dev: ['./static_dest/static/', './static_dest/template/', './static_dest/static/rev/'], //开发过程——删除的文件范围
    w_cleanall_dev_npm: ['./static_dest/static/', './static_dest/template/', './rev/', '!./static_dest/static/new/img/**/*'],
    //执行npm run build 时——删除文件范围，只是不删除开发过程中生成的图片，（由于图片生成时间慢，并且不能够一次性生成，用以防止某些图片没有在压缩的过程中生成）
    w_cleanall_build: ['../bin/static/new/**/*', '../bin/template/**/*.html', '!../bin/template/usercenter/*.html', '!../bin/template/recharge/result.html', '!../bin/template/b/transactions/*.html'],
    //build——删除文件范围    

    //sourcemaps
    source_src: './static_dest/static/new/maps/**/*.map', //build--sourcemaps源文件
    source_dst: '../bin/static/new/maps', //build--sourcemaps生成地址

    //rev版本
    rev_src: './static_dest/static/rev/**/*.json', //build--rev源文件
    rev_dst: '../bin/static/rev', //build--rev生成地址
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
var eventEmitter = require('events'),
    emitter = new eventEmitter();
emitter.setMaxListeners(0);
// 样式处理------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('css_dev', function() { //less编译，px rem转化,实时刷新,图片转成64位编码
    var processors = [px2rem({ remUnit: 37.5 })];
    gulp.src(file_road.cssSrc)
        .pipe(less({ style: 'expanded' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'last 2 Explorer versions', 'last 3 Safari versions', 'Firefox >= 20', '> 5%'],
            cascade: true, //是否美化属性值 默认：true 像这样：//-webkit-transform: rotate(45deg);transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(postcss(processors)) //--px转rem
        //.pipe(header(banner, { pkg: pkg })) //增加头部注释
        .pipe(base64({
            baseDir: './static/img',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 10*1024, // bytes 
            debug: true
        }))//图片转成64位编码
        .pipe(gulp.dest(file_road.cssDst)) //本地目录
        .pipe(browserSync.stream()); //实时修改刷新
});
gulp.task('css_build', function() { //压缩，生成sourcemaps,生成版本号
    gulp.src(file_road.cssSrc_mid) //本地目录
        .pipe(sourcemaps.init()) //soucemap生成
        .pipe(minifycss()) //压缩
        .pipe(rev()) //生成版本号 
        .pipe(sourcemaps.write('../maps/css')) //soucemap生成       
        .pipe(gulp.dest(file_road.cssDst_end)) //最终目录
        .pipe(rev.manifest())
        .pipe(gulp.dest('./static_dest/static/rev/css'))
});
gulp.task('css_num_build', function() { //替换图片版本号
    gulp.src(['./static_dest/static/rev/img/*.json', file_road.cssDst_src_mid])
        .pipe(revCollector({ replaceReved: true })) //替换版本号
        .pipe(gulp.dest(file_road.cssDst_end))
});
//语法检查------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('jshint', function() {
    return gulp.src(file_road.jsSrc)
        .pipe(jscs()) //检测JS风格
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
        //.pipe(jshint.reporter('default'))  //错误默认提示
        .pipe(jshint.reporter(stylish)) //高亮提示
        .pipe(jshint.reporter('fail'));
});
// js处理------------------------------------------------------------------------------------------------------------------------------------------
//替换显示require-config的路径
gulp.task('reqconjs_dev', function() { //代码检测，实时更新
    gulp.src(file_road.reqconjs_src)
        .pipe(jshint.reporter('default')) //代码检测
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
        .pipe(browserSync.stream())
});
gulp.task('reqconjs_build', function() { //替换静态路径
    gulp.src(file_road.reqconjs_src_mid)
        .pipe(replace('../../../static_dest/static', '/prepaid/v1/static'))
        .pipe(replace('../../static_dest/static', '/prepaid/v1/static'))
        .pipe(gulp.dest(file_road.jsDst_end))
});
//common、pulg+require.js的处理
gulp.task('js_dev', function() { //代码检测，增加头部注释、实时刷新
    gulp.src(file_road.jsSrc)
        .pipe(jshint.reporter('default')) //代码检测
        //.pipe(header(banner, { pkg: pkg })) //增加头部注释
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
        .pipe(browserSync.stream()); //实时修改刷新
});
gulp.task('js_build', function() { //转移到最终目录,压缩，生成sourcemaps，
    gulp.src(file_road.jsSrc_mid)
        .pipe(sourcemaps.init({ loadMaps: true})) //soucemap生成
        .pipe(uglify({ //todo暂时隐藏压缩
            mangle: false, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
            mangle: { except: ['require', 'exports', 'module', '$'] } //排除混淆关键字
        }))
        .pipe(sourcemaps.write()) //soucemap生成
        .pipe(gulp.dest(file_road.jsDst_end)) //最终目录
});
//生存版本号
gulp.task('jsnum_dev', function() { //代码检测，es6使用，增加头部注释，,实时刷新
    gulp.src(file_road.jsNum_src)
        .pipe(jshint.reporter('default')) //代码检测
        .pipe(babel({
            presets: ['es2015']
        }))
        //.pipe(header(banner, { pkg: pkg })) //增加头部注释
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
        .pipe(browserSync.stream());
});
gulp.task('jsnum_build', function() { //生成版本号,生成sourcemaps，压缩，
    gulp.src(file_road.jsNum_src_mid)
        .pipe(sourcemaps.init({ loadMaps: true})) //soucemap生成
        .pipe(uglify({ //todo暂时隐藏压缩
            mangle: false, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
            mangle: { except: ['require', 'exports', 'module', '$'] } //排除混淆关键字
        }))
        .pipe(rev()) //增加版本号
        .pipe(sourcemaps.write('../maps/js')) //soucemap生成
        .pipe(gulp.dest(file_road.jsDst_end)) //最终目录
        .pipe(rev.manifest()) //生存json文件
        .pipe(gulp.dest('./static_dest/static/rev/js'))
});

// 图片处理------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('images_dev', function() { //压缩，实时刷新--增加cache无法生成之前没有生成的文件，并且不显示压缩进度
    gulp.src(file_road.imgSrc)
        // .pipe(imagemin([
        //     imagemin.gifsicle({ interlaced: true }),
        //     imagemin.jpegtran({ progressive: true }),
        //     imagemin.optipng({ optimizationLevel: 10 }),
        //     imagemin.svgo({ plugins: [{ removeViewBox: true }] })
        // ], {
        //     verbose: true, //打印进度
        // }))
        .pipe(cache(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo({ plugins: [{ removeViewBox: true }] })
        ], {
            verbose: true, //打印进度
        })))
        .pipe(gulp.dest(file_road.imgDst)) //本地目录
        .pipe(browserSync.stream());
});
gulp.task('images_build', function() { //生成版本号
    gulp.src(file_road.imgSrc_mid)
        .pipe(rev()) //增加版本号
        .pipe(gulp.dest(file_road.imgDst_end)) //最终目录
        .pipe(rev.manifest()) //生存json文件
        .pipe(gulp.dest('./static_dest/static/rev/img'))
});

// 清空图片、样式、js---最终使用del------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('del_dev', function(cb) {
    del(file_road.w_cleanall_dev, { force: true }, cb);
});
gulp.task('del_build', function(cb) {
    del(file_road.w_cleanall_build, { force: true }, cb);
});
gulp.task('del_dev_npm', function(cb) {//不删除图片
    del(file_road.w_cleanall_dev_npm, { force: true }, cb);
});
// HTML处理--init使用------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('html_dev', function() { //复制到template，实时刷新
    gulp.src(file_road.htmlSrc)
        .pipe(gulp.dest(file_road.htmlDst_mid))
        .pipe(browserSync.stream())
});
gulp.task('html_build', function() { //替换版本号、增加特定头部代码、替换静态资源路径
    gulp.src(['./static_dest/static/rev/**/*.json', file_road.htmlSrc_mid])
        .pipe(revCollector({ replaceReved: true })) //替换版本号
        .pipe(header('# coding: utf-8 \n')) //增加头部代码
        .pipe(replace('../../../static_dest/static', '/prepaid/v1/static'))
        .pipe(replace('../../static_dest/static', '/prepaid/v1/static'))
        .pipe(gulp.dest(file_road.htmlDst))
});
// 将maps的sourcemaps文件复制到最终目录-----------------------------------------------------------------------------
gulp.task('source_build', function() { //压缩
    gulp.src(file_road.source_src)
        .pipe(gulp.dest(file_road.source_dst)); //最终目录
});
// 将rev文件复制到最终目录-----------------------------------------------------------------------------
gulp.task('rev_build', function() { //压缩
    gulp.src(file_road.rev_src)
        .pipe(gulp.dest(file_road.rev_dst)); //最终目录
});
// 监听任务 运行语句 gulp watch------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('watch_dev', function() {
    //livereload启用
    //livereload.listen();
    browserSync.init({
        port: 1122,
        ui: {
            port: 1123
        },
        server: {
            baseDir: "./",
        },
    });

    // 监听html
    gulp.watch(file_road.w_htmlSrc, ['html_dev']);

    // 监听css
    gulp.watch(file_road.w_cssSrc, ['css_dev']);

    // 监听images
    gulp.watch(file_road.w_imgSrc, ['images_dev']);

    // 监听js
    gulp.watch(file_road.w_jsSrc, ['js_dev']);
    gulp.watch(file_road.w_jsrecon_Src, ['reqconjs_dev']);
    gulp.watch(file_road.w_jsnum_Src, ['jsnum_dev']);

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
            if (src.split('/')[1] == 'html') {
                //src=src.split('.')[0]+'.css';
                src = src.replace(/\.\.\/html\//, '');
                dest = path.resolve(file_road.w_dsthtml_source, src);
                console.log(src);
                del.sync(dest);
                return false;
            }
            console.log(src);
            dest = path.resolve(file_road.w_dst_source, src);
            del.sync(dest);
        }
    });
});


//开发过程中  gulp del_dev && gulp dev（先删除，再生成，并监听）
//开发过程中  gulp del_dev_npm && gulp dev（先删除，再生成，并监听）--不删除图片
gulp.task('dev', function(done) {
    runSequence(
        ['css_dev'], ['js_dev', 'reqconjs_dev', 'jsnum_dev'], ['html_dev'],['images_dev'], ['watch_dev'],
        done);
});
gulp.task('default', ['dev']);


//最终生成并提交代码过程中  gulp del_dev_npm && gulp static_dev && gulp del_build && gulp static_build && gulp html_build && gulp css_num_build（
//先删除（开发过程中的文件--images除外），再生成开发过程的静态文件，再删除bin和template（build的原文件）,再转移文件带build目录并生成版本号，替换版本号）
//初始化静态资源
gulp.task('static_dev', function(done) {
    runSequence(
        ['images_dev', 'css_dev'], ['js_dev', 'reqconjs_dev', 'jsnum_dev'], ['html_dev'],
        done);
});
gulp.task('static_build', function(done) {
    runSequence(
        ['images_build', 'css_build'], ['js_build', 'reqconjs_build', 'jsnum_build'], ['html_build', 'css_num_build'], ['source_build'],
        done);
});

//重要备注：less文件名和路径中当中不能包含‘less’；html文件名当中不能包含‘.’
//重要备注：图片的名称最好以ic/icon/a/……开头，否则，难以通过图片压缩编译；尤其是r/s/t/u/v/w开头的难以编译
//重要备注：没有修改的文件，版本号不发生变化
