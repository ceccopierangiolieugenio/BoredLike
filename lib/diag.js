var DiagMenuItem = function(t,c){
        this.txt      = t;
        this.callback = c;
};

var DiagMenu = {};

DiagMenu._x      = 10;
DiagMenu._y      = 05;
DiagMenu._width  = 50;
DiagMenu._height = 10;

DiagMenu.choose = function(opt){
        this._options = opt;
        this._id   = 0;
        this._tilt = 0;
        this._draw();
        window.addEventListener("keydown", this);
};

DiagMenu.handleEvent = function(e){
        // DEBUG
        // Game.log("Diag KC: " + e.keyCode);
        switch(e.keyCode){
           case ROT.VK_RETURN:
           case ROT.VK_SPACE:
                this._options[this._id].callback();
           case ROT.VK_ESCAPE:
                window.removeEventListener("keydown", this);
                Game.draw(this._x,this._y,this._width,this._height);
                Game.engine.unlock();
                return;
           case ROT.VK_UP:
                this._id = this._id>0?this._id-1:this._options.length-1;    
                break;
           case ROT.VK_DOWN:
                this._id = (this._id+1)%this._options.length;    
                break;
        }
        this._draw();
};

DiagMenu._draw = function(){
        /* Draw Borders */
        var strT = new Array(this._width).join('#');
        var strC = '#' + new Array(this._width-2).join(' ') + '#';
        Game.display.drawText(this._x, this._y, strT ,this._width);
        Game.display.drawText(this._x, this._y+this._height-1, strT ,this._width);
        for (var i=1;i<this._height-1;i++){
                Game.display.drawText(this._x, this._y+i, strC ,this._width);
        }
        /* Draw Entries */
        /* Explaination of the tilt: 
         *
         *  id   win          win  id  t    h-2
         *       -                 
         *  0    | >  ent 01       5 = 2 + (5-2)
         *       |    ent 02   - 
         *       |    ent 03   |
         *       |    ent 04   |
         *       |    ent 05   |
         *       _    ent 06 < |
         *            ent 07   |
         *            ent 08   -
         *            ent 09   
         *            ent 10   
         *  
         */
         /* I'm ashamed by this crap, 
            TODO:
                I can improve it */ 
        if (this._id > ( this._tilt + this._height - 5 )){ this._tilt = this._id - this._height + 5 ; }
        if (this._id <   this._tilt )                    { this._tilt = this._id ; }
        // DEBUG
        // Game.log("h: "+this._height+"  id: "+this._id + "   t: " + this._tilt);
        for (var i=0;i<Math.min(this._options.length,this._height-4);i++){
                if (this._id == i+this._tilt){
                        Game.display.drawText(this._x+2, this._y+2+i, "%b{blue}"+this._options[i+this._tilt].txt+"%b{}", this._width);
                }else{
                        Game.display.drawText(this._x+2, this._y+2+i, this._options[i+this._tilt].txt, this._width);
                }
        }
};
