CHIP_STACK_DISTANCE = 17;

Crafty.c("BattleField", {
	init:function(){

	},
	_enterFrame:function(){
		var len = this.model.chips.length;
		if ( len ) {
			var firstChip = ChipEntities[this.model.chips.at(0).cid];
			var startY = firstChip.attr("y");
			firstChip.attr({"z":len});
			for ( var i=1; i < len ; i++){
				var chip = this.model.chips.at(i);
				var chipEntity = ChipEntities[chip.cid];
				chipEntity.attr({y:startY+i*CHIP_STACK_DISTANCE});
				if ( !chipEntity.has("MouseOver") )
					chipEntity.attr({z:len-i});
			};
		}
	},
	battleField:function(options){
		this.model = options.model;
		this.index = options.index;
		this.addComponent("Collision");
		this.attr({
			z:1,
			x:this.model.get("x")*120+210,
			y:this.model.get("y")*100
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
		this.chips = new ChipCollection();
    }
});

BattleFieldCollection = Backbone.Collection.extend({
	model:BattleField
});