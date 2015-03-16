define(["inheritance", "common"], function(_inheritance, common) {'use strict';
    var Particle = Class.extend({
        init : function(g, mouseX, mouseY, size, hue, sat, bright) {
			this.pos = new Vector(mouseX, mouseY);
			this.size = size;
			this.hue = hue;
			this.sat = sat;
			this.bright = bright;
        },

        // Figure out the forces on the particle, how to change the velocity,
        // and then move it somewhere.  The Vector library has many functions that may be useful here
        update : function(time, mouseX, mouseY, size, hue, sat, bright) {
		this.pos = new Vector(mouseX, mouseY);
		this.size = size;
		this.hue = hue;
		this.sat = sat;
		this.bright = bright;
		
        },

        // Draw the particle to the screen.  'g' is the processing drawing object
        //  You might use: 'g.ellipse(x, y, radiusW, radiusH)', or 'g.rect(x, y, radiusW, radiusH)'
        //  Remember to also set the fill and stroke, or remove them if you dont want them
        //  You could also use a 'for' loop to layer multiple ellipses for each particle
        //  Also, browse the Vector library for useful drawing functions that deal with vectors
        draw : function(g) {
			g.stroke(0,0,0,0);
			g.fill(this.hue,this.sat,this.bright);
			g.ellipse(this.pos.x, this.pos.y, this.size, this.size);
        },
    });

    return Particle;
});
