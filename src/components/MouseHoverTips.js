Crafty.c('MouseHoverTips', {
	entity: Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text"),
    init: function() {
		this.requires("Mouse");
		this.entity.textColor('#ffffff')
					.textFont({'size' : "12px", 'family': 'Arial'})
					
        this.bind('MouseOver', function(){
            this.entity.attr({w: this.w, h: 25, x: this.x+this.w/2, y: this.y+this.h - 30 , z: 102}).text(this.title).textAlign("center").visible=true;
        })
        .bind('MouseOut', function(){
            this.entity.visible=false;
        })
		.bind('Remove', function(){
            this.entity.visible=false;
        })
    
        return this;
    }
});