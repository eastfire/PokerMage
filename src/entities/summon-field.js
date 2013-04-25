Crafty.c("SummonField", {
	init:function(){

	},
	_enterFrame:function(){
		var ret;
		if ( ret = this.hit('Mana')) {
			
		}
	},
	_onClicked:function(event){

	},
	summonField:function(options){
		this.model = options.model;
		this.addComponent("SummonFieldEmpty","Collision");
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);
		this.model.on("destroy",this.onDie,this);
		
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