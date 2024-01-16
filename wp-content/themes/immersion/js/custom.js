jQuery(document).ready(function($) {

	var $header = $('#header');
	var $nav = $('header #nav');
	var $supersized_wrap = $('#supersized-wrap');
	var $slidecaption = $('#slidecaption');
	var themeEasing = 'easeInOutExpo';

	//load these scripts only if they are supported
	Modernizr.load([{
		test: Modernizr.touch,
		yep: global_var.theme_uri + "/js/jquery.touchwipe.js",
	}]);

	Modernizr.load([{
		test: ($.browser.msie && parseInt($.browser.version, 10) <= 8),
		yep: global_var.theme_uri + "/js/selectivizr-min.js",
	}]);


	//for browsers who don't support css transitions
	if (!$.support.transition) $.fn.transition = $.fn.animate;

	//preload images
	if (!$.browser.msie) $(window).preloader();

	//init the lightbox
	if ($('.lightbox').length != 0) $.tf_lightbox_init();

	//create menu select
	$nav.mobileMenu();
	$nav.superfish({
		autoArrows: false,
		animation:   {opacity:'show',height:'show'}

	});

	//init the tool tip on social icons
	if (!$.browser.msie) $('#social_icons li a').tipTip({
		defaultPosition: 'top'
	});

	//change height of fullscreen slideshow to fill the entire page height
	$(window).resize(function() {

		if ($(window).width() > 768) { $supersized_wrap.css({'height': $(window).height() - $header.height(), 'min-height':'none'}); }
		else { $supersized_wrap.css({'height': 'auto', 'min-height':$(window).width()*0.75}); }

		

	}).trigger('resize');

	//parallax effect - skrollr init
	if(!Modernizr.touch){

		skrollr.init({
			forceHeight: false
		});

	}


	$slidecaption.on('click', '.down_arrow', function(e) {

		e.preventDefault();
		var offsetTop = $('#main-wrap').offset().top;
		$('html, body').animate({
			scrollTop: offsetTop / 2
		}, 600, 'easeInOutExpo');

	});


	//portfolio filter
	$('.portfolio-categories li a').click(function() {

		$this = $(this);

		$this.parent().parent().find('a').removeClass('current');
		$this.addClass('current');

		var cat = $this.attr('data-cat');
		var $list = $this.parent().parent().next();

		$list.children('li').addClass('active');
		$list.children('.cat-' + cat).removeClass('active');

		if (cat == 'all') $list.children('li').removeClass('active');

	});


	//flickr images
	$(".flickr_wrap").each(function(index) {

		var $this = $(this);
		var count = $this.attr('data-count');
		var id = $this.attr('data-id');

		$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?id=" + id + "&lang=en-us&format=json&jsoncallback=?", function(data) {

			$.each(data.items, function(i, item) {

				if (i < count) $("<img/>").attr("src", item.media.m.replace('_m.jpg', '_s.jpg')).attr("title", item.title).appendTo($this).wrap("<a title=" + item.title + " class='lightbox' href='" + (item.media.m).replace("_m.jpg", "_b.jpg") + "'></a>");

			});

			$.tf_lightbox_init();

		});

	});

	//on all slideshow buttons hover
	$('body').on('mouseenter', '.tf-button', function(e) {

		$(this).find('.circle').stop().transition({
			perspective: '100px',
			rotateY: '0deg'
		}, 400, themeEasing);

	});

	$('body').on('mouseleave', '.tf-button', function(e) {

		$(this).find('.circle').stop().transition({
			perspective: '100px',
			rotateY: '180deg'
		}, 400, themeEasing);

	});

	//load more posts on posts drawer
	var postsLoaded=true;
	$('body').bind('limit-right', function(){ 

		if(postsLoaded){

			postsLoaded=false;

			var page=parseInt($('#posts-drawer').attr('data-page'));
			var post=parseInt($('#posts-drawer').attr('data-post'));

		    $.ajax({  
		        type: "post",  
		        url: global_var.ajax,  
		        data: "action=get-other-posts&nonce="+global_var.nonce+"&page="+page+"&post="+post,  
		        success: function(html){  

		        	$('#posts-drawer').attr('data-page',page+1);
		        	$( ".scrollyeah__shaft li:last-child").remove()
		        	$( ".scrollyeah__shaft").append(html).append('<li><i class="fa fa-angle-right fa-3x"></i></li>').trigger('resize');

	        		$(".scrollyeah__shaft li.loaded").each(function(index) {

        				$this=$(this);
        				$this.delay(index*800).animate({'left':0},0,function(){$(this).removeClass('loaded');});
   
					});

					postsLoaded=true;

		        }  
		    });  

		}

	});




});