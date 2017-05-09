#!/usr/bin/env node
/**
 * Created by WindomZ on 2017/4/18.
 */
'use strict'

const program = require('commander')

const pkg = require('../package.json')

const readme = require('../lib/readme')

let noArgs = true

program
  .version(pkg.version)
  .description('Generate some common README.md templates for GitHub.')
  .option('--debug', 'debug mode, such as print error tracks', null, null)

program
  .command('init [file]')
  .alias('create')
  .description('Generate one of the list optional README.md templates to generate them.')
  .action((options) => {
    noArgs = false

    console.log('init')
  })

program
  .command('list [class]')
  .alias('ls')
  .description('List the optional README.md templates to generate them.')
  .action((options) => {
    noArgs = false

    console.log('list')
  })

program
  .command('show')
  .description('Show the specified template.')
  .action((options) => {
    noArgs = false

    readme(options)
      .then()
      .catch(e => console.error(e))
  })

program.parse(process.argv)

if (noArgs) {
  program.outputHelp()
}
