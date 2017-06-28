var gulp = require('gulp')
var webpack = require("webpack")
var run = require('gulp-run')
var webpackConfig = require('./webpack.config.js')

gulp.task('default', ()=> {
    run('electron .').exec()
    gulp.start('webpack');
}) 

gulp.task('webpack', function(callback) {
    webpack(webpackConfig, function(err, stats) {
        console.log(stats.toString());
    });
})