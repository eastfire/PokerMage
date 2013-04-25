Crafty.c("SummonField", {
	init:function(){

	},
	_enterFrame:function(){
		var ret;
		if ( ret = this.hit('ManaCard')) {
			var manaCard = ret[0].obj;
			if ( Math.abs(this.x+this._origin.x - manaCard.x - manaCard._origin.x)<this.w/2 && Math.abs(this.y+this._origin.y - manaCard.y-manaCard._origin.y)<this.h/2 ) {
				this.addComponent("SummonFieldValid").removeComponent("SummonFieldEmpty");
			} else
				this.removeComponent("SummonFieldValid").addComponent("SummonFieldEmpty");
		} else
			this.removeComponent("SummonFieldValid").addComponent("SummonFieldEmpty");
	},
	_onClicked:function(event){

	},
	summonField:function(options){
		this.model = options.model;
		this.manas = new ManaCollection();
		this.addComponent("SummonFieldEmpty","Collision");
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);

		this.model.on("destroy",this.onDie,this);
		this.manas.on("add",this._onAddMana,this);
		this.manas.on("remove",this._onRemoveMana,this);
		this.manas.on("reset",this._onResetMana,this);
		
		return this;
	},

	
	
	onDie:function(){
		this.destroy();
	}
});

SummonField = BaseEntity.extend({
	defaults: {
		w:200,
		h:100,
		owner:1,
		enable:true
    },
    initialize: function(){
    }
});

SummonFieldCollection = Backbone.Collection.extend({
	model:SummonField
});