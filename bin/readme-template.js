#!/usr/bin/env node
/**
 * Created by WindomZ on 2017/4/18.
 */
'use strict'

const process = require('process')

const program = require('commander')

const pkg = require('../package.json')

let noArgs = true

program
  .version(pkg.version)
  .usage('[options] <template>')
  .description('Generate some common README.md templates for GitHub.')
  .option('--debug', 'debug mode, such as print error tracks', null, null)
  .action((template, options) => {
    noArgs = false

    console.log('template: %s', template)
  })

program
  .command('list')
  .alias('ls')
  .description('List the optional README.md templates to generate them.')
  .action((options) => {
    noArgs = false

    console.log('list')
  })

program.parse(process.argv)

if (noArgs) {
  program.outputHelp()
}
