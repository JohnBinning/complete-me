import { assert } from 'chai'
import { Node } from '../scripts/node'
import { Trie } from '../scripts/trie'
require('locus')


describe('node', () => {
  var completion = new Trie()

  it('should be a function', () => {
    assert.isFunction(Node)
  })

  it('should have an address', () => {
    completion.insert('ape')
    completion.insert('cool')
    // console.log(completion.root.children)
    // console.log(completion.root.children.p.children)
    assert.equal(completion.root.children.a.data, 'a')
    assert.equal(completion.root.children.a.children.p.address, 'ap')
  })

  it('should take a data value', () => {
    var node = new Node('pizza')

    assert.equal(node.data, 'pizza')
  })

  it('should not be a word by default', () => {
    var node = new Node('asds')

    assert.equal(node.isWord, false)
  })

})
