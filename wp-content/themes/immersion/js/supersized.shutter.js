/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Theme 	: Shutter 1.1
	
	Site	: www.buildinternet.com/project/supersized
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License

*/

(function($){
	
	theme = {
	 	
	 	
	 	/* Initial Placement
		----------------------------*/
	 	_init : function(){

	 		var $supersized=$('#supersized');

	 		$('body').addClass("slideshow-loaded");

	 		$('#supersized-wrap .post-details').flexVerticalCenter('top');

			// navigation arrows
			$('#left_arrow').click(function(e) {
						
				api.prevSlide();
				
		    });
			
		    $('#right_arrow').click(function(e) {
				
				api.nextSlide();
						
		    });

		    if(Modernizr.touch) {
		    
				$('#supersized-wrap').touchwipe({
					wipeLeft: function() { api.nextSlide(); },
					wipeRight: function() { api.prevSlide(); },
					preventDefaultEvents: false
				});

			}

			$('body').on('videoFinished','#fullscreen-video-wrap' ,function(e){

				if (api.options.autoplay) api.playToggle();

			});

			$supersized.on('click', 'li.activeslide' ,function(e){

				var src=$('#supersized li.activeslide a').attr('href');

				if(src.indexOf("vimeo.com")!=-1) {

					e.preventDefault();

					if (api.options.autoplay) api.playToggle();

					Modernizr.load([{
						load: [global_var.theme_uri+"/js/jquery.fsvideo.js",global_var.theme_uri+"/js/vimeo.wrapper.js",global_var.theme_uri+"/js/froogaloop2.min.js"],
						complete: $.tf_deploy_video(src,'vimeo')
					}]);

					
				}

				if(src.indexOf("youtube.com")!=-1){

					e.preventDefault();

					if (api.options.autoplay) api.playToggle();

					Modernizr.load([{
						load: [global_var.theme_uri+"/js/jquery.fsvideo.js",global_var.theme_uri+"/js/swfobject.js",global_var.theme_uri+"/js/youtube.wrapper.js"],
						complete: $.tf_deploy_video(src,'youtube')
					}]);

				} 

			});

			$('#supersized-wrap').on('click', '#play-button' ,function(e){

				$('#supersized li.activeslide a').trigger('click');

			});

			/* Window Resize
			----------------------------*/
			$(window).resize(function(){
				
			});	
			
			this.afterAnimation();
								
	 	},
	 	
	 	
	 	/* Go To Slide
		----------------------------*/
	 	goTo : function(){
		
		},
	 	
	 	/* Play & Pause Toggle
		----------------------------*/
	 	playToggle : function(state){
		
	 	},
	 	
	 	
	 	/* Before Slide Transition
		----------------------------*/
	 	beforeAnimation : function(direction){

	 		$('#slidecaption .columns').children().each(function(index){

				$(this).delay(index*0).queue(function(next){$(this).addClass("animate-2");next();});

			});

	 		$('#supersized li.prevslide').find('img').animate({'opacity':1},400);
			
		    
	 	},
	 	
	 	
	 	/* After Slide Transition
		----------------------------*/
	 	afterAnimation : function(){

			(api.getField('desc')) ? $('#slidecaption').html(api.getField('desc')) : $('#slidecaption').html('');
			
			$('#slidecaption').flexVerticalCenter('top');
		
			$('#slidecaption .columns').children().each(function(index){

				$(this).delay(index*200).queue(function(next){$(this).addClass("animate");next();});

			});

			//apply opacity to the slide
			if(api.getField('opacity')) $('#supersized li.activeslide').find('img').animate({'opacity':api.getField('opacity')},400);

			//init lightbox when not video links
			var lightbox=api.getField('lightbox');
			
			if(lightbox!=''){

				$('#supersized li.activeslide a').attr('href',lightbox);

				if(lightbox.indexOf("vimeo.com")==-1 && lightbox.indexOf("youtube.com")==-1){

					$('#supersized li.activeslide a').addClass('lightbox');
					$.tf_lightbox_init();

				}

			}

		   	//display the play button for video lightbox
		    var play_button=api.getField('play_button');
		    if(play_button=='on'){

	    		//show the play button
		    	$('#play-button').fadeIn(400,'easeInOutExpo').find('.circle').transition({perspective: '100px',rotateY: '180deg'},400);

		    }
		    else{

		    	$('#play-button').fadeOut(100).find('.circle').transition({perspective: '100px',rotateY: '90deg'},400);
		   
		    }
			

		
	 	},
	 	
	 	
	 	/* Progress Bar
		----------------------------*/
		progressBar : function(){

    	}
	 	
	 
	 };
	 
	 
	 /* Theme Specific Variables
	 ----------------------------*/
	 $.supersized.themeVars = {
	 	
	 	// Internal Variables
		progress_delay		:	false,				// Delay after resize before resuming slideshow
		thumb_page 			: 	false,				// Thumbnail page
		thumb_interval 		: 	false,				// Thumbnail interval
		image_path			:	'img/',				// Default image path
													
		// General Elements							
		play_button			:	'#pauseplay',		// Play/Pause button
		next_slide			:	'#nextslide',		// Next slide button
		prev_slide			:	'#prevslide',		// Prev slide button
		next_thumb			:	'#nextthumb',		// Next slide thumb button
		prev_thumb			:	'#prevthumb',		// Prev slide thumb button
		
		slide_caption		:	'#slidecaption h3',	// Slide caption
		slide_current		:	'.slidenumber',		// Current slide number
		slide_total			:	'.totalslides',		// Total Slides
		slide_list			:	'#slide-list',		// Slide jump list							
		
		thumb_tray			:	'#thumb-tray',		// Thumbnail tray
		thumb_list			:	'#thumb-list',		// Thumbnail list
		thumb_forward		:	'#thumb-forward',	// Cycles forward through thumbnail list
		thumb_back			:	'#thumb-back',		// Cycles backwards through thumbnail list
		tray_arrow			:	'#tray-arrow',		// Thumbnail tray button arrow
		tray_button			:	'#tray-button',		// Thumbnail tray button
		
		progress_bar		:	'#progress-bar'		// Progress bar
	 												
	 };												
	
	 /* Theme Specific Options
	 ----------------------------*/												
	 $.supersized.themeOptions = {					
	 						   
		progress_bar		:	0,		// Timer for each slide											
		mouse_scrub			:	0		// Thumbnails move with mouse
		
	 };
	
	
})(jQuery);