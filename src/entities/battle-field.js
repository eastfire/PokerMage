Crafty.c("BattleField", {
	init:function(){

	},
	_enterFrame:function(){

	},
	summonField:function(options){
		this.model = options.model;
		this.chips = new ManaCollection();
		this.chipEntities = {};

		this.addComponent("BattleField1","Collision");
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
		this.origin(this.w/2, this.h/2);

		this.model.on("destroy",this.onDie,this);
		this.chips.on("add",this._onAddChip,this);
		this.chips.on("remove",this._onRemoveChip,this);
		this.chips.on("reset",this._onResetChip,this);
		
		return this;
	},
});

BattleField = Backbone.Model.extend({
	defaults: {
		w:140,
		h:140,
		owner:1,
		status:"normal",
		chips:null
    },
    initialize: function(){
    }
});

BattleFieldCollection = Backbone.Collection.extend({
	model:BattleField
});