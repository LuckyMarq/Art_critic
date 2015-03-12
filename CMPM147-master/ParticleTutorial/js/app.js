var app = {};

// A holder for lots of app-related functionality
define(["processing", "./particles/particleSystem", "./particles/particle", "./tracery/tracery"], function(_processing, ParticleSystem, Particle, _tracery) {'use strict';
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
	

    // Lets add some functions to the app object!
    $.extend(app, {

        mouse : new Vector(),
        dimensions : new Vector(),

        init : function() {

            // Get the canvas element
            // Note that this is the jquery selector, and not the DOM element (which we need)
            // myJQuerySelector.get(0) will return the canvas element to pass to processing
            var canvas = $("#processingCanvas");
			
			$('#instructions').prepend('<h1>Art Critic</h1> <p>this is a place holder for instructions</p>');
			tracery.createGrammar({});
			
			$('#critic').prepend('<h1>The art critic "tracery for how he says something":</h1><p>blah blah blah tracery making it long enought to test to see if it handles two lines correctly so blah woo foo bar bazz boom pow wow keep testing 3 lines .................... waste space</p>');
            
			var processingInstance = new Processing(canvas.get(0), function(g) {
                app.particles = [];
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
				var hue = 0;
				var sat =0;
				var bright = 0;
				var size = 10;
				

                g.draw = function() {
				g.background(360, 0, 100);

                    // Update time
                    time.updateTime();

                    // [TODO] Update a particle here
                    //  myParticle.update(time);

                    // Move to the center of the canvas
                    g.pushMatrix();
                    g.translate(w / 2, h / 2);

                    // [TODO] Draw a particle here
					g.stroke(hue,sat,bright);
					g.fill(0,0,0,0);
                    g.ellipse(app.mouse.x, app.mouse.y, size,size);

                    g.popMatrix();

                    // HW Functions

                    if (app.key === 9) {
						console.log("--size");
                        size--;
                    }
                    if (app.key === 0) {
                        console.log("++size");
						size++;
                    }

                };
            });
            this.initUI();
        },

        initUI : function() {

            $("#view").mousemove(function(ev) {
                var x = ev.offsetX - app.dimensions.x / 2;
                var y = ev.offsetY - app.dimensions.y / 2;
                //    console.log(x + " " + y);
                app.mouse.setTo(x, y);
            });

            // using the event helper
            $('#view').mousewheel(function(event) {

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
                    case '1':
                        // Do something when the user
                        sound();
                        app.key = 1;
                        break;

                    case 'W':
                        // Do something when the user
                        addParticles();
                        break;

                    case '2':
                        // Do something
                        app.key = 2;
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
