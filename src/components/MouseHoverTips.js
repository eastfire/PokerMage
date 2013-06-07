Crafty.c('MouseHoverTips', {
	entity: Crafty.e("2D, DOM, Text"),
    init: function() {
		this.requires("Mouse");
		this.entity.textColor('#ffffff')
					.textFont({'size' : "12px", 'family': 'Arial'})
					
        this.bind('MouseOver', function(){
            this.entity.attr({w: this.w, h: 25, x: this.x, y: this.y+this.h - 20 , z: 100}).text(this.title).textAlign("center").visible=true;
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