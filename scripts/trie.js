import { Node } from './node'
var fs = require('fs')
const text = "/usr/share/dict/words"

require('locus')


export class Trie {
  constructor() {
    // this.dictionary = []
    this.counter = 0
    this.root = new Node('')
  }

  findNode(input) {
    let currentNode = this.root;

    input.split('').forEach(letter => {
      if (currentNode.children[letter] !== letter) {
        currentNode = currentNode.children[letter];
      }
      // if (currentNode.address == input) {
      //   return currentNode
      // }
    })
    return currentNode
  }

  suggest (text, suggestion = []) {
    let currentNode = this.findNode(text);
    let suggestionArr = suggestion;

    if (currentNode.isWord) {
      suggestionArr.push({word: text, timesSelected: currentNode.timesSelected});
    }

    Object.keys(currentNode.children).forEach(key => {
      this.suggest(text + key, suggestionArr)
    })

    suggestionArr.sort(function(a, b) {
      return b.timesSelected - a.timesSelected
    })

    let sortedArray = suggestionArr.map(obj => {
      return obj['word']
    })

    return sortedArray;
  }

  select(input, selected) {
    let priorityWord = this.suggest(input).find(val => {
      return val === selected
    })

    let node = this.findNode(priorityWord)
    node.timesSelected++

  }

  insert (input) {

    let currentNode = this.root;
    let accumLetters = '';

    // this.dictionary.push(input)

    input.split('').forEach(letter => {


      if (currentNode.children[letter]) {
        return currentNode = currentNode.children[letter];
      }
      currentNode.children[letter] = new Node(letter);
      currentNode = currentNode.children[letter];
      accumLetters = accumLetters + letter;
      currentNode.address = accumLetters;
    })
    currentNode.isWord = true;
    this.counter++
  }
  count () {
    return this.counter
  }

  populate () {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')
    dictionary.forEach(word => {
      this.insert(word)
    })

  }
}
