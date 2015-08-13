/* 
 * Copyright 2015 Eugenio Parodi <ceccopierangiolieugenio at googlemail>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Tile = function (s, p) {
    this.set(s, p);
    this.obj = undefined;
    this.actor = undefined;
};

Tile.prototype.isPassable    = function(){  return  this.passable; };
Tile.prototype.isNotPassable = function(){  return !this.passable; };
Tile.prototype.isEmpty       = function(){  return  this.passable && this.obj === undefined && this.actor === undefined; };

Tile.prototype.getSymbol     = function(){  return this.symbol; };
Tile.prototype.setPassable   = function(p){ this.passable = p;  };
Tile.prototype.setActor      = function(a){ this.actor    = a;  };
Tile.prototype.setObj        = function(o){ this.obj      = o;  };
Tile.prototype.getObj        = function(){ return this.obj;     };

Tile.prototype.set = function (s, p) {
    this.passable = typeof p !== undefined ? p : true;
    this.symbol = typeof s !== undefined ? s : ' ';
};

Tile.prototype.draw = function (x, y) {
    if (this.actor !== undefined)
        return this.actor.draw(x, y);
    if (this.obj !== undefined)
        return this.obj.draw(x, y);
    Game.display.draw(x, y, this.symbol);
};
