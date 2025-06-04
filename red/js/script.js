//------------------------------------- Waiting for the entire site to load ------------------------------------------------//



jQuery(window).load(function() { 
		jQuery("#loaderInner").fadeOut();
		jQuery("#loader").delay(400).fadeOut("slow");
		jQuery("#loaderInner p").removeClass("loading");
				
});





$(document).ready(function(){
	
	
//------------------------------------- Navigation setup ------------------------------------------------//


//--------- Scroll navigation ---------------//

$("#mainNav ul a, .logo a, .top a, .moreBtn a, .shortContact a").click(function(event){

		event.preventDefault();
		var full_url = this.href;
		var parts = full_url.split("#");
		var trgt = parts[1];
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top;

		$('html,body').animate({scrollTop:target_top -110}, 800);


});


//-------------Highlight the current section in the navigation bar------------//
	var sections = $("section");
		var navigation_links = $("#mainNav a");

		sections.waypoint({
			handler: function(event, direction) {

				var active_section;
				active_section = $(this);
				if (direction === "up") active_section = active_section.prev();

				var active_link = $('#mainNav a[href="#' + active_section.attr("id") + '"]');
				navigation_links.removeClass("active");
				active_link.addClass("active");

			},
			offset: '35%'
		});
		
		
//------------------------------------- End navigation setup ------------------------------------------------//




//---------------------------------- Clients animation-----------------------------------------//

$('.clientList a').css({opacity:0.5});
		$('.clientList a').hover( function(){ 
			$(this).stop().animate({opacity:"1"}, 100, 'easeOutQuint');
		}, function(){ 
			$(this).stop().animate({opacity:"0.5"}, 100, 'easeOutQuint');
		});
//---------------------------------- End clients animation-----------------------------------------//


//--------------------------------- Hover animation for the elements of the portfolio --------------------------------//
				
				
				$(".link").css({ opacity: 0 });
				$('.item').hover( function(){ 
					$(this).children('.link ').animate({ opacity: 1 }, 'fast');
				}, function(){ 
					$(this).children('.link ').animate({ opacity: 0 }, 'slow'); 
				}); 
				
			

//--------------------------------- End hover animation for the elements of the portfolio --------------------------------//




//-----------------------------------Initilaizing fancybox for the portfolio-------------------------------------------------//

	$('.portfolio a.folio').fancybox({
					'overlayShow'	: true,
					'opacity'		: true,
					'transitionIn'	: 'elastic',
					'transitionOut'	: 'none',
					'overlayOpacity'	:   0.8
				});
				
//-----------------------------------End initilaizing fancybox for the portfolio-------------------------------------------------//

//--------------------------------- Sorting portfolio elements with quicksand plugin  --------------------------------//
	
		var $portfolioClone = $('.portfolio').clone();

		$('.filter a').click(function(e){
			$('.filter li').removeClass('current');	
			var $filterClass = $(this).parent().attr('class');
			if ( $filterClass == 'all' ) {
				var $filteredPortfolio = $portfolioClone.find('li');
			} else {
				var $filteredPortfolio = $portfolioClone.find('li[data-type~=' + $filterClass + ']');
			}
			$('.portfolio').quicksand( $filteredPortfolio, { 
				duration: 800,
				easing: 'easeInOutQuad' 
			}, 
			
			function(){
					$('.item').hover( function(){ 
						$(this).children('.link').animate({ opacity: 1 }, 'fast');
					}, function(){ 
						$(this).children('.link').animate({ opacity: 0 }, 'slow');
					}); 
					
					
				$('.portfolio li').addClass('appeared');
				$('.portfolio li').removeClass('animated');


//------------------------------ Reinitilaizing fancybox for the new cloned elements of the portfolio----------------------------//

				$('.portfolio a.folio').fancybox({
								'overlayShow'	: true,
								'opacity'		: true,
								'transitionIn'	: 'elastic',
								'transitionOut'	: 'none',
								'overlayOpacity'	:   0.8
							});

//-------------------------- End reinitilaizing fancybox for the new cloned elements of the portfolio ----------------------------//

			});


			$(this).parent().addClass('current');
			e.preventDefault();
		});

//--------------------------------- End sorting portfolio elements with quicksand plugin--------------------------------//





//---------------------------------- Form validation-----------------------------------------//




$('#submit').click(function(){ 

	$('input#name').removeClass("errorForm");
	$('textarea#message').removeClass("errorForm");
	$('input#email').removeClass("errorForm");
	
	var error = false; 
	var name = $('input#name').val(); 
	if(name == "" || name == " ") { 
		error = true; 
		$('input#name').addClass("errorForm");
	}
	
	
		var msg = $('textarea#message').val(); 
		if(msg == "" || msg == " ") {
			error = true;
			$('textarea#message').addClass("errorForm");
			
		}
	
	var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; 
	var email = $('input#email').val(); 
	if (email == "" || email == " ") { 
		$('input#email').addClass("errorForm");
		error = true;
	}else if (!email_compare.test(email)) { 
		$('input#email').addClass("errorForm");
		error = true;
	}

	if(error == true) {
		return false;
	}

	var data_string = $('.contactForm form').serialize(); 
	

	$.ajax({
		type: "POST",
		url: $('.contactForm form').attr('action'),
		data: data_string,
		
		success: function(message) {
				if(message == 'SENDING'){
					$('#success').fadeIn('slow');
				}
				else{
					$('#error').fadeIn('slow');
				}
					}
					
					
					
	});

	return false; 
});



//---------------------------------- End form validation-----------------------------------------//


//--------------------------------- Mobile menu --------------------------------//


var fade=false;
$('.mobileBtn').click(function() {
		if(fade==false){
        	$('#mainNav ul').slideDown("slow");
			fade=true;
			return false;
			
		}else{
		
			$('#mainNav ul').slideUp("faste");
			fade=false;
			return false;	
		}
});


//--------------------------------- End mobile menu --------------------------------//


//--------------------------------- Parallax --------------------------------//
	
$(".testimoniaContainer").parallax("100%", 0.3);
$(".clientContainer").parallax("100%", 0.3);
$(".infoContainer").parallax("100%", 0.3);

//--------------------------------- End parallax --------------------------------//



//--------------------------------- Accordion --------------------------------//	

		$( "#tabs" ).tabs();
		$( "#accordion" ).accordion();
		var selectedEffect = $( "#effectTypes" ).val();
		var link = $("#button")
		var options = {};

			if ( selectedEffect === "slide" ) {
				options = { percent: 0 };
			} else if ( selectedEffect === "size" ) {
				options = { to: { width: 200, height: 60 } };
			}

			$( "#effect" ).toggle( selectedEffect, options, 500 );
			
//--------------------------------- End accordion --------------------------------//




//---------------------------------- Skills charts -----------------------------------------//

$(function() {
    $('.chart').easyPieChart({
        animate: 2000,
		scaleColor: false,
		lineWidth : 2,
		trackColor : "#efefef",
		barColor : "#E93735",
		size : 160

    });

});

//---------------------------------- End skills charts -----------------------------------------//




//---------------------------------- Testimonials -----------------------------------------//

$('.testimoniaContainer').slides({
	preload: false,
	generateNextPrev: false,
	play: 6500,
	container: 'testimonialContent'
});


//---------------------------------- End testimonial -----------------------------------------//


//---------------------------------- Text animation -----------------------------------------//

$(".rotate").textrotator({
        animation: "fade",
		separator: ",",
    	speed: 2000
});



$(".loading").textrotator({
        animation: "fade",
    	speed: 1000
});


//---------------------------------- End text animation -----------------------------------------//





//---------------------------------- Site elements animations -----------------------------------------//




$('.animated').appear();

$(document.body).on('appear', '.pl', function() {
	$(this).each(function(){
		 $(this).addClass('pulse')
		$(this).addClass('appeared');
	 });
});



$(document.body).on('appear', '.flip', function() {
	$(this).each(function(){
		 $(this).addClass('flipInX')
		$(this).addClass('appeared');
	 });
});



$(document.body).on('appear', '.flipIn', function() {
	
	$(this).each(function(){
		$(this).addClass('flipInY');
		 $(this).addClass('appeared');
		return false;
	 });
});


$(document.body).on('appear', '.right', function() {
	
	$(this).each(function(){
		$(this).addClass('fadeInRight');
		 $(this).addClass('appeared')
	 });
});


$(document.body).on('appear', '.left', function() {
	
	$(this).each(function(){
		$(this).addClass('fadeInLeft');
		 $(this).addClass('appeared')
	 });
});


$(document.body).on('appear', '.up', function() {
	
	$(this).each(function(){
		$(this).addClass('fadeInUp');
		 $(this).addClass('appeared')
	 });
});




//---------------------------------- End site elements animations-----------------------------------------//




});




	






