// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Tree object
function Tree() {
	// Just store the root
	this.root = null;
}

// Start by visiting the root
Tree.prototype.traverse = function() {
	this.root.midVisit(this.root);
}

// Start by searching the root
Tree.prototype.search = function(val) {
	var found = this.root.search(val);
	return found;
}

// Add a new value to the tree
Tree.prototype.addValue = function(val) {
	var n = new Node(val);
	console.log('add value: ', val)
	if (this.root == null) {
		this.root = n;
		// An initial position for the root node
	} else {
		this.root.addNode(n);
		// this.root = this.root.adjust();
	}
	this.root.x = width / 2;
	this.root.y = 16;
	this.root.distance = 2;
}

function BalancedTree(){
}

BalancedTree.prototype = new Tree();

BalancedTree.prototype.addValue =  function(val) {
	Tree.prototype.addValue.call(this,val)

	this.root = this.root.adjust();
	this.root.x = width / 2;
	this.root.y = 400;
	this.root.distance = 2;
}
