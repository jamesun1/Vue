'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://119.29.108.164:8011/"',
  DEV_API: '"http://localhost:8011/"',
})
