import { assert } from 'chai'
import { Trie } from '../scripts/trie'

require('locus')


describe('populate', () =>{

  var completions = new Trie

  it('should populate the trie with the dictionary', () => {

    assert.equal(completions.count(), 0)
    completions.populate()
    assert.equal(completions.count(), 234371)
  })

  it('should suggest words from the populated trie', () => {

    assert.deepEqual(completions.suggest("piz"), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })

  it('should have a specific word in the populated trie', () => {

    completions.insert('bear')
    assert.equal(completions.findNode('bear').isWord, true)
  })
})


describe('select', () =>{

  it('select should move priority words to the front of the suggest array', () => {
    var completion = new Trie

    completion.insert('pize')
    completion.insert('pizza')
    completion.insert('pizzeria')
    completion.insert('pizzicato')
    completion.insert('pizzle')
    assert.deepEqual(completion.suggest("piz"), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
    completion.select('piz', 'pizzle')
    assert.deepEqual(completion.suggest("piz"), ["pizzle", "pize", "pizza", "pizzeria", "pizzicato"])
  })

  it('select should move other priority words to the front of the suggest array', () => {
    var completion = new Trie

    completion.insert('hoodless')
    completion.insert('hoodlike')
    completion.insert('hoodlum')
    completion.insert('hoodlumish')
    completion.insert('hoodlumism')
    completion.insert('hoodlumize')


    assert.deepEqual(completion.suggest("hoodl"), [ 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumish', 'hoodlumism', 'hoodlumize' ])

    completion.select('hoodl', 'hoodlumish')

    assert.deepEqual(completion.suggest("hoodl"), [  'hoodlumish', 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumism', 'hoodlumize' ])

  })

  it('select should move two priority words to the front of the suggest array', () => {

    var completion = new Trie

    completion.insert('hoodless')
    completion.insert('hoodlike')
    completion.insert('hoodlum')
    completion.insert('hoodlumish')
    completion.insert('hoodlumism')
    completion.insert('hoodlumize')

    assert.deepEqual(completion.suggest("hoodl"), [ 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumish', 'hoodlumism', 'hoodlumize' ])

    completion.select('hoodl', 'hoodlumish')
    completion.select('hoodl', 'hoodlumize')
    assert.deepEqual(completion.suggest("hoodl"), [  'hoodlumish', 'hoodlumize', 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumism' ])

  })
})
