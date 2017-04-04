export class Node {
  constructor(data = null, node = {}) {
    this.data = data
    this.isWord = false;
    this.children = node
  }
}
