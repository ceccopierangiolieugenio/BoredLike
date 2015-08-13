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

var Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._inventory = new Inventory();
    Game.map[x][y].setActor(this);
};

Player.prototype.getSpeed = function() { return 100; };
Player.prototype.getX = function() { return this._x; };
Player.prototype.getY = function() { return this._y; };
Player.prototype.getInventory  = function ()  { return this._inventory; };

Player.prototype.act = function () {
    Game.engine.lock();
    window.addEventListener("keydown", this);
};

Player.prototype.handleEvent = function (e) {
    var code = e.keyCode;
    
    /* Get */
    if (code === ROT.VK_G) {
        var m = Game.map[this._x][this._y];
        var item = Game.map[this._x][this._y].getObj();
        if (item !== undefined) {
            this._inventory.addItem(item);
            Game.map[this._x][this._y].setObj(undefined);
            Game.log("Got a " + item.getName());
        }
        return;
    }

    /* Inventory */
    if (code === ROT.VK_I) {
        if (this._inventory.getSize() === 0) {
            Game.log("Your inventory is Empty");
        } else {
            Game.log("Your inventory:");
            this._inventory.log();
        }
        return;
    }

    var dir = [];
    switch (code) {
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
    if (Game.map[newX][newY].isNotPassable()) {
        /* Something does not allow us in */
        if (Game.map[newX][newY].actor !== undefined) {
            /* a NPC is there */
            // DEBUG
            // Game.log("NPC there!!!");
            window.removeEventListener("keydown", this);
            Game.map[newX][newY].actor.action();
            // DEBUG
            // Game.log("NPC there!!! + 1");
            return;
        }
        return;
    }

    Game.map[this._x][this._y].setActor(undefined);
    Game.map[this._x][this._y].draw(this._x, this._y);
    this._x = newX;
    this._y = newY;
    Game.map[this._x][this._y].setActor(this);
    Game.map[this._x][this._y].draw(this._x, this._y);
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
};
    
Player.prototype.draw = function (x, y) { Game.display.draw(x, y, "@", "#ff0"); };


