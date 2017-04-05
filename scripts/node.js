export class Node {
  constructor(data = null) {
    this.data = data
    this.isWord = false;
    this.children = {}
    this.timesSelected = 0
  }
}
