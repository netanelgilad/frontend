// we can just use the exact same webpack config by requiring it
// but make sure to delete the normal entry
var path = require('path')
var webpackConf = require('./webpack.base.config')
var vue = require('vue-loader')
delete webpackConf.entry
webpackConf.module.preLoaders = [
  // instrument only testing sources with Istanbul
  {
    test: /\.js$/,
    include: path.resolve('src'),
    loader: 'isparta'
  }
]

webpackConf.vue.loaders = {
  js: 'babel!isparta!eslint'
}

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: ['../test/index.js'],
    preprocessors: {
      '../test/index.js': ['webpack']
    },
    reporters: ['spec', 'junit', 'coverage'],
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
        { type: 'text-summary' },
        { type: 'lcov', dir: (process.env.CIRCLE_ARTIFACTS || '.') + '/results/coverage', subdir: 'lcov' },
      ]
    },
    junitReporter: {
      outputDir: process.env.CIRCLE_TEST_REPORTS || 'results/test-results'
    }
  })
}
