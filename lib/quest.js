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


var Quest = function(d,t,r) {
        this.description = typeof d !== 'undefined' ? d : this._def.description;
        this.test        = typeof t !== 'undefined' ? t : this._def.test;
        this.reward      = typeof r !== 'undefined' ? r : this._def.reward;
};

Quest.version = "0.0.1";

Quest._def = {};
Quest._def.description = function(){ return "";   };
Quest._def.test        = function(){ return true; };
Quest._def.reward      = function(){ return "";   };



