import { Node } from './node'
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

  suggest (suggestion) {
    let suggestionArr = [];
    let currentNode = this.findNode(suggestion);

    if (currentNode.isWord) {
      suggestionArr.push(suggestion);
    }

    if (!currentNode.children) {
      return;
    } else {
      Object.keys(currentNode.children).forEach(letter => {
        suggestionArr = suggestionArr.concat(this.suggest(suggestion + letter));
      })
    }
    return suggestionArr;
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
    
  }
}
