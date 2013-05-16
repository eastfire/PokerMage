CHIP_STACK_DISTANCE = 17;

Crafty.c("BattleField", {
	init:function(){

	},
	_enterFrame:function(){
		
	},
	battleField:function(options){
		this.model = options.model;
		this.index = options.index;
		this.addComponent("Collision");
		this.attr({
			z:1,
			x:this.model.get("x")*100+210,
			y:this.model.get("y")*105
		})
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
		status:"normal"
    },
    initialize: function(){
    }
});

BattleFieldCollection = Backbone.Collection.extend({
	model:BattleField
});