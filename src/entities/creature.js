Crafty.c("Creature", {
	init:function(){
	},
	_enterFrame:function(){
		this.attIconEntity.attr({x:this.x+11,y:this.y+11, z:this.z});
		this.attEntity.text(this.model.getAttack()).attr({x:this.x+20,y:this.y+8, z:this.z});
		this.hpIconEntity.attr({x:this.x+74,y:this.y+11, z:this.z});
		this.hpEntity.text(this.model.getHP()).attr({x:this.x+83,y:this.y+8, z:this.z});
		this.vpIconEntity.attr({x:this.x+74,y:this.y+71, z:this.z});
		this.vpEntity.text(this.model.getVP()).attr({x:this.x+83,y:this.y+67, z:this.z});
	},
	_onClicked:function(){
	},
	creature:function(options){
		this.model = options.model;
		this.index = options.index;
		this.attr(this.model.toJSON())
//			.bind('EnterFrame', this._enterFrame)
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);
		this.model.on("destroy",this.onDie,this);

		this.attr(options).bind('EnterFrame', this._enterFrame).bind('Click', this._onClicked);
		
		this.attIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Att-icon")
			.attr({w: 18, h: 18, x: this.x + 11, y: this.y + 11, z: this.z})
		this.attEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 5, y: this.y + 0, z: this.z})
					.text(this.att)
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");
		this.hpIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Hp-icon")
			.attr({w: 18, h: 18, x: this.x + 76, y: this.y, z: this.z})
		this.hpEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 75, y: this.y + 0, z: this.z})
					.text(this.hp)
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");
		this.vpIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Vp-icon")
			.attr({w: 18, h: 18, x: this.x + 74, y: this.y, z: this.z})
		this.vpEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 74, y: this.y, z: this.z})
					.text(this.vp)
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");
		return this;
	},
	attack:function(){
		var orginY = this.attr("y");
		var self = this;
		var treasure = treasureHoard[this.index];
		var oppositeChip = playingPlayer[3-this.owner].battleField[this.index].chip;
		if ( treasure.model.get("status") === "normal" && treasure.model.get("vp") > 0 )	{
			this.tween({y:this.owner===1?(treasure.attr("y")+treasure.attr("h")):(treasure.attr("y") - this.attr("h")) },15);
			timer.delay(function() {
				var amount = treasure.model.takeVP(self.model.getAttack());
				playingPlayer[self.owner].changeVP(amount);
				self.tween({y:orginY},15);
			}, 500);
		} else if ( oppositeChip && oppositeChip.has("Creature") ){
			this.tween({y:treasure.attr("y")+treasure.attr("h")/2 - ( this.owner===1?0 : this.attr("h") ) },15);
			timer.delay(function() {
				self.tween({y:orginY},15);
			}, 500);
		} else {

		}

	},
	takeDamage:function(amount, color){

	},
	onDie:function(){
		this.attIconEntity.destory();
		this.attEntity.destory();
		this.hpIconEntity.destory();
		this.hpEntity.destroy();
		this.vpIconEntity.destory();
		this.vpEntity.destroy();
	}
});

Creature = Chip.extend({
	defaults: function(){
		return _.extend(Chip.prototype.defaults.call(this), {
			x : 0,
			y : 0,
			hp : 16,
			att : 11,
			vp : 10,
			w:100,
			h:100
		});
    },
    initialize: function(){
    },
	getAttack:function(){
		return this.get("att");
	},
	getHP:function(){
		return this.get("hp");
	},
	getVP:function(){
		return this.get("vp");
	}
});