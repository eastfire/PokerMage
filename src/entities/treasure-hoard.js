Crafty.c("TreasureHoard", {
	init:function(){
	},
	_enterFrame:function(){		
		this.numberEntity.text(this.model.get("vp")).attr({x:this.x+this.w/2,y:this.y+30, z:this.z});
	},
	treasureHoard:function(options){
		this.model = options.model;
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
		this.origin(this.w/2, this.h/2);
		this.model.on("change:status",this._onStatusChanged,this);
		this.model.on("destroy",this.onDie,this);

		this._onStatusChanged(this.model);
		
		this.numberEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 20, h: 20, x: this.x + 20, y: this.y + 30 , z: this.z})
					.text(this.attr("vp"))
					.textColor('#ffffff')
					.textFont({'size' : "36px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");;
		return this;
	},
	_onStatusChanged:function(model){
		if ( this.attr("status") === "normal" ){
			this.addComponent("TreasureHoardOk").removeComponent("TreasureHoardForbiden");
		} else if ( this.attr("status") === "forbiden" ){
			this.removeComponent("TreasureHoardOk").addComponent("TreasureHoardForbiden");
		}
	},
	onDie:function(){
		this.numberEntity.destroy();
		this.destroy();
	}
});

TreasureHoard = Backbone.Model.extend({
	defaults: {
		vp:10,
		status:"normal"
    },
	takeVP:function(amount){
		var a = Math.min( this.get("vp"), amount);
		this.set("vp", this.get("vp")-a);
		return a;
	}
});
