/**
 * Created by WindomZ on 17-5-5.
 */
'use strict'

const path = require('path')

const co = require('co')
const inquirer = require('inquirer')

const read = require('./reader')

const readme = require('../templates/readme/_.json')

function * select (options) {
  // template - category
  let list = []
  for (let key in readme.readme) {
    let item = readme.readme[key]
    list.push({
      name: item.name || key,
      value: item.value || key,
      short: item.short || key,
    })
  }
  let category = yield inquirer.prompt([{
    type: 'list',
    name: 'name',
    message: 'Select a README.md template category:',
    choices: list
  }])
  category = readme.readme[category.name]

  // template
  list = []
  for (let key in category.items) {
    let item = category.items[key]
    list.push({
      name: item.name || key,
      value: item.value || key,
      short: item.short || key,
    })
  }
  let template = yield inquirer.prompt([{
    type: 'list',
    name: 'name',
    message: 'Select a README.md template:',
    choices: list
  }])
  template = category.items[template.name]

  let data = yield read(path.join(__dirname, '../templates/readme/', template.file))
  console.log(data)
}

module.exports = options => co.wrap(select)(options)
