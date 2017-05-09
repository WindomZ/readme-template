/**
 * Created by WindomZ on 17-5-5.
 */
'use strict'

const async = require('async')

const Node = require('./node')

class Nodes {
  constructor (dir, list) {
    if (!dir || !list || !Array.isArray(list)) return

    this._nodes = []
    for (let l of list) {
      let n = new Node(dir, l)
      if (n.valid()) { this._nodes.push(n) }
    }
  }

  valid () {
    return this._nodes.length > 0
  }

  exec (result) {
    if (!this.valid()) throw new TypeError('"Nodes" should be valid!')
    if (!result) result = {}
    return new Promise((resolve, reject) => {
      async.eachSeries(
        this._nodes,
        function (node, next) {
          node.exec(result, r => {
            if (r) result = r
            next()
          })
        }, function (err) {
          if (err) reject(err)
          else resolve(result)
        })
    })
  }
}

module.exports = Nodes
