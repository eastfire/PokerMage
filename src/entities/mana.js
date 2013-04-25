NumMap = ["A", 2,3,4,5,6,7,8,9,10,"J","Q","K"];

Crafty.c("Mana", {
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
	_onStopDrag:function(event){
		this.isDragging = false;
		this.x = this.originX;
		this.y = this.originY;
	},
	mana:function(options){
		this.model = options.model;
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);
		this.model.on("destroy",this.onDie,this);
		this.addComponent("Draggable","Collision").bind("StartDrag",this._onStartDrag)
			.bind("StopDrag",this._onStopDrag);
		this.addComponent("suit"+this.attr("suit"));
		this.offsetX = this.w/2 - 18;
		this.offsetY = 40;

		var num = NumMap[this.attr("number")-1];
		this.numberEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 20, h: 20, x: this.x + this.offsetX, y: this.y + this.offsetY, z: this.z})
					.text(num)
					.textColor('#000')
					.textFont({'size' : '48px', 'family': 'Arial'});
		return this;
	},
	onDie:function(){
		this.destroy();
	}
});

ManaCard = BaseEntity.extend({
	defaults: {
		number:1,
		suit:1,
		x:0,
		y:0,
		w:100,
		h:160
    },
    initialize: function(){
    }
});

ManaCollection = Backbone.Collection.extend({
	model:ManaCard
});