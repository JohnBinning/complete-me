import { assert } from 'chai'
import { Node } from '../scripts/node'
import { Trie } from '../scripts/trie'


describe('trie', () => {

  var completion = new Trie
  var node = new Node
  it('should be a function', () => {
    assert.isFunction(Trie)
  })

  it.skip('should have a null root', () => {
    // console.log(completion.root)
    completion.insert('pizza')
    completion.insert('bad')
    assert.deepEqual(completion.root, new Node(''))
    completion.insert('bat')
  })

  it('should insert a word into the dictionary', () => {

    completion.insert('pizza')
    // eval(locus);
    assert.equal(completion.dictionary[0], 'pizza')
  })

  it('should make a node', () => {
    completion.insert('ape')
    // console.log(completion.root.children)
    // console.log(completion.root.children.p.children)
    assert.equal(completion.root.children.a.data, 'a')
    assert.equal(completion.root.children.a.children.p.data, 'p')
  })

  it('should have a node for the last letter in the first word', () => {
    completion.insert('bat')
    completion.insert('bed')
    assert.property(completion.root.children['b'].children['a'].children, 't')
  })

  it('should have a node for last letter in a second similar word', () => {
    completion.insert('bar')
    assert.property(completion.root.children['b'].children['a'].children, 'r')
  })

  it('should find a node', () => {
    completion.insert('bert')
    completion.insert('berth')

    assert.deepEqual(completion.findNode('ber'), completion.root.children['b'].children['e'].children['r']
     )
  })

  it('should find another node', () => {
    completion.insert('protein')
    completion.insert('program')

    assert.deepEqual(completion.findNode('prog'), completion.root.children['p'].children['r'].children['o'].children['g']
     )
  })

})
