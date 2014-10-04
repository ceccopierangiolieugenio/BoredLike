function init_main(){ Game.init(); }

var Game = {
    display: null,
    map: [],
    engine: null,
    player: null,
    ananas: null,

    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());

				this._init_map();
        this._generateMap();

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },

		_init_map: function() {
				this.map.width  = ROT.DEFAULT_WIDTH;
				this.map.height = ROT.DEFAULT_WIDTH;
				for ( var x = 0 ; x < this.map.width ; x++ ){
					this.map[x] = [];
					for ( var y = 0 ; y < this.map.height ; y++ ){
						this.map[x][y] = new Tile('#',false);
					}
				}
		},

    _generateMap: function() {
        var digger = new ROT.Map.Digger();
        var freeCells = [];

        var digCallback = function(x, y, value) {
            if (value) { return; }

            var key = {'x':x,'y':y};
            this.map[x][y].set('.',true);
            freeCells.push(key);
        }
        digger.create(digCallback.bind(this));

        this._drawWholeMap();
				for (var i=0;i<10;i++)
						this._createActor(freeCells,10);

        this.player = this._createBeing(Player, freeCells);
    },

		_createActor: function(freeCells,trials) {
				for (var t=0;t<trials;t++){
		    		var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        		var key = freeCells.splice(index, 1)[0];
						if (this._testActorPosition(key.x,key.y)){
				    		Game.display.draw(key.x, key.y, "@", "#0ff");
								return;
						}else{
				    		Game.display.draw(key.x, key.y, "@", "#f00");
						}
				}
		},

		/* 
				_testActorPosition( x , y )
				Check if the actor position does not block the player
		 */
		_testActorPosition: function(x,y){
				var topology = "4";
				/* find the first free slot around */
				var startPos = null;
				for (var i=0;i<ROT.DIRS[topology].length;i++){
						var d = ROT.DIRS[topology][i];
    				if (Game.map[x+d[0]][y+d[1]].isPassable()){
								startPos = {'x':x+d[0] , 'y':y+d[1]};
								break;
						}
				}
				/* A null value means actor not reachable in any direction (weird) */
				if (startPos == null) return false;
				/* Check that any other free slot is reachable from the first one */
				Game.map[x][y].setPassable(false);
				/* input callback informs about map structure */
				var passableCallback = function(_x, _y) {
				    return ( Game.map[_x][_y].isPassable() );
				}
				/* prepare path to given coords */
				var dijkstra = new ROT.Path.Dijkstra(startPos.x,startPos.y, passableCallback,{'topology':topology});
				for (var i=0;i<ROT.DIRS[topology].length;i++){
						var d = ROT.DIRS[topology][i];
    				if (Game.map[x+d[0]][y+d[1]].isPassable()){
								var reachable = false;
								var checkPath = function(x,y){
										reachable = true;
								    Game.display.draw(x, y, Game.map[x][y].getSymbol(), "", "#808");
								};
								/* compute from given coords #1 */
								dijkstra.compute(x+d[0],y+d[1], checkPath);
								console.log(reachable);
								if (reachable == false) {
								  /* 
											for some kind of reason 
											placing an actor here will prevent some areas to be
											rached by the player.
									 */
									Game.map[x][y].setPassable(true);
									return false;
								}
						}
				}
				return true;
		},

    _createBeing: function(what, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        return new what(key.x, key.y);
    },

    _drawWholeMap: function() {
        for (var x = 0 ; x < this.map.length ; x++) {
        	for (var y = 0 ; y < this.map[x].length ; y++) {
            this.display.draw(x, y, this.map[x][y].getSymbol());
					}
        }
    }
};

var Tile = function(s,p) {
		this.set(s,p);
};

Tile.prototype.isPassable    = function(){  return  this.passable; };
Tile.prototype.isNotPassable = function(){  return !this.passable; };
Tile.prototype.getSymbol   = function(){  return this.symbol;   };
Tile.prototype.setPassable = function(p){ this.passable = p;    };
Tile.prototype.set         = function(s,p){
		this.passable = typeof p !== 'undefined' ? p : true;
		this.symbol   = typeof s !== 'undefined' ? s : '';
};

var Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
};

Player.prototype.getSpeed = function() { return 100; }
Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }

Player.prototype.act = function() {
    Game.engine.lock();
    window.addEventListener("keydown", this);
};

Player.prototype.handleEvent = function(e) {
    var code = e.keyCode;

		var dir = [];
    switch (code){
			case ROT.VK_UP:
				dir = ROT.DIRS[4][0];
				break;
			case ROT.VK_DOWN:
				dir = ROT.DIRS[4][2];
				break;
			case ROT.VK_LEFT:
				dir = ROT.DIRS[4][3];
				break;
			case ROT.VK_RIGHT:
				dir = ROT.DIRS[4][1];
				break;
			default:
			return;
		}

    /* is there a free space? */
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    if (Game.map[newX][newY].isNotPassable()) { return; }

    Game.display.draw(this._x, this._y, Game.map[this._x][this._y].getSymbol());
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
};

Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#ff0");
};

