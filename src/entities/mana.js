NumMap = ["A", 2,3,4,5,6,7,8,9,10,"J","Q","K"];
FontMap = {
	"S":"12px",
	"M":"28px",
	"L":"52px"
};
offsetXMap = {
	"S":8,
	"M":16,
	"L":32
};
offsetYMap = {
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
	_onClicked:function(event){
	},
	_onStartDrag:function(event){
		this.isDragging = true;
		this.originX = this.x;
		this.originY = this.y;
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
				field.cards.add(this.model);
				this.onDie();
			}
		}
		this.x = this.originX;
		this.y = this.originY;
	},
	manaCard:function(options){
		this.model = options.model;
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);
		this.model.on("destroy",this.onDie,this);

		if ( !options.fix ) {
			this.addComponent("Draggable","Collision")
				.bind("StartDrag",this._onStartDrag)
				.bind("StopDrag",this._onStopDrag);
		}

		this.addComponent(this.attr("size")+"-suit"+this.attr("suit"));
		this.offsetX = offsetXMap[this.attr("size")];
		this.offsetY = offsetYMap[this.attr("size")];;

		var num = NumMap[this.attr("number")-1];
		this.numberEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 20, h: 20, x: this.x + this.offsetX, y: this.y + this.offsetY, z: this.z})
					.text(num)
					.textColor('#000')
					.textFont({'size' : FontMap[this.attr("size")], 'family': 'Arial'});
		return this;
	},
	onDie:function(){
		this.numberEntity.destroy();
		this.destroy();
	}
});

ManaCard = BaseEntity.extend({
	defaults: {
		number:1,
		suit:1,
		x:0,
		y:0
    },
    initialize: function(){
		if ( this.get("size") === "L" ){
			this.set({
				w:100,
				h:160
			});
		} else if ( this.get("size") === "M" ){
			this.set({
				w:50,
				h:80
			});
		} else if ( this.get("size") === "S" ){
			this.set({
				w:25,
				h:40
			});
		}
    }
});

ManaCollection = Backbone.Collection.extend({
	model:ManaCard
});