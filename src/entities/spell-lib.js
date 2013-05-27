Crafty.c("skeleton-archor", {
	rangeAttack:function(){
		var arrow =  Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Tween, range-arrow, range-shot")
			.attr({x:this.x+50,y:this.y+50,z:1,damageType:this.model.getDamageType(), att:this.model.getAttack()})
			.tween({x:this.x+1280},50)
			.bind("TweenEnd",function(){
				this.destroy();
			});
	}
});

Crafty.c("fireball", {
	cast:function(options){
		this.spell = options.spell;
		this.addComponent("Tween, range-shot, range-fireball")
			.attr({attackType:"range", damageType:this.spell.get("damageType"), att:this.spell.get("att")})
			.tween({x:this.x+1280},50)
			.bind("TweenEnd",function(){
				this.destroy();
			});
	}
});