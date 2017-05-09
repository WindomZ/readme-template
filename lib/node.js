/**
 * Created by WindomZ on 17-5-5.
 */
'use strict'

const fs = require('fs')
const path = require('path')

const init = require('./init')

class Node {
  constructor (dir, date) {
    if (!dir || !date) return
    this._dir = dir

    this._dirs = date.match(/\/[\w-]+/ig)
    this._dirs.forEach((n, i) => {
      this._dirs[i] = n.match(/[\w-]+/ig)[0]
    })
    this._nodes = date.slice(date.indexOf('#')).match(/[\w-]+/ig)
  }

  valid () {
    return this._dir && this._dirs.length > 0 && this._nodes.length > 0
  }

  exec (result, callback) {
    if (!this.valid()) return

    const method = this._dirs[0]

    let file = path.join(this._dir, ...this._dirs, '_.json')
    fs.accessSync(file)
    let obj = JSON.parse('' + fs.readFileSync(file))
    for (let n of this._nodes) {
      obj = obj[n]
    }

    switch (method.toLowerCase()) {
      case 'init':
        init(result, obj, this._nodes[0])
          .then(r => {
            if (callback) callback(r)
          })
          .catch(e => { throw e })
        break
    }
  }
}

module.exports = Node
