Crafty.c("Creature", {
	init:function(){
		this.requires("Collision");
	},
	_enterFrame:function(){
		this.attEntity.text(this.model.getAttack())
		this.defEntity.text(this.model.getDefend())
		this.hpEntity.text(this.model.getHP())
		//this.attIconEntity.attr({x:this.x+11,y:this.y+11, z:this.z});
		//this.attEntity.text(this.model.getAttack()).attr({x:this.x+20,y:this.y+8, z:this.z});
		//this.defIconEntity.attr({x:this.x+11,y:this.y+71, z:this.z});
		//this.defEntity.text(this.model.getDefend()).attr({x:this.x+20,y:this.y+67, z:this.z});
		//this.hpIconEntity.attr({x:this.x+74,y:this.y+11, z:this.z});
		//this.hpEntity.text(this.model.getHP()).attr({x:this.x+83,y:this.y+8, z:this.z});
		//this.vpIconEntity.attr({x:this.x+74,y:this.y+71, z:this.z});
		//this.vpEntity.text(this.model.getVP()).attr({x:this.x+83,y:this.y+67, z:this.z});
		this.move();
	},
	_onClicked:function(){
	},
	creature:function(options){
		this.model = options.model;
		this.attr(this.model.toJSON())
//			.bind('EnterFrame', this._enterFrame)
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);
		this.model.on("die",this.onCreatureDie,this);

		this.attr(options).bind('EnterFrame', this._enterFrame).bind('Click', this._onClicked);
		
		this.attIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Att-icon")
			.attr({w: 18, h: 18, x: this.x + 11, y: this.y + 11, z: this.z})
		this.attEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 20, y: this.y + 8, z: this.z})
					.text("")
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");
		this.defIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Def-icon")
			.attr({w: 18, h: 18, x: this.x + 11, y: this.y + 71, z: this.z})
		this.defEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 20, y: this.y + 67, z: this.z})
					.text("")
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");
		this.hpIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Hp-icon")
			.attr({w: 18, h: 18, x: this.x + 74, y: this.y+11, z: this.z})
		this.hpEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 83, y: this.y + 8, z: this.z})
					.text("")
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");
		this.attach(this.attIconEntity, this.attEntity, this.defIconEntity, this.defEntity, this.hpIconEntity, this.hpEntity);
		/*this.vpIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Vp-icon")
			.attr({w: 18, h: 18, x: this.x + 74, y: this.y, z: this.z})
		this.vpEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 74, y: this.y, z: this.z})
					.text(this.vp)
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");*/
		return this;
	},
	attack:function(){
		return this.model.getAttack();
	},
	takeDamage:function(amount){
		this.model.takeDamage(amount)
	},
	onCreatureDie:function(){
		this.attIconEntity.destroy();
		this.attEntity.destroy();
		this.hpIconEntity.destroy();
		this.hpEntity.destroy();
		this.defIconEntity.destroy();
		this.defEntity.destroy();
	},
	move:function(){
		if ( this.model.get("owner") == 1){
			if ( this.has("newCreate") ){
				this.x += 4;
				if ( this.x >= battleField[0][0].x)	{
					this.removeComponent("newCreate");
				}
			} else {
				if (this.hit("S-chip-"+this.model.get("owner") ) || this.hit("pushing") ) {
					this.addComponent("pushing");
					this.x += 4;
				} else {
					this.removeComponent("pushing");
				}
			}
		} else {
			this.removeComponent("newCreate");
			this.x -= 1;
			var hit;
			if ( hit = this.hit("S-chip-"+(3-this.model.get("owner")) ) ){
				var opponent = hit[0].obj;
				this.takeDamage( opponent.attack() );
				opponent.takeDamage( this.attack() );
				this.x += 50;
			}
		}
	}
});

Creature = Chip.extend({
	defaults: function(){
		return _.extend(Chip.prototype.defaults.call(this), {
			x : 0,
			y : 0,
			hp : 3,
			vp : 1,
			w:100,
			h:100
		});
    },
    initialize: function(){
		this.set("hp", this.get("spell").get("hp"));		
    },
	takeDamage:function(amount){
		var damage = Math.max( amount - this.getDefend(), 0 );
		this.set("hp", Math.max( this.get("hp") - amount, 0 ) );
		if ( this.get("hp") == 0 )	{
			this.trigger("die",this);
		}
	},
	getAttack:function(){
		return this.get("spell").get("att");
	},
	getDefend:function(){
		return this.get("spell").get("def");
	},
	getHP:function(){
		return this.get("hp");
	},
	getVP:function(){
		return this.get("spell").get("vp");
	}
});