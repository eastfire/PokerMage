Crafty.c("Chip", {
	init:function(){
		this.requires("Mouse,Tween")
	},
	chip:function(options){
		this.model = options.model;
		this.attr(this.model.toJSON())
			.bind('Click', this._onClicked);
		
		this.origin(this.w/2, this.h/2);
		this.model.on("die",this.onChipDie,this);

		this.addComponent("newCreate, Tween, S-chip-"+this.model.get("owner"));
		this.faceEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", S-"+this.model.get("spell").get("name"))
			.attr({w: 60, h: 60, x: this.x + 20, y: this.y + 20, z: this.z});
		if ( this.model.get("owner") === 2)	{
			this.faceEntity.flip("X");
		}
		this.attach(this.faceEntity);
		return this;
	},
	onChipDie:function(){
		var self = this;
		this.tween({alpha:0},10);
		this.bind("TweenEnd",function(){
			self.faceEntity.destroy();
			self.destroy();
			self.model.destroy();
		});
	}
});

Chip = Backbone.Model.extend({
	defaults: function(){
		return {
			owner: 1,
			spell: null
	    };
	}
});

ChipCollection = Backbone.Collection.extend({
	model:Chip
});