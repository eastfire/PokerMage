Crafty.c("GlobalMask", {
	init:function(){

	},
	globalMask:function(){
		
		this.addComponent("2D,"+gameContainer.conf.get('renderType')+",Mouse ,Color").color("#000000").bind("Click",function(event){
			Crafty.trigger("global-mask-clicked");
		}).attr({
			x:0,
			y:0,
			w:GAME_WIDTH,
			h:GAME_HEIGHT,
			z:99,
			alpha : 0.1
		});
		return this;
	}
});