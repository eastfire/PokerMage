CONST.NumMap = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
CONST.FontMap = {
	"S":"12px",
	"M":"28px",
	"L":"52px"
};
CONST.OFFSET_X_MAP = {
	"S":8,
	"M":16,
	"L":32
};
CONST.OFFSET_X_MAP_FOR_10 = {
	"S":5,
	"M":8,
	"L":16
};
CONST.OFFSET_Y_MAP = {
	"S":-3,
	"M":12,
	"L":40
};

Crafty.c("ManaCard", {
	init:function(){
	},
	_enterFrame:function(){
		this.numberEntity.attr({x:this.x+this.offsetX,y:this.y+this.offsetY, z:this.z});
	},
	_onStartDrag:function(event){
		this.isDragging = true;
		this.originX = this.x;
		this.originY = this.y;
		this.originZ = this.z;
		this.z = 99;
	},
	_onDragging:function(event){
		
	},
	_onStopDrag:function(event){
		if ( !this.isDragging )
			return;
		this.isDragging = false;

		var ret;
		if ( ret = this.hit('SummonField')) {
			var field = ret[0].obj;
			if ( Math.abs(field.x+field._origin.x - this.x - this._origin.x)<field.w/2 && Math.abs(field.y+field._origin.y - this.y-this._origin.y)<field.h/2 ) {
				this.model.collection.remove(this.model);
				field.addMana(this.model);
				this.onDie();
			}
		}
		this.x = this.originX;
		this.y = this.originY;
		this.z = this.originZ;
	},
	manaCard:function(options){
		this.model = options.model;
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
		this.origin(this.w/2, this.h/2);
		this.model.on("destroy",this.onDie,this);
		this.model.on("change:number",this._onNumberChange,this);

		if ( options.size === "L" ){
			this.attr({
				w:100,
				h:160
			});
		} else if ( options.size === "M" ){
			this.attr({
				w:50,
				h:80
			});
		} else if ( options.size === "S" ){
			this.attr({
				w:25,
				h:40
			});
		}
		
		if ( !options.fix ) {
			this.addComponent("Draggable","Collision","ManaCardActive")
				.bind("StartDrag",this._onStartDrag)
				.bind("StopDrag",this._onStopDrag);
		}

		this.addComponent(options.size+"-suit"+this.attr("suit"));
		this.offsetX = this.number === 10 ? CONST.OFFSET_X_MAP_FOR_10[options.size] : CONST.OFFSET_X_MAP[options.size];
		this.offsetY = CONST.OFFSET_Y_MAP[options.size];

		var num = CONST.NumMap[this.attr("number")-2];
		this.numberEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 20, h: 20, x: this.x + this.offsetX, y: this.y + this.offsetY, z: this.z})
					.text(num)
					.textColor('#000000')
					.textFont({'size' : CONST.FontMap[options.size], 'family': 'Arial', "weight": 'bold'});
		return this;
	},
	_onNumberChange:function(){
		this.number = this.model.get("number");
		var size = this.model.get("size");
		this.offsetX = this.number === 10 ? CONST.OFFSET_X_MAP_FOR_10[size] : CONST.OFFSET_X_MAP[size];
	},
	onDie:function(){
		this.numberEntity.destroy();
		this.destroy();
	}
});

ManaCard = Backbone.Model.extend({
	defaults: {
		number:2,
		suit:1,
		owner:1
    },
    initialize: function(){		
    }
});


CONST.STRAIGHT_MAP = {
		"2-3-14":true,
		"2-3-4":true,
		"3-4-5":true,
		"4-5-6":true,
		"5-6-7":true,
		"6-7-8":true,
		"7-8-9":true,
		"8-9-10":true,
		"9-10-11":true,
		"10-11-12":true,
		"11-12-13":true,
		"12-13-14":true,

		"2-3-4-14":true,
		"3-4-5-6":true,
		"4-5-6-7":true,
		"5-6-7-8":true,
		"6-7-8-9":true,
		"7-8-9-10":true,
		"8-9-10-11":true,
		"9-10-11-12":true,
		"10-11-12-13":true,
		"11-12-13-14":true,

		"2-3-4-5-14":true,
		"3-4-5-6-7":true,
		"4-5-6-7-8":true,
		"5-6-7-8-9":true,
		"6-7-8-9-10":true,
		"7-8-9-10-11":true,
		"8-9-10-11-12":true,
		"9-10-11-12-13":true,
		"10-11-12-13-14":true
	};

ManaCollection = Backbone.Collection.extend({
	model:ManaCard,

	isStraight:function(){
		if (this.length<=2)
			return false;
		var v = this.map ( function(card){
			return card.get("number");
		}).join("-");
		return CONST.STRAIGHT_MAP[v];
	},
	isSameNumber:function(){
		var v = this.at(0).get("number");
		for ( var i = 1; i < this.length ; i++ ){
			if ( v != this.at(i).get("number") )
				return false;
		}
		return true;
	},
	isSameSuit:function(){
		var v = this.at(0).get("suit");
		for ( var i = 1; i < this.length ; i++ ){
			if ( v != this.at(i).get("suit") )
				return false;
		}
		return true;
	},
	isPair:function(){
		if ( this.length % 2 === 1)
			return false;
		for ( var i = 0; i < this.length/2 ; i++ ){
			if ( this.at(i*2).get("number") != this.at(i*2+1).get("number"))
				return false;
		}
		return true;
	},
	isFullHouse:function(){
		if ( this.length != 5 )
			return false;
		if ( (this.at(0).get("number") === this.at(1).get("number") && 
		     this.at(0).get("number") === this.at(2).get("number") &&
		     this.at(3).get("number") === this.at(4).get("number")) ||
		     (this.at(0).get("number") === this.at(1).get("number") && 
		     this.at(2).get("number") === this.at(3).get("number") &&
		     this.at(3).get("number") === this.at(4).get("number")) )
			return true;
		return false;
	},
	feature:function(){
		var ret = {};
		if (this.length<=1)
			return ret;
		if ( this.isStraight() ){
			ret.straight = this.length;
		}
		if ( this.isSameNumber() ){
			ret.number = this.length;
		}
		if ( this.isSameSuit() ){
			ret.suit = this.length;
		}
		if ( this.isPair() ){
			ret.pair = this.length/2;
		}
		if ( this.isFullHouse() ){
			ret.fullHouse = 1;
		}
		return ret;
	},
	comparator:function(model){
		return model.get("number")*5+model.get("suit");
	}
});