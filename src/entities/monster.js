Crafty.c("Monster", {
	init:function(){
	},
	_enterFrame:function(){
		var hit = this.hit('Wall')[0];

		if(hit) {
			this.destroy();
		}
	},
	monster:function(options){
		this.attr(options).bind('EnterFrame', this._enterFrame).bind('Click', this._onClicked);
		this.origin(this.w/2, this.h/2)
		return this;
	},
	attack:function(){
		var bx = this.attr("bx");
		var by = this.attr("by");
		var heros = [sc.heroByBlock[(bx-1)+" "+by],sc.heroByBlock[(bx+1)+" "+by],sc.heroByBlock[bx+" "+(by-1)],sc.heroByBlock[bx+" "+(by+1)]];
		_.each(heros, function(hero){
			if ( hero )	{
				hero.takeDamage(this.attr("att"), this.attr("color"));
			}
		},this);
	},
	takeDamage:function(amount, color){
		if ( color === this.attr("color") )	{
			this.attr("hp", this.attr("hp") - amount);
		}
	},
	onDie:function(){
//		this.animate("die");
		this.destroy();
		Crafty.trigger('MonsterDeath', this);
		this.backbone.destroy();
	}
});

Monster = BaseEntity.extend({
	defaults: {
		bx : 0,
		by : 0,
        hp : 1,
		color : "red",
		att : 1,
		type : "goblin",
		z :0
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Monster, "+ (model.get("color")+"-monster")+",SpriteAnimation, Mouse, Collision, Tween")
			.monster(model.toJSON()).attr({x: model.get("bx")*game.BLOCK_SIZE, y: model.get("by")*game.BLOCK_SIZE});

    	entity
            .setName(model.get("type"));

		entity.backbone = this;

		model.set({'entity' : entity });
    }
});

MonsterCollection = Backbone.Collection.extend({
	model:Monster
})