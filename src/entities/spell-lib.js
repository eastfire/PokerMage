var createSprite = function(spellName, options) {
	var elements = {};
	elements['S-'+spellName] = elements['Menu-'+spellName] = [0,0];
	Crafty.sprite(60, 60, 'web/images/'+spellName+'-s.png', elements);
	var elements_l = {};
	elements_l['L-'+spellName] = [0, 0];
	Crafty.sprite(300, 300, 'web/images/'+spellName+'-l.png', elements_l);
}

createSprite("skeleton-warrior");
createSprite("human-warrior");

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
createSprite("skeleton-archor");

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
createSprite("fireball");