var app = {};
var hue = 0;
var sat =0;
var bright = 0;
var trans = 1;
var size = 10;

// A holder for lots of app-related functionality
define(["processing", "./particles/particleSystem", "./particles/particle", "./tracery/tracery", "./grammars/grammars"], function(_processing, ParticleSystem, Particle, _tracery, grammars) {'use strict';
    // A little time object to keep track of the current time,
    //   how long its been since the last frame we drew,
    //   and how long the app has been running
    var time = {
        date : Date.now(),
        start : Date.now(),
        frames : 0,
        updateTime : function() {
            var last = this.date;
            this.date = Date.now();
            this.total = (this.date - this.start) / 1000;
            this.elapsed = (this.date - last) / 1000;

            this.frames++;
        }
    };
	
	var particles = [];
	
	//function makeHover(g, mouseX, mouseY, size){
	//var part = new Particle(g, mouseX, mouseY, size);
	//particles.push(part);
	//}
	

    // Lets add some functions to the app object!
    $.extend(app, {

        mouse : new Vector(),
        dimensions : new Vector(),
		mouseClicked: false, 

        init : function() {			
			
            // Get the canvas element
            // Note that this is the jquery selector, and not the DOM element (which we need)
            // myJQuerySelector.get(0) will return the canvas element to pass to processing
            var canvas = $("#processingCanvas");
			
			$('#instructions').prepend('<h1>Art Critic</h1> <p>Click on the colors to change color. Press 9 or 0 to increase or decrease the area you draw, respectively</p>');
			app.currentGrammar = tracery.createGrammar(grammars.custom);
			var exp = app.currentGrammar.expand("#origin#");
			var exp2 = app.currentGrammar.expand("#says#");
			
			$('#critic').prepend('<h1>The art critic '+ exp2.finalText +' :</h1><p>' + exp.finalText + '</p>');
            
			var processingInstance = new Processing(canvas.get(0), function(g) {
                // This function is called once processing is initialized.

                // Set the size of processing so that it matches that size of the canvas element
                var w = canvas.width();
                var h = canvas.height();
                app.dimensions.setTo(w, h);
				

                g.size(w, h);

                // Tell processing that we'll be defining colors with
                //  the HSB color mode, with values [0, 1]
                g.colorMode(g.HSB, 1);

                // Tell processing to define ellipses as a center and a radius
                g.ellipseMode(g.CENTER_RADIUS);

                g.background(360, 0, 100);
				
				//test
				var part = new Particle(g, app.mouse.x, app.mouse.y, size, hue, sat, bright, trans);
				particles.push(part);

                g.draw = function() {

                    // Update time
                    time.updateTime();

                    // [TODO] Update a particle here
					for(var i = 0; i < particles.length; i++){
						particles[i].update(time, app.mouse.x, app.mouse.y, size, hue, sat, bright);
					}
                    // Move to the center of the canvas
                    g.pushMatrix();
                    g.translate(w / 2, h / 2);
					
					
                    // [TODO] Draw a particle here
					if(app.mouseClicked){
					particles[0].draw(g);
					}
                    g.popMatrix();

                    // HW Functions
					
					$('#red').click(function(){
						hue = 1;
						sat = 1;
						bright = 1;
					});
					
					$('#blue').click(function(){
						hue = .70;
						sat = 1;
						bright = 1;
					});
					
					$('#green').click(function(){
						hue = .3;
						sat = 1;
						bright = .5;
					});
					
					$('#black').click(function(){
						hue = .5;
						sat = .5;
						bright = 0;
					});
					
					$('#white').click(function(){
						hue = 1;
						sat = 0;
						bright = 1;
					});

                    if (app.key === 9) {
						//console.log("--size");
                        size--;
                    }
                    if (app.key === 0) {
                        //console.log("++size");
						size++;
                    }
					if (app.key === 1) {
                        g.fill(1,0,1);
                        g.rect(-10, -10, 900, 900);
						app.key = null;
                    }

                };
            });
            this.initUI();
        },

        initUI : function() {

            $("#processingCanvas").mousemove(function(ev) {
                var x = ev.offsetX - app.dimensions.x / 2;
                var y = ev.offsetY - app.dimensions.y / 2;
                //    console.log(x + " " + y);
                app.mouse.setTo(x, y);
            });

            // using the event helper
            $('#processingCanvas').mousedown(function(ev) {
				app.mouseClicked = true;
            });
			
			$('#processingCanvas').mouseup(function(ev) {
				app.mouseClicked = false;
            });

            $("#view").draggable({
                helper : function() {
                    return $("<div id='dragPos'></div>");
                },

                drag : function(event, ui) {
                    var x = $('#dragPos').offset().left;
                    var y = $('#dragPos').offset().top;

                }
            });

            $(document).keydown(function(e) {

                var key = String.fromCharCode(e.keyCode);

                switch(key) {
                    case ' ':
                        app.paused = !app.paused;
                        break;
                    case '0':
                        app.key = 0;
                        break;

                    case '9':
                        app.key = 9;
                        break;

                    case 'R':
						app.key = 1;
                        break;
                    case '3':
                        app.key = 3;
                        // Do something
                        break;
                }

            });

            $(document).keyup(function(e) {
                app.key = undefined;
            });

        }
    });

});
