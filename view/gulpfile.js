/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-less gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr gulp-autoprefixer gulp-rev-append gulp-shell amd-optimize fs path browser-sync del --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩
    less = require('gulp-less'), //less
    minifycss = require('gulp-minify-css'), //css压缩
    autoprefixer = require('gulp-autoprefixer'), //使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀
    postcss = require('gulp-postcss'), //单位转化px--rem
    px2rem = require('postcss-px2rem'), //单位转化px--rem
    jshint = require('gulp-jshint'), //js检查
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'), //清空文件夹--同del，本例取消clean
    del = require('del'), //删除文件
    header = require('gulp-header'), //给文件头部增加特殊内容
    replace = require('gulp-replace'), //替换str
    path = require('path'),
    tinylr = require('tiny-lr'), //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'), //livereload
    runSequence = require('run-sequence'), //按顺序执行

    rev = require('gulp-rev'), //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'), //- 路径html替换
    //-------------------以下未使用------------------------------------------------------------------
    useref = require('gulp-useref'), //资源内文件合并替换
    revReplace = require('gulp-rev-replace'),
    rrev = require('gulp-rev-append'), //给页面的引用添加版本号，清除页面引用缓存
    shell = require('gulp-shell'),
    amdOptimize = require('amd-optimize'), //打包 require.js 模块依赖
    fs = require('fs'),
    browserSync = require('browser-sync'), //同步浏览器更新
    changed = require('gulp-changed'), //检测变化的文件
    jscs = require('gulp-jscs'); //代码风格检测
var file_road = {
    cssSrc: './src/less/**/*.less',
    cssDst: './static_dest/static/new/css',
    cssDst_end: '../bin/static/new/css',

    reqconjs_src: ['./src/js/require-config.js', './src/js/require-config2.js'],
    jsSrc: ['./src/js/{common,plug}/*.js', './src/js/require.2.1.11.min.js'],
    jsNum_src: ['./src/js/**/*.js', '!./src/js/common/*.js', '!./src/js/plug/**/*.js', '!./src/js/require.2.1.11.min.js', '!./src/js/require-config.js', '!./src/js/require-config2.js'],
    jsDst: './static_dest/static/new/js',
    //jsDst_mid: ['./static_dest/static/new/js/**/*.js', '!./static_dest/static/new/js/require-config.js', '!./static_dest/static/new/js/require-config2.js'],
    jsDst_end: '../bin/static/new/js',

    imgSrc: './src/img/**/*',
    imgDst: './static_dest/static/new/img',
    imgDst_end: '../bin/static/new/img',

    htmlSrc: './html/**/*.html',
    htmlDst_mid: './static_dest/template', //测试
    htmlDst: '../bin/template',

    w_cssSrc: 'src/less/**/*.less',
    //w_jsSrc: ['src/js/**/*.js', '!src/js/require-config.js', '!src/js/require-config2.js'],
    w_jsrecon_Src: ['src/js/require-config.js', 'src/js/require-config2.js'],
    w_jsSrc: ['src/js/common/*.js', 'src/js/plug/**/*.js', 'src/js/require.2.1.11.min.js'],
    w_jsnum_Src: ['src/js/**/*.js', '!src/js/common/*.js', '!src/js/plug/**/*.js', '!src/js/require.2.1.11.min.js', '!src/js/require-config.js', '!src/js/require-config2.js'],
    w_imgSrc: 'src/img/**/*',
    w_htmlSrc: 'html/**/*.html',

    //w_cleanall: ['../bin/**/*', './static_dest/static/new/**/*', './rev/**/*'],//原则情况全部
    w_cleanall: ['../bin/static/new/**/*', '../bin/template/**/*.html', '!../bin/template/usercenter/*.html', '!../bin/template/recharge/result.html', './static_dest/static/', './static_dest/template/', './rev/'], //实际有些不能删除

    //src_source: './src/**/*',
    w_src_source: 'src/**/*',
    w_dst_source: './static_dest/static/new/**/*',
    w_dsthtml_source: '../bin/template/**/*',

    // copy_src: './static_dest/static/new/**/*',
    // copy_dest: '../bin/static/new',
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
// 样式处理------------------------------------------------------------------------------------------------------------------------------------------
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
        .pipe(postcss(processors)) //--变得有点小
        .pipe(header(banner, { pkg: pkg })) //增加头部注释
        .pipe(gulp.dest(file_road.cssDst)) //本地目录
        .pipe(rev())
        .pipe(minifycss()) //todo暂时隐藏压缩
        .pipe(gulp.dest(file_road.cssDst_end)) //最终目录
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));

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
gulp.task('js', function() {
    gulp.src(file_road.jsSrc)
        .pipe(jshint.reporter('default')) //代码检测
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
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
//替换显示require-config的路径
gulp.task('reqconjs', function() {
    gulp.src(file_road.reqconjs_src)
        .pipe(jshint.reporter('default')) //代码检测
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
        .pipe(replace('../../../static_dest/static', '/qudao/v1/static'))
        .pipe(replace('../../static_dest/static', '/qudao/v1/static'))
        .pipe(livereload(server))
        .pipe(gulp.dest(file_road.jsDst_end))
});
//生存版本号
gulp.task('jsnum', function() {
    gulp.src(file_road.jsNum_src)
        .pipe(jshint.reporter('default')) //代码检测
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
        .pipe(rev()) //增加版本号
        .pipe(uglify({ //todo暂时隐藏压缩
            mangle: false, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
            mangle: { except: ['require', 'exports', 'module', '$'] } //排除混淆关键字
        }))
        .pipe(header(banner, { pkg: pkg })) //增加头部注释
        .pipe(livereload(server))
        .pipe(gulp.dest(file_road.jsDst_end)) //最终目录
        .pipe(rev.manifest()) //生存json文件
        .pipe(gulp.dest('rev/js'));
});
//第二次不执行--start
// gulp.task('js',function() {
//     gulp.src(file_road.jsSrc)
//         .pipe(jshint.reporter('default')) //代码检测
//         .pipe(gulp.dest(file_road.jsDst));
//     gulp.src(file_road.jsDst_mid)     //本地目录
//         .pipe(uglify({ //todo暂时隐藏压缩
//             mangle: false, //类型：Boolean 默认：true 是否修改变量名
//             compress: true, //类型：Boolean 默认：true 是否完全压缩
//             //preserveComments: 'all' //保留所有注释
//             mangle: { except: ['require', 'exports', 'module', '$'] } //排除混淆关键字
//         }))
//         .pipe(header(banner, { pkg: pkg })) //增加头部注释
//         .pipe(livereload(server))
//         .pipe(gulp.dest(file_road.jsDst_end)); //最终目录
// });
// gulp.task('js', ['js_mid'], function() {
//     gulp.src(file_road.jsDst_mid) //本地目录
//         .pipe(uglify({ //todo暂时隐藏压缩
//             mangle: false, //类型：Boolean 默认：true 是否修改变量名
//             compress: true, //类型：Boolean 默认：true 是否完全压缩
//             //preserveComments: 'all' //保留所有注释
//             mangle: { except: ['require', 'exports', 'module', '$'] } //排除混淆关键字
//         }))
//         .pipe(header(banner, { pkg: pkg })) //增加头部注释
//         .pipe(livereload(server))
//         .pipe(gulp.dest(file_road.jsDst_end)); //最终目录
// });
// gulp.task('js_mid', function() {
//     gulp.src(file_road.jsSrc)
//         .pipe(jshint.reporter('default')) //代码检测
//         .pipe(gulp.dest(file_road.jsDst)); //输出未压缩代码
// });
//第二次不执行--end

// 图片处理------------------------------------------------------------------------------------------------------------------------------------------
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

// 清空图片、样式、js---最终使用del------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('del', function(cb) {
    del(file_road.w_cleanall, { force: true }, cb);
});
//clean经常报错，清理多次
// gulp.task("clean", function() {
//         return gulp.src(file_road.w_cleanbin)
//             .pipe(clean({ force: true }));
//     })

// HTML处理--init使用------------------------------------------------------------------------------------------------------------------------------------------
// gulp.task('html_mid', function() {
//     gulp.src(file_road.htmlSrc)
//         .pipe(header('# coding: utf-8 \n')) //增加头部代码
//         .pipe(replace('../../../static_dest/static', '/qudao/v1/static'))
//         .pipe(replace('../../static_dest/static', '/qudao/v1/static'))
//         .pipe(livereload(server))
//         .pipe(gulp.dest(file_road.htmlDst_mid))
// });
gulp.task('html', function() {
    gulp.src(['rev/**/*.json', file_road.htmlSrc])
        .pipe(revCollector({ replaceReved: true }))
        .pipe(header('# coding: utf-8 \n')) //增加头部代码
        .pipe(replace('../../../static_dest/static', '/qudao/v1/static'))
        .pipe(replace('../../static_dest/static', '/qudao/v1/static'))
        .pipe(livereload(server))
        .pipe(gulp.dest(file_road.htmlDst))
});
// 监听任务 运行语句 gulp watch------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('watch', function() {

    // 监听html
    gulp.watch(file_road.w_htmlSrc, ['html']);

    // 监听css
    gulp.watch(file_road.w_cssSrc, ['css']);

    // 监听images
    gulp.watch(file_road.w_imgSrc, ['images']);

    // 监听js
    gulp.watch(file_road.w_jsSrc, ['js']);
    gulp.watch(file_road.w_jsrecon_Src, ['reqconjs']);
    gulp.watch(file_road.w_jsnum_Src, ['jsnum']);

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

//暂时没有使用
gulp.task('init', function() {
    gulp.start('css', 'images', 'js', 'reqconjs', 'html', 'watch');
});
//初始化静态资源
gulp.task('static', function(done) {
    runSequence(
        ['images', 'css'], ['js', 'reqconjs', 'jsnum'], ['html'],
        done);
});
// 默认任务 清空图片、样式、js并重建 运行语句 gulp
// gulp.task('default', function() {
//     gulp.start('css', 'images', 'js', 'watch');
// });

//#########################先执行 gulp del  清理文件,再执行gulp static编译文件,上传到服务器时，再执行一次 gulp html(增加上css版本号)//
//#########################先执行 gulp del  清理文件,再执行gulp static编译文件,上传到服务器时，再执行一次 gulp html(增加上css版本号)//
//#########################先执行 gulp del  清理文件,再执行gulp static编译文件,上传到服务器时，再执行一次 gulp html(增加上css版本号)//
//开发构建--未执行['jshint'],
gulp.task('dev', function(done) {
    runSequence(
        ['images', 'css'], ['js', 'reqconjs', 'jsnum'], ['html'], ['watch'],
        done);
});
gulp.task('default', ['dev']);

//删除不可用

//重要备注：less文件名和路径中当中不能包含‘less’；html文件名当中不能包含‘.’
