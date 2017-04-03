import { assert } from 'chai'
import { Node } from '../scripts/node'
import { Trie } from '../scripts/trie'



describe('node', () => {
  var completion = new Trie()

  it('should be a function', () => {
    assert.isFunction(Node)
  })

  it('should insert a word into the dictionary', () => {
    var node = new Node()

    completion.insert('pizza')
    assert.equal(completion.dictionary[0], 'pizza')
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
