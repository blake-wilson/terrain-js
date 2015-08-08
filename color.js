var g;

colorgen = function() {

	g = new generator();

	g.registerHeightGenerator(function(tiles) {
		hexval = tiles[tiles.length-1].attributes["color"];
		numval = parseInt(hexval, 16);
		mask = 0x0F;

		var neg;
		if (numval % 2 == 0) {
			neg = 1;
		}
		else {
			neg = -1;
		}
		return (numval & mask) * neg;
	});
	colorGenFunc = function(tiles) {
		lastTile = tiles[tiles.length-1];
		newHexVal = parseInt(lastTile.attributes["color"], 16);
		newHexVal += 500007;
		newHexVal = newHexVal % 16777215;
		numZeroes = 6 - newHexVal.toString(16).length;
		zerostr = "";
		for (var i = 0; i < numZeroes; i++)  {
			zerostr += "0";
		}
		return zerostr + newHexVal.toString(16);
	}

	g.registerGenerator("color", colorGenFunc);

	var tile = {
		Width: 20,
		Height: 100,
		Location: {
			X: 0,
			Y: 0,
		},
		attributes: {"color": "000000"},
	}
	g.addTile(tile)

	for (var i = 0; i < 100; i++) {
		tiles = g.step(15);
	}

	csv = formatCSV(g.getTiles());
	console.log(csv);
}

formatCSV = function(tiles) {
	// print the tiles in CSV format
	str = "";
	for (var i = 0; i < tiles.length; i++) {
		str += tiles[i].Location.X.toString() + ", " + tiles[i].Location.Y.toString();
		for (var attr in tiles[i].attributes) {
			str += ", " + tiles[i].attributes[attr];
		}
		str += "\n"
	}
	return str;
}

colorgen();
