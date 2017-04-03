import { Node } from './node'

export class Trie {
  constructor() {
    this.dictionary = []
    this.node = new Node(null)
    this.root = {}

  }
  insert(text) {
    this.dictionary.push(text)

    if (!Array.isArray(word)) {
      var word = text.split('')

      return word
    }

    word.forEach((val, i) =>{
      //new node
      if (!val.data) {
        this.children = new Node (word[i + 1], this.insert(word.slice(i + 1, word.length)) )
      } else if (!word[i + 1]) {
        return this.isWord = true
      } else {
        val.children[i + 1] = this.insert(word.slice(i + 1, word.length))
      }
    })
  }

  findNode(data) {
    //start at root
    //while data != to the node data, move to next node
    //else return node
  }

}
