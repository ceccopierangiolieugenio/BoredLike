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


var Quest = function (obj, d, t, r) {    
    this.obj = obj;
    this.completed   = false;
    this.description = d !== undefined ? d : this._def.description;
    this.test        = t !== undefined ? t : this._def.test;
    this.reward      = r !== undefined ? r : this._def.reward;
};

Quest.version = "0.0.1";

Quest.prototype._def = {};
Quest.prototype._def.description = function(){ return "";   };
Quest.prototype._def.test        = function(){ return true; };
Quest.prototype._def.reward      = function(){ return "";   };

Quest.prototype.start = function(){
    this.description(this.obj);
};

Quest.prototype.act = function(){
    if (!this.completed)
        if (this.test(this.obj)){
            this.completed = true;
            this.reward(this.obj); 
        }
};
