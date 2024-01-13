

jQuery.noConflict();
(function($) {

	$.tf_lightbox_init = function(){

		var swipe;



		Modernizr.load([{
			load: [global_var.theme_uri+"/js/klass.min.js",global_var.theme_uri+"/js/code.photoswipe.jquery-3.0.5.min.js",global_var.theme_uri+"/css/mediaelementplayer.css"],
			complete: function(){ 

				swipe=$(".lightbox").photoSwipe({ 
					enableMouseWheel: true,
					enableKeyboard: true,
					imageScaleMethod: global_var.image_scale_method,
					slideTimingFunction: 'easeInOutExpo',
					nextPreviousSlideSpeed: 800,
					zIndex: 800
				});


				swipe.addEventHandler(window.Code.PhotoSwipe.EventTypes.onDisplayImage, function(e){

					var src=swipe.getCurrentImage().src;
					var video_type;

					if(src.indexOf("vimeo.com")!=-1) {

						Modernizr.load([{
							load: [global_var.theme_uri+"/js/jquery.fsvideo.js",global_var.theme_uri+"/js/vimeo.wrapper.js",global_var.theme_uri+"/js/froogaloop2.min.js"],
							complete: $.tf_deploy_video(src,'vimeo')
						}]);

					}

					if(src.indexOf("youtube.com")!=-1){

						Modernizr.load([{
							load: [global_var.theme_uri+"/js/jquery.fsvideo.js",global_var.theme_uri+"/js/swfobject.js",global_var.theme_uri+"/js/youtube.wrapper.js"],
							complete: $.tf_deploy_video(src,'youtube')
						}]);

					} 
					
					if(src.indexOf("vimeo.com")!=-1 || src.indexOf("youtube.com")!=-1){

						//appends the play button
						$current_slide.append('<div id="play-button" class="tf-button"><span class="circle"></span><span class="icon"></span></div>');

					    //show the play button
						$('#play-button').fadeIn(400,'easeInOutExpo').find('.circle').transition({perspective: '100px',rotateY: '180deg'},400);

					}


				});


			}

		}]);



	}

	//load the video on fullscreen
	$.tf_deploy_video = function(src,video_type){


					
		$.ajax({  
			type: "post",  
			url: global_var.ajax,  
			data: "action=get-video&link="+src+"&videotype="+video_type,  
			success: function(data){  

				//add loaded data to the video container
				$('body').append('<div id="fullscreen-video-wrap"><div id="fs-video"></div><div id="resume-button" class="tf-button"><span class="circle"></span><span class="icon"></span></div><div id="stop-button" class="tf-button"><span class="circle"></span><span class="icon"></span></div></div>');
				$('#fs-video').html(data);
				$('.mejs-controls').css({bottom:'-40px'}).animate({bottom:'0px'},500,'easeInOutExpo');
				

			}  
		}); 

	}

})(jQuery);

