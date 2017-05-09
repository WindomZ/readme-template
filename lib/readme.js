/**
 * Created by WindomZ on 17-5-5.
 */
'use strict'

const path = require('path')

const co = require('co')
const inquirer = require('inquirer')

const read = require('./reader')

const config = require('../templates/readme/_.json')

function * select (options) {
  // template - category
  let list = []
  for (let key in config.readme) {
    let item = config.readme[key]
    list.push({
      name: item.name || key,
      value: item.value || key,
      short: item.short || key
    })
  }
  let category = yield inquirer.prompt([{
    type: 'list',
    name: 'value',
    message: 'Select a README.md template category:',
    choices: list
  }])
  category = config.readme[category.value]

  // template
  list = []
  for (let key in category.items) {
    let item = category.items[key]
    list.push({
      name: item.name || key,
      value: item.value || key,
      short: item.short || key
    })
  }
  let template = yield inquirer.prompt([{
    type: 'list',
    name: 'value',
    message: 'Select a README.md template:',
    choices: list
  }])
  template = category.items[template.value]

  // read
  let dir = path.join(__dirname, '../templates/')
  let data = yield read(dir, path.join(dir, 'readme/', template.file))

  // exec
  let result = yield data.ignores.exec()
  console.log('result: %j', result)
}

module.exports = options => co.wrap(select)(options)
