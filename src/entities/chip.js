Crafty.c("Chip", {
	init:function(){
	},
	chip:function(options){
		this.model = options.model;
		this.attr(this.model.toJSON())
			.bind('EnterFrame', function(){
				this.faceEntity.attr({x:this.x+20,y:this.y+20, z:this.z});				
			})
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);
		this.model.on("destroy",this.onDie,this);

		this.addComponent("S-chip-"+this.spell.get("type"));
		this.faceEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", S-"+this.model.get("spell").get("name"))
			.attr({w: 60, h: 60, x: this.x + 20, y: this.y + 20, z: this.z});

		return this;
	},
	onDie:function(){
		this.faceEntity.destroy();
		this.destroy();

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
})