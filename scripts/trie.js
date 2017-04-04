import { Node } from './node'
require('locus')


export class Trie {
  constructor() {
    this.dictionary = []
    this.root = new Node('')
  }

  findNode(input) {
    let currentNode = this.root;

    input.split('').forEach(letter => {
      if (currentNode.children[letter] !== letter) {
        currentNode = currentNode.children[letter];
      }
      if (currentNode.address == input) {
        console.log(currentNode + ' found')
        return currentNode
      }
      return currentNode
    })
    console.log(currentNode.data)
    return currentNode
  }

  insert (input) {

    let currentNode = this.root;
    let accumLetters = '';

    this.dictionary.push(input)

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
  }
  count () {
    return this.dictionary.length
  }
}
