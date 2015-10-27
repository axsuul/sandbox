var Island = function(x, y) {
  if (x != undefined && y != undefined) {
    this.coords = [[x, y]];
  }

  this.addCoord = function(x, y) {
    this.coords.push([x, y]);
  }

  this.isAdjacent = function(x, y) {
    for (var i = 0; i < this.coords.length; i++) {
      var coord = this.coords[i];
      var thisX = coord[0];
      var thisY = coord[1];

      // if above or below it
      if ((thisX == x) && (Math.abs(thisY - y) == 1)) {
        return true;

      // if left or right to it
      } else if ((thisY == y) && (Math.abs(thisX - x) == 1)) {
        return true;

      }
    }

    return false;
  }
}

var World = function(map) {
  this.map = map;
  this.islands = [];

  this.addIsland = function(island) {
    this.islands.push(island);
  }

  this.findAdjacentIsland = function(x, y) {
    for (var i = 0; i < this.islands.length; i++) {
      var island = this.islands[i];

      if (island.isAdjacent(x, y)) {
        return island;
      }
    }

    return null;
  }

  this.build = function() {
    var rows = this.map.split("\n");

    for (var x = 0; x < rows.length; x++) {
      var row = rows[x];

      cols = row.split('');

      for (var y = 0; y < cols.length; y++) {
        var col = cols[y];

        if (col == "0") {
          var adjacentIsland = this.findAdjacentIsland(x, y);

          if (adjacentIsland) {
            adjacentIsland.addCoord(x, y);

          // If no adjacent island found, create a new one
          } else {
            this.addIsland(new Island(x, y));
          }
        }
      }
    }
  }

  this.build();
}

// Test cases
var maps = [
  "..000.\n..000.\n..000.\n.0....\n..000.",
  "0...0\n..0..\n0...0"
]

maps.forEach(function(map) {
  var world = new World(map);

  console.log(world.map);
  console.log("There are " + world.islands.length + " islands");
  console.log("---------------------");
});