Crafty.c("SummonField", {
	init:function(){

	},
	_enterFrame:function(){
		var left = this.x + 50;
		var top = this.y + 30;
		var self = this;
		for ( var i = 0; i < this.manas.length ; i++ ) {
			var model = this.manas.at(i);
			this.manaEntities[model.cid].attr({
				x:left,
				y:top,
				z:self.z+i
			});
			left += 20;
		};
		var ret;
		if ( ret = this.hit('ManaCardActive')) {
			var manaCard = ret[0].obj;
			if ( manaCard.owner === this.owner ) {
				if ( Math.abs(this.x+this._origin.x - manaCard.x - manaCard._origin.x)<this.w/2 && Math.abs(this.y+this._origin.y - manaCard.y-manaCard._origin.y)<this.h/2 ) {
					this.showValid();
				} else
					this.showWaiting();
			}
		} else
			this.showWaiting();
	},
	addMana:function(mana){
		this.manas.add(mana);
	},
	showWaiting:function(){
		this.removeComponent("SummonFieldValid").addComponent("SummonFieldEmpty");
	},
	showValid:function(){
		this.addComponent("SummonFieldValid").removeComponent("SummonFieldEmpty");
	},	
	_onClicked:function(event){

	},
	summonField:function(options){
		this.model = options.model;
		this.manas = new ManaCollection();
		this.manaEntities = {};

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
		
	_onAddMana:function(model,collection,options){
		this.manaEntities[model.cid] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard")
					.manaCard({model: model, fix:true, size:"S"});
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