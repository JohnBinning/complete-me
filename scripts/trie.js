import { Node } from './node'
var fs = require('fs')
const text = "/usr/share/dict/words"

require('locus')

export class Trie {
  constructor() {
    this.counter = 0
    this.root = new Node()
  }

  findNode(input) {
    let currentNode = this.root

    input.split('').forEach(letter => {
      if (currentNode.children[letter] !== letter) {
        currentNode = currentNode.children[letter]
      }
    })
    return currentNode
  }

  suggestMachine (text, suggestion = []) {
    let currentNode = this.findNode(text)
    let suggestionArr = suggestion;

    if (currentNode.isWord) {
      suggestionArr.push({word: text, timesSelected: currentNode.timesSelected});
    }

    Object.keys(currentNode.children).forEach(key => {
      this.suggestMachine(text + key, suggestionArr)
    })

    return suggestionArr
  }

  suggestToStrings (text) {
    let suggestionArr = this.suggestMachine(text)

    suggestionArr.sort(function(a, b) {
      return b.timesSelected - a.timesSelected
    })
    return suggestionArr
  }

  suggest (text) {
    let sortedArray = this.suggestToStrings(text).map(obj => {
      return obj.word
    })

    return sortedArray;
  }

  select(input, selected) {
    let priorityWord = this.suggest(input).find(val => {
      return val === selected
    })

    this.findNode(priorityWord).timesSelected++
  }

  insert (input) {
    let currentNode = this.root

    input.toLowerCase().split('').forEach(letter => {

      if (currentNode.children[letter]) {
        return currentNode = currentNode.children[letter]
      }
      currentNode.children[letter] = new Node(letter)
      currentNode = currentNode.children[letter]
    })
    if (!currentNode.isWord) {
      currentNode.isWord = true
      this.counter++
    }
  }

  count () {
    return this.counter
  }

  populate () {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    dictionary.forEach( word => {
      this.insert(word)
    })
  }
}
