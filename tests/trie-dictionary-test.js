import { assert } from 'chai'
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

  it('select should move priority words to the front of the suggest array', () => {
    assert.deepEqual(completion.suggest("piz"), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
    completion.select('piz', 'pizzle')
    assert.deepEqual(completion.suggest("piz"), ["pizzle", "pize", "pizza", "pizzeria", "pizzicato"])
  })

  it.only('select should move other priority words to the front of the suggest array', () => {
    completion.populate()
    let hood = completion.suggest('hoodlu')
    // console.log(hood)
    assert.deepEqual(completion.suggest("hood"), [ 'hoodlumism', 'hoodlumize', 'hooded', 'hoodedness', 'hoodful', 'hood', 'hoodcap', 'hoodlike', 'hoodlum', 'hoodless', 'hoodlumish',
    'hoodie', 'hoodman', 'hoodmold', 'hoodoo', 'hoodsheaf', 'hoodshy', 'hoodshyness', 'hoodwink', 'hoodwinkable', 'hoodwinker', 'hoodwise', 'hoodwort' ])

    completion.select('hood', 'hoodlum')
    // eval(locus);
    var suggestions = completion.suggest("hood");
    assert.deepEqual(suggestions, [ 'hoodlum', 'hoodlumism', 'hoodlumize', 'hooded', 'hoodedness', 'hoodful', 'hood', 'hoodcap', 'hoodlike', 'hoodless', 'hoodlumish',
    'hoodie', 'hoodman', 'hoodmold', 'hoodoo', 'hoodsheaf', 'hoodshy', 'hoodshyness', 'hoodwink', 'hoodwinkable', 'hoodwinker', 'hoodwise', 'hoodwort' ])
  })



})
