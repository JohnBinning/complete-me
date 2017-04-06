import { assert } from 'chai'
import { Trie } from '../scripts/trie'
var fs = require('fs')
const text = "/usr/share/dict/words"

require('locus')


describe('populate', () =>{

  var completions = new Trie

  it('should be a function', () => {
    assert.isFunction(completions.populate)
  })

  it('should increase the number of words in the trie when populated', () => {

    assert.equal(completions.count(), 0)
    completions.populate()
    assert.equal(completions.count(), 234371)
  })

  it('should suggest words from the populated trie', () => {

    assert.deepEqual(completions.suggest("piz"), ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })

  it('should have a specific word in the populated trie', () => {

    assert.equal(completions.findNode('bear').isWord, true)
  })

  it('should be able to insert a new word into the populated tree', () => {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    assert.equal(dictionary.includes('azfj'), false)
    completions.insert('azfj')
    assert.property(completions.root.children['a'].children['z'].children['f'].children, 'j')
    assert.equal(completions.findNode('azfj').isWord, true)
  })
})


describe('select', () =>{

  var completions = new Trie

  it('should be a function', () => {
    assert.isFunction(completions.select)
  })

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

  it('select should rank priority words in order over more than two values', () => {
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
    completion.select('hoodl', 'hoodlumize')
    assert.deepEqual(completion.suggest("hoodl"), [  'hoodlumize', 'hoodlumish', 'hoodless', 'hoodlike', 'hoodlum', 'hoodlumism' ])
  })
})
