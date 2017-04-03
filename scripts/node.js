export class Node {
  constructor(data, node = null) {
    this.data = data
    this.isWord = false;
    this.children = node
  }
}
