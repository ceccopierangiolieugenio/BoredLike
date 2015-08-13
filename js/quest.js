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

/*
    NOTE: 
        I'd like to define a generic Quest structure capable to be easily expanded
        with various different kind of possible adventures.
        Keep in mind that a Quest may not involve an actor but also a scroll,
        inscription, prophecy...
        
        * 0.0.1
            Let's start with something simple:
             - Actor who want an object.
            Description: "I want that object"
            Test:        Actor has it
            Reward:      None
*/


var Quest = function (obj, desc, test, rew, diag) {    
    this.obj = obj;
    this.completed   = false;
    this.description = desc !== undefined ? desc : this._def.description;
    this.test        = test !== undefined ? test : this._def.test;
    this.reward      = rew  !== undefined ? rew  : this._def.reward;
    this.dialogs     = diag !== undefined ? diag : this._def.getDialogs;
};

Quest.version = "0.0.1";

Quest.prototype._def = {
    description: function () { return ""; },
    test:        function () { return true; },
    reward:      function () { return ""; },
    dialogs:     function () { return []; }
};
    
Quest.prototype.start = function () { this.description(this.obj); };
Quest.prototype.getDialogs = function () { return this.dialogs(this.obj); };

Quest.prototype.act = function () {
    if (!this.completed)
        if (this.test(this.obj)) {
            this.completed = true;
            this.reward(this.obj);
        }
};