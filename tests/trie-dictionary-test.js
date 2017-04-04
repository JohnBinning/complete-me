import { assert } from 'chai'
import { Node } from '../scripts/node'
import { Trie } from '../scripts/trie'

require('locus')


describe('trie-dictionary', () =>{
  var completion = new Trie

  it('should populate the trie with the dictionary', () => {
    assert.equal(completion.count(), 0)
    completion.populate()
    assert.equal(completion.count(), 235886)
  })

  it('should have the word bear in the trie', () => {
    assert.equal(completion.findNode('bear').isWord, true)
  })

  it('should suggest words', () => {
    assert.deepEqual(completion.suggest("piz"), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })



})
