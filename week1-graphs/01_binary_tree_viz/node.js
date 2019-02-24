// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Node in the tree


function Node(val, x, y) {
	this.value = val;
	this.left = null;
	this.right = null;
	// How far apart should the children nodes be
	// This will be based on "level" in the tree
	this.distance = 2;
	// Now has a an xy position
	this.x = x;
	this.y = y;
}

// Search the tree for a value
Node.prototype.search = function(val) {
	if (this.value == val) {
		return this;
	} else if (val < this.value && this.left != null) {
		return this.left.search(val);
	} else if (val > this.value && this.right != null) {
		return this.right.search(val);
	}
	return null;
}

Node.prototype.visit = function(parent) {
	// Recursively go left
	if (this.left != null) {
		this.left.visit(this);
	}
	// Print out the value
	console.log(this.value);

	// Draw a line from the parent
	stroke(100);
	line(parent.x, parent.y, this.x, this.y);
	// Draw a circle
	stroke(255);
	fill(0);
	ellipse(this.x, this.y, 24, 24);
	noStroke();
	// Display the value
	fill(255);
	textAlign(CENTER);
	textSize(12);
	text(this.value, this.x, this.y + 4);

	// Go right
	if (this.right != null) {
		this.right.visit(this);
	}
}

// 
Node.prototype.midVisit = function(parent) {
	// Draw a line from the parent
	stroke(100);
	line(parent.x, parent.y, this.x, this.y);
	// Draw a circle
	stroke(255);
	fill(0);
	ellipse(this.x, this.y, 24, 24);
	noStroke();
	// Display the value
	fill(255);
	textAlign(CENTER);
	textSize(12);
	text(this.value, this.x, this.y + 4);

	// Recursively go left
	if (this.left != null) {
		this.left.x = this.x - (width / pow(2, this.distance));
		this.left.y = this.y + (height / 12);
		this.left.distance = this.distance + 1
		this.left.midVisit(this);
	}
	// Print out the value
	// console.log(this.value);
	// Go right
	if (this.right != null) {
		this.right.x = this.x + (width / pow(2, this.distance));
		this.right.y = this.y + (height / 12);
		this.right.distance = this.distance + 1
		this.right.midVisit(this);
	}
}

// Add a new Node
Node.prototype.addNode = function(n) {
	// If it's less go left
	if (n.value < this.value) {
		// Is there nothing there? Place the node
		if (this.left == null) {
			this.left = n;
			// Exponentially shrink the distance between nodes for each level
			this.left.x = this.x - (width / pow(2, n.distance));
			this.left.y = this.y + (height / 12);
			// Keep going!
		} else {
			n.distance++;
			this.left.addNode(n)
		}
		// If it's more go right
	} else if (n.value > this.value) {
		// Is there nothing there? Place the node
		if (this.right == null) {
			this.right = n;
			this.right.x = this.x + (width / pow(2, n.distance));
			this.right.y = this.y + (height / 12);

			// Keep going!
		} else {
			n.distance++;
			this.right.addNode(n);
		}
	}
}

Node.prototype.height = function(){
	if (this.left == null && this.right == null ){
		return 0
	}
	if (this.left ==null){
		return this.right.height() + 1
	}
	if (this.right ==null){
		return this.left.height() + 1
	}
	return Math.max(this.left.height(), this.right.height()) + 1
}

Node.prototype.left_height = function(){
	if (this.left ==null){
		return 0
	}
	return this.left.height() + 1
}

Node.prototype.right_height = function(){
	if (this.right ==null){
		return 0
	}
	return this.right.height() + 1
}

Node.prototype.calcFactor = function() {
	factor = this.left_height() - this.right_height()
	return factor
}

Node.prototype.adjust = function() {
	if (this.left !=null ){
		this.left = this.left.adjust();
	}
	if (this.right !=null){
		this.right = this.right.adjust();
	}
	factor = this.calcFactor()
	if (-1 <= factor && factor <= 1){
		return this
	}
	if ( factor > 1){
		return this.LXadjust()
	}
	if (factor < -1 ){
		return this.RXadjust()
	}
	return this
}

Node.prototype.LXadjust = function() {
	if (this.left.calcFactor() > 0 ) {
		return this.LLadjust()
	}
	return this.LRadjust()
}

Node.prototype.LLadjust = function() {
	root = this.left
	this.left = root.right
	root.right = this
	return root
}

Node.prototype.LRadjust = function() {
	root = this.left.right
	root_left = this.left
	root_right = this
	root_left.right = root.left
	root_right.left = root.right
	root.left = root_left
	root.right = root_right
	return root
}

Node.prototype.RXadjust = function() {
	if (this.right.calcFactor() > 0 ) {
		return this.RLadjust()
	}
	return this.RRadjust()
}

Node.prototype.RRadjust = function() {
	root = this.right
	this.right = root.left
	root.left = this
	return root
}

Node.prototype.RLadjust = function() {
	root = this.right.left
	root_left = this
	root_right = this.right
	root_left.right = root.left
	root_right.left = root.right
	root.left = root_left
	root.right = root_right
	return root
}
