const gulp = require('gulp')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const prefixwrap = require('postcss-prefixwrap')

const rulePrefix = '.antd-ns'

const sourcePath = './node_modules/antd/dist/antd.css'
const targetFolder = './'
const targetFile = 'antd-namespaced.min.css'

gulp.task('build-namespaced-css', function () {
  return gulp
    .src(sourcePath)
    .pipe(postcss([prefixwrap(rulePrefix)]))
    .pipe(rename(targetFile))
    .pipe(gulp.dest(targetFolder))
})
