import { assert } from 'chai'
import { Trie } from '../scripts/trie'

require('locus')


describe('trie-dictionary', () =>{

  it('should populate the trie with the dictionary', () => {
    var completion = new Trie
    assert.equal(completion.count(), 0)
    completion.populate()
    assert.equal(completion.count(), 235886)
  })

  it('should have the word bear in the trie', () => {
    var completion = new Trie
    completion.populate()

    assert.equal(completion.findNode('bear').isWord, true)
  })

  it('should suggest words', () => {
    var completion = new Trie
    completion.populate()
    assert.deepEqual(completion.suggest("piz"), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })

  it('select should move priority words to the front of the suggest array', () => {
    var completion = new Trie
    completion.populate()
    assert.deepEqual(completion.suggest("piz"), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
    completion.select('piz', 'pizzle')
    assert.deepEqual(completion.suggest("piz"), ["pizzle", "pize", "pizza", "pizzeria", "pizzicato"])
  })

  it('select should move other priority words to the front of the suggest array', () => {
    var completion = new Trie

    completion.populate()

    assert.deepEqual(completion.suggest("hoodl"), [ 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumish', 'hoodlumism', 'hoodlumize' ])

    completion.select('hoodl', 'hoodlumish')

    assert.deepEqual(completion.suggest("hoodl"), [  'hoodlumish', 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumism', 'hoodlumize' ])

  })

  it('select should move two priority words to the front of the suggest array', () => {

    var completion = new Trie
    completion.populate()
    assert.deepEqual(completion.suggest("hoodl"), [ 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumish', 'hoodlumism', 'hoodlumize' ])

    completion.select('hoodl', 'hoodlumish')
    completion.select('hoodl', 'hoodlumize')
    assert.deepEqual(completion.suggest("hoodl"), [  'hoodlumish', 'hoodlumize', 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumism' ])

  })



})
