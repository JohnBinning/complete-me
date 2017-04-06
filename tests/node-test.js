import { assert } from 'chai'
import { Node } from '../scripts/node'
require('locus')


describe('node', () => {

  it('should be a function', () => {
    assert.isFunction(Node)
  })

  it('should be an object', () => {
    var node = new Node('pizza')

    assert.isObject(node)
  })

  it('should be a class with a constructor', () => {
    var node = new Node('pizza')

    assert.instanceOf(node, Node, 'node is an instance of Node')
  })

  it('should take a data value', () => {
    var node = new Node('pizza')

    assert.equal(node.data, 'pizza')
  })

  it('should have a null data value by default', () => {
    var node2 = new Node()

    assert.isNull(node2.data, 'nothing here')
  })

  it('should not be a word by default', () => {
    var node = new Node('asds')

    assert.equal(node.isWord, false)
  })

  it('should default to 0 times selected', () => {
    var node = new Node('pizza')

    assert.equal(node.timesSelected, 0)
  })

  it('should default children to an empty object', () => {
    var node = new Node('pizza')

    assert.deepEqual(node.children, {})
  })
})
