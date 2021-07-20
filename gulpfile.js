'use strict';

//API pluginの読み込み
const { src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass');//sassコンパイル
const imagemin = require('gulp-imagemin');//画像圧縮
const autoprefixer = require('gulp-autoprefixer');//プレフィクス付与
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');//エラーが起きてもタスクを続行
const postcss = require('gulp-postcss');//mqpackerを使うのに必要
const mqpacker = require('css-mqpacker');//メディアクエリをまとめる
const changed = require('gulp-changed');//更新時だけ処理
const notify = require('gulp-notify');//エラー時知らせてくれる
const sassGlob = require('gulp-sass-glob');//パーシャルファイル一括読み込み
const debug = require('gulp-debug');//デバッグ


//sassコンパイルとプレフィクス付与
const compileSass = (cb) => {
    src('./src/scss/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sassGlob())
    .pipe( sass({ outputStyle: 'expanded' }) ) 
    .pipe(autoprefixer({ cascade: false }))
    .pipe(postcss([mqpacker()]))
    .pipe(dest('./assets/css'));
    cb();
}
    
// sassの監視
const watchSassFiles = (cb) => {
    watch('./src/scss/**/*.scss', compileSass); 
    cb();
} 
    
// 画像圧縮
const imageMin = (cb) => {
    src('./src/img_org/*.{jpg,jpeg,png,gif,svg}')
    .pipe(changed('./assets/img'))//src/img_orgとassets/imgを比較して異なるファイルがあれば
    .pipe(imagemin())
    .pipe(dest('./assets/img'));
    cb();
}

const watch_imagemin = (cb) => {
    watch('./src/img_org/', imageMin); 
    // watch('./src/img_org/*.{jpg,jpeg,png,gif,svg}', imageMin); 
    cb();
} 

// ブラウザリロード----------------------------------------------------
const browser_sync = (cb) => {
    browserSync.init({
        server: {baseDir: './', index : 'index.html'}
    });
    cb();
}

const browser_reload = (cb) => {
    browserSync.reload(); //ブラウザの自動リロード設定
    cb();
}

const watch_browser = (cb) => {
    watch(['./**/*.html','./assets/css/*.css'], browser_reload); 
    cb();
}

// ----------------------------------------------------ブラウザリロード






// 「gulp」で実行される
exports.default = series(watch_imagemin, watchSassFiles, browser_sync, watch_browser);

