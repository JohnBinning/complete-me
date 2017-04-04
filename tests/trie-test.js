import { assert } from 'chai'
import { Node } from '../scripts/node'
import { Trie } from '../scripts/trie'
require('locus')

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

  it('should count words', () => {
    assert.equal(completion.count(), 0)
    completion.insert('ape')
    assert.equal(completion.count(), 1)
    completion.insert('ale')
    assert.equal(completion.count(), 2)
  })

  it('should insert a word into the dictionary', () => {

    completion.insert('pizza')
    // eval(locus);
    assert.equal(completion.dictionary.includes('pizza'), true)
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

  it('should find a node', () => {
    completion.insert('bert')
    completion.insert('berth')

    assert.deepEqual(completion.findNode('ber'), completion.root.children['b'].children['e'].children['r'])
  })

  it('should find another node', () => {
    completion.insert('protein')
    completion.insert('program')

    assert.deepEqual(completion.findNode('prot'), completion.root.children['p'].children['r'].children['o'].children['t'])
    assert.deepEqual(completion.findNode('prog'), completion.root.children['p'].children['r'].children['o'].children['g'])
  })

  it('should have isWord be true on all words', () => {

    assert.deepEqual(completion.findNode('protein').isWord, true)
    assert.deepEqual(completion.findNode('program').isWord, true)
  })

  it('should have isWord be false on non - words', () => {

    assert.deepEqual(completion.findNode('protei').isWord, false)
    assert.deepEqual(completion.findNode('protein').isWord, true)
  })

  it('should have isWord be on words that are part of larger words', () => {
    completion.insert('ant')
    completion.insert('anthem')

    assert.deepEqual(completion.findNode('ant').isWord, true)
    assert.deepEqual(completion.findNode('anth').isWord, false)
    assert.deepEqual(completion.findNode('anthem').isWord, true)
  })

  it('should return an array of suggested words', () => {
    let newTrie = new Trie('b');

    newTrie.insert('pizza');
    newTrie.insert('pit');
    let suggs = newTrie.suggest('pi')


    assert.deepEqual(suggs, ['pizza', 'pit']);
  })

  it('suggest should ignore words that arent suggestable', () => {
    let newTrie = new Trie('b');

    newTrie.insert('pizza');
    newTrie.insert('pit');
    newTrie.insert('pie');
    newTrie.insert('person');
    newTrie.insert('dog');
    newTrie.insert('pound');
    let suggs = newTrie.suggest('pi')


    assert.deepEqual(suggs, ['pizza', 'pit', 'pie']);
  })

})
