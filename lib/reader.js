/**
 * Created by WindomZ on 17-5-5.
 */
'use strict'

const fs = require('fs')

const co = require('co')

const Nodes = require('./nodes')

function * read (dir, file) {
  let date = '' + fs.readFileSync(file)
  return {
    date: date,
    ignores: new Nodes(dir, date.match(/\${![\w/#-]+}/gi)),
    nodes: new Nodes(dir, date.match(/\${[\w/#-]+}/gi))
  }
}

module.exports = (dir, file) => co.wrap(read)(dir, file)
