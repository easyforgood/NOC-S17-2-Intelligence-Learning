// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Binary tree
var tree;


function setup() {
  createCanvas(800, 600);

  // New tree
  tree = new Tree();
	balancedTree = new BalancedTree()

  // Add ten random values
var arr = new Array()
  for (var i = 0; i < 10; i++) {
	  _r = floor(random(0, 100))
	  arr.push(_r)
	
   	tree.addValue(_r);
	  balancedTree.addValue(_r)
  }
	console.log('adding order arr: ', arr)

  background(0);

  // Traverse the tree
  tree.traverse();
	balancedTree.traverse()

  // Search the tree for 10
  // var result = tree.search(10);
  // if (result == null) {
  //   console.log('not found');
  // } else {
  //   // console.log(result);
  // }
}
