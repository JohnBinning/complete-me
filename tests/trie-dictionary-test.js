import { assert } from 'chai'
import { Node } from '../scripts/node'
import { Trie } from '../scripts/trie'
const text = "/usr/share/dict/words"

require('locus')


describe('trie-dictionary', () =>{
  var completion = new Trie
  let dictionary = fs.readFileSync(text).toString().trim().split('\n')


  it('should populate the trie with the dictionary', () => {
    assert.equal(completion.count, 0)

    completion.populate(dictionary)

    assert.equal(completion.count, 235886)
  })



})
