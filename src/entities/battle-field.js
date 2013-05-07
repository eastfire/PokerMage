Crafty.c("BattleField", {
	init:function(){

	},
	_enterFrame:function(){

	},
	battleField:function(options){
		this.model = options.model;
		this.index = options.index;
		this.addComponent("Collision");
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
		this.origin(this.w/2, this.h/2);

		this.model.on("destroy",this.onDie,this);
		return this;
	},
	onDie:function(){
	}
});

BattleField = Backbone.Model.extend({
	defaults: {
		w:200,
		h:140,
		owner:1,
		status:"normal",
		chip:null
    },
    initialize: function(){
    }
});

BattleFieldCollection = Backbone.Collection.extend({
	model:BattleField
});