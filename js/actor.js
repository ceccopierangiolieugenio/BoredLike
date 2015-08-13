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

var Actor = function (x, y, name) {
    this._x = x;
    this._y = y;
    this._hp = 100;
    this._name = name === undefined ? NameGen.generate() : name;
    this._quests = [];
    this._inventory = new Inventory();
    Game.map[x][y].setActor(this);
};

Actor.prototype.isAlive  = function ()  { return this._hp > 0; };
Actor.prototype.getName  = function ()  { return this._name; };
Actor.prototype.getInventory  = function ()  { return this._inventory; };
Actor.prototype.addQuest = function (q) { this._quests.push(q); };

Actor.prototype.draw = function (x, y) { Game.display.draw(x, y, "@", "#0ff"); };
    
Actor.prototype.kill = function () {
    Game.log("AAAAARGH!!!, How dare you kill " + this._name);
    /* Useless at this stage of the game and probably the 
     HP will never be used in BoredLike*/
    this._hp = 0
    Game.map[this._x][this._y].setPassable(true);
    Game.map[this._x][this._y].setActor(undefined);
    Game.map[this._x][this._y].setObj(new Corpse(this));
    Game.map[this._x][this._y].draw(this._x, this._y);
};

Actor.prototype.action = function () {
    /* Open a dialog with the options available */
    var options = [];
    options.push(new DiagMenuItem("talk", function () {
        Game.log("Hello!!!, I'm " + this._name);
    }.bind(this)));
    //options = options.concat([new DiagMenuItem("kill", this.kill.bind(this))]);
    for (var i = 0; i < this._quests.length; i++) {
        options = options.concat(this._quests[i].getDialogs());
    }
    options.push(new DiagMenuItem("exit", function () {
    }));
    DiagMenu.choose(options);
    return;
};

var Corpse = function (body) {
    this._body = body;
};

Corpse.prototype.draw = function (x, y) { Game.display.draw(x, y, "%", "#f00"); };

