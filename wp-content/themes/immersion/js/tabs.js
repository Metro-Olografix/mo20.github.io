jQuery(document).ready(function(b){var a=b("ul.tabs");a.each(function(c){var d=b(this).find("a");d.click(function(g){var f=b(this).attr("href");if(f.charAt(0)=="#"){g.preventDefault();b(this).parent().siblings("li").children("a").removeClass("active");b(this).addClass("active");b(f).show().addClass("active").siblings().hide().removeClass("active")}})})});

jQuery(document).ready(function($){


	$("h3.toggle-title").click(function(){
	
		$(this).next(".toggle-box").slideToggle(400);
	
		if($(this).hasClass('toggle-visible')) {

			$(this).removeClass('toggle-visible'); 
			$(this).find('i').removeClass('fa-minus-square-o').addClass('fa-plus-square-o'); 

		}
		else {

			$(this).addClass('toggle-visible');
			$(this).find('i').removeClass('fa-plus-square-o').addClass('fa-minus-square-o'); 

		}

	});
	
});