import { assert } from 'chai'
import { Trie } from '../scripts/trie'
import { Node } from '../scripts/node'

require('locus')


describe('trie', () => {

  var completion = new Trie

  it('should be a function', () => {
    assert.isFunction(Trie)
  })

  it('should be a class with a constructor', () => {

    assert.instanceOf(completion, Trie, 'completion is an instance of Trie')
  })

  it('should be an object', () => {

    assert.isObject(completion)
  })

  it('should have a counter that defaults to 0', () => {

    assert.equal(completion.counter, 0)
  })

  it('should have a root node', () => {

    assert.deepEqual(completion.root, new Node())
  })

  it('should have the root nodes children default to an empty object', () => {

    assert.deepEqual(completion.root.children, {})
  })

  it('should have the root nodes data default to null', () => {

    assert.deepEqual(completion.root.data, null)
  })
})

describe('findNode', () => {

  var completion = new Trie

  it('should be a function', () => {
    assert.isFunction(completion.findNode)
  })

  it('should find a node', () => {
    completion.insert('bert')
    completion.insert('berth')

    assert.deepEqual(completion.findNode('ber'),
    completion.root.children['b'].children['e'].children['r'])
  })

  it('should find another node', () => {
    completion.insert('protein')
    completion.insert('program')

    assert.deepEqual(completion.findNode('prot'),
    completion.root.children['p'].children['r'].children['o'].children['t'])

    assert.deepEqual(completion.findNode('prog'),
    completion.root.children['p'].children['r'].children['o'].children['g'])
  })

  it('should find that isWord is already true on all words', () => {

    assert.deepEqual(completion.findNode('protein').isWord, true)
    assert.deepEqual(completion.findNode('program').isWord, true)
  })

  it('should find that isWord is already false on non - words', () => {

    assert.deepEqual(completion.findNode('protei').isWord, false)
    assert.deepEqual(completion.findNode('protein').isWord, true)
  })

  it('should find that isWord is already true on words that are part of larger words', () => {
    completion.insert('ant')
    completion.insert('anthem')

    assert.deepEqual(completion.findNode('ant').isWord, true)
    assert.deepEqual(completion.findNode('anth').isWord, false)
    assert.deepEqual(completion.findNode('anthem').isWord, true)
  })
})

describe('count', () => {

  it('should be a function', () => {
    var completion = new Trie

    assert.isFunction(completion.count)
  })

  it('should count words', () => {
    var completion = new Trie

    assert.equal(completion.count(), 0)
    completion.insert('ape')
    assert.equal(completion.count(), 1)
    completion.insert('ale')
    assert.equal(completion.count(), 2)
  })

  it('should not count duplicate words', () => {
    var completion2 = new Trie

    assert.equal(completion2.count(), 0)
    completion2.insert('ape')
    assert.equal(completion2.count(), 1)
    completion2.insert('ape')
    assert.equal(completion2.count(), 1)
  })
})

describe('insert', () => {

  var completion = new Trie

  it('should be a function', () => {
    assert.isFunction(completion.insert)
  })

  it('should make a node', () => {
    completion.insert('ape')
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

  it('should set isWord to true for node of the last letter in a word ', () => {
    completion.insert('bad')
    assert.equal(completion.root.children['b'].children['a'].children['d'].isWord, true)
  })

  it('should set isWord to false for node that are not the last letter if isWord is not already true', () => {
    assert.equal(completion.root.children['b'].children['a'].isWord, false)
  })

  it('should not overwrite isWord on a node that is already true when inserting a longer version of the same word', () => {
    completion.insert('bed')
    assert.equal(completion.root.children['b'].children['e'].children['d'].isWord, true)
    completion.insert('bedbug')
    assert.equal(completion.root.children['b'].children['e'].children['d'].isWord, true)
  })
})

describe('suggest', () => {

  it('should be a function', () => {
    var completion = new Trie

    assert.isFunction(completion.suggest)
  })

  it('should return an array', () => {
    var completion = new Trie

    completion.insert('suh')
    let suhArray = completion.suggest('suh')

    assert.equal(Array.isArray(suhArray), true)
  })

  it('should return an array of suggested words', () => {
    let newTrie = new Trie('b')

    newTrie.insert('pizza')
    newTrie.insert('pit')
    let suggs = newTrie.suggest('pi')


    assert.deepEqual(suggs, ['pizza', 'pit'])
  })

  it('suggest should ignore words that arent suggestable', () => {
    let newTrie = new Trie('b')

    newTrie.insert('pizza')
    newTrie.insert('pit')
    newTrie.insert('pie')
    newTrie.insert('person')
    newTrie.insert('dog')
    newTrie.insert('pound')
    let suggs = newTrie.suggest('pi')

    assert.deepEqual(suggs, ['pizza', 'pit', 'pie'])
  })

  it('the resulting array should have strings as value types', () => {
    var completion = new Trie

    completion.insert('suh')
    completion.insert('suhdude')
    completion.insert('suhdudes')
    let suhArray = completion.suggest('suh')

    assert.equal(typeof(suhArray[0]), 'string')
    assert.equal(typeof(suhArray[1]), 'string')
    assert.equal(typeof(suhArray[2]), 'string')
  })
})

describe('suggestMachine', () => {

  var completion = new Trie

  it('should be a function', () => {
    assert.isFunction(completion.suggestMachine)
  })

  it('should return an array', () => {
    completion.insert('suh')
    let suhArray = completion.suggestMachine('suh')

    assert.equal(Array.isArray(suhArray), true)
  })

  it('should return the resulting array values as objects', () => {
    completion.insert('suh')
    completion.insert('suhdude')
    completion.insert('suhdudes')
    let suhArray = completion.suggestMachine('suh')

    assert.equal(typeof(suhArray[0]), 'object')
    assert.equal(typeof(suhArray[1]), 'object')
    assert.equal(typeof(suhArray[2]), 'object')
  })
})

describe('suggestSort', () => {

  var completion = new Trie

  it('should be a function', () => {

    assert.isFunction(completion.suggestSort)
  })

  it('should return an array', () => {
    completion.insert('suh')
    let suhArray = completion.suggestSort('suh')

    assert.equal(Array.isArray(suhArray), true)
  })

  it('should return the resulting array values as objects', () => {
    completion.insert('suh')
    completion.insert('suhdude')
    completion.insert('suhdudes')
    let suhArray = completion.suggestSort('suh')

    assert.equal(typeof(suhArray[0]), 'object')
    assert.equal(typeof(suhArray[1]), 'object')
    assert.equal(typeof(suhArray[2]), 'object')
  })
})
