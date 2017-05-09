/**
 * Created by WindomZ on 17-5-5.
 */
'use strict'

const co = require('co')
const inquirer = require('inquirer')

function * init (result, obj, method) {
  switch (method.toLowerCase()) {
    case 'input':
      switch (obj.type.toLowerCase()) {
        case 'string':
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

module.exports = (result, obj, method) => co.wrap(init)(result, obj, method)
