/**
 * Created by WindomZ on 17-5-5.
 */
'use strict'

const fs = require('fs')

const co = require('co')

function *read (file) {
  let date = '' + fs.readFileSync(file)
  return {
    ignores: date.match(/\${![\w/#-]+}/gi),
    nodes: date.match(/\${[\w/#-]+}/gi),
    date: date
  }
}

module.exports = (file, options) => co.wrap(read)(file)
