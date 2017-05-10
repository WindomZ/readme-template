/**
 * Created by WindomZ on 17-5-5.
 */
'use strict'

const co = require('co')
const inquirer = require('inquirer')

const shell = require('shelljs')

function * init (result, obj, method) {
  switch (method.toLowerCase()) {
    case 'input':
      switch (obj.type.toLowerCase()) {
        case 'string':
          switch (obj.name) {
            case '${user}':
              obj.default = defaultUser() || obj.default
              break
            case '${repo}':
              obj.default = defaultUser() || obj.default
              break
            case '${repo-url}':
              obj.default = defaultUser() || obj.default
              break
            case '${npm}':
              obj.default = defaultUser() || obj.default
              break
          }
          let data = yield inquirer.prompt([{
            type: 'input',
            name: 'value',
            message: obj.description,
            default: obj.default
          }])
          if (data && data.value) result[obj.name] = data.value
          break
      }
      break
  }
  return result
}

function defaultUser () {
  if (!shell.which('git')) throw new ReferenceError('Sorry, this script requires git')
  return shell.exec('git config user.name', {silent: true}).stdout.trim()
}

module.exports = (result, obj, method) => co.wrap(init)(result, obj, method)
