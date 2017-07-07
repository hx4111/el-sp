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

gulp.task('debug', () => {
    run('node_modules/babel-cli/bin/babel-node.js --debug --presets es2015 -- main.js --debug')
})