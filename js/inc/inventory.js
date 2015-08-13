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

function Inventory(){
    this._inventory = [];
}

Inventory.prototype.getInventory = function(){return this._inventory;};

Inventory.prototype.getSize = function(){return this._inventory.length;};

Inventory.prototype.addItem = function(item){this._inventory.push(item)};

Inventory.prototype.removeItem = function (item) {
    var id = this._inventory.indexOf(item);
    if (id > -1) {
        this._inventory.splice(id, 1);
    }
};

Inventory.prototype.searchByName = function (name) {
    for (var i = 0; i < this._inventory.length; i++)
        if (this._inventory[i].getName() === name)
            return this._inventory[i];
    return undefined;
};

Inventory.prototype.log = function () {
    for (var i = 0; i < this._inventory.length; i++)
        Game.log(i+") "+this._inventory[i].getName())
};
