generator.prototype.getTiles = function() {
	return this.tiles;
}

generator.prototype.step = function(width) {
	newAttrs = {}
	for (var key in this.generators) {
		newAttrs[key] = this.generators[key](this.tiles);
	}
	height = this.heightGenerator(this.tiles);
	this.tiles.push({
		Width: width,
		Height: height,
		Location: {
			X: this.pointer.X,
			Y: this.pointer.Y,
		},
		attributes: newAttrs,
	});
	this.pointer.X += width;
	this.pointer.Y += height;
}

generator.prototype.registerGenerator = function(attr, genFunc) {
	this.generators[attr] = genFunc;
}

generator.prototype.unregisterGenerator =  function(attr) {
	delete this.generators[attr];
}

generator.prototype.registerHeightGenerator = function(genFunc) {
	this.heightGenerator = genFunc;
}

generator.prototype.addTile = function(tile) {
	this.tiles.push(tile);

	// Do not allow negative y values
	if (tile.Height + this.pointer.Y < 0) {
		this.pointer.Y = 0;
	}
	else {
		this.pointer.Y += tile.Height;
	}
}


function generator() {
	this.attributes = {};
	this.generators = {};
	this.tiles = [];
	this.pointer = {
		X: 0,
		Y: 0,
	};
}

