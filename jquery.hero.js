(function($){

	var methods = {
		init: function( options ) {
			$options =  $.extend($.fn.hero.defaults, options);
			return this.each(function() {
				
				$navigator_element = $('<div id="hero-navigator" />');
				$indicator_element = $('<div id="hero-indicator" />');
				$paginator_element = $('<div id="hero-paginator" />');
				//the bound element
				$this = $(this); 
			   
				//cache all slides
				$all_slides = $this.find($options.itemSelector);
				
				//cache the first slide
				$first_slide = $all_slides.first();
				
				//hide all of the slides
				$all_slides.css('display','none');
				
				//show the first slide
				$first_slide.fadeIn($options.speed);
			   
				$slide_count = $all_slides.length;
			   
				//styles for the slide container
				$this.css('position','relative')
						.css('height',$options.height)
						.css('width',$options.width + $options.navigatorWidth);
						
				//position the slides
				$all_slides
						.css('position','absolute')
						.css('left',0)
						.css('top',0);
				
				//create the side navigator from any caption elements
				createNavigator();
				
				//position the navigator
				$navigator_element
						.css('position','absolute')
						.css('left',$options.width)
						.css('width',$options.navigatorWidth)
						.css('top',0);
				
				//build the indicator buttons
				buildIndicator();
				buildPaginator();
				element = $first_slide.addClass('hero-slide-current');
				
				
            });
			
		},
		start: function()
		{
			rotateSlide(element);
		},
		stop: function()
		{
			element = $('.hero-slide-current',$this);
			$this.find($options.itemSelector).each(function() {
				$(this).stop(true,true).clearQueue();
			});
		}
	}
	
	$.fn.hero = function( method ) {
		if ( methods[method] )
		{
		   return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof method === 'object' || ! method )
		{
		   return methods.init.apply( this, arguments );
		}
		else
		{
		   $.error( 'Method ' +  method + ' does not exist on jQuery.hero' );
		   return null;
		}
	}
	
	function createNavigator()
	{
		$this.find($options.navSelector).each(function() {
			$navigator_element.append($(this));
		});
		_navigator_items = $navigator_element.children();
		_navigator_items.first().addClass('hero-navigator-current');
		
		_navigator_items.mouseenter(function() {
			_navigator_id = $(this).index();
			$all_slides.stop(true,true).clearQueue();
			swapSlide(_navigator_id);
			$('.hero-navigator-current',$navigator_element).removeClass('hero-navigator-current');
			$(this).addClass('hero-navigator-current');
			cycleIndicator(_navigator_id);
			cyclePaginator(_navigator_id);
		});
		
		_navigator_items.mouseleave(function() {
			rotateSlide( $('.hero-slide-current',$this) );
		});
		
		if($options.showNavigator)
			$this.append($navigator_element);
	}
	
	function rotateSlide( element )
	{	
		if( element.next($options.itemSelector).length )
			next_slide = element.next($options.itemSelector);
		else
			next_slide = $this.find($options.itemSelector).first();
			
		element.delay($options.delay).fadeOut($options.speed, function() {
			$(this).removeClass('hero-slide-current');
			next_slide.fadeIn($options.speed,function() {
				cycle();
				$(this).addClass('hero-slide-current');
			});
		});
		
		
		function cycle()
		{
			rotateSlide( next_slide );
			cycleNavigator();
			cycleIndicator();
			cyclePaginator();
		}
	}
	
	function swapSlide( index )
	{
		$('.hero-slide-current',$this).fadeOut();
		$($options.itemSelector).eq(index).fadeIn(function() {
			$('.hero-slide-current',$this).removeClass('hero-slide-current');
				$(this).addClass('hero-slide-current');
		});
	}
	
	function buildIndicator()
	{
		var i;
		for(i=0;i<$slide_count;i++)
		{
			$indicator_element.append( $('<span />') );
		}
		$indicator_element.children().first().addClass('hero-indicator-current');
		
		if($options.showIndicator)
			$this.append($indicator_element);
	}
	
	function buildPaginator()
	{
		var i;
		for(i=1;i<=$slide_count;i++)
		{
			$paginator_element.append( $('<span />').text(i) );
		}
		$paginator_element.children().first().addClass('hero-paginator-current');
		
		$paginator_element.children().mouseenter(function() {
			$all_slides.stop(true,true).clearQueue();
			slide_index = $(this).index();
			cyclePaginator(slide_index);
			cycleNavigator(slide_index);
			cycleIndicator(slide_index);
			swapSlide(slide_index);
		});
		$paginator_element.children().mouseleave(function() {
			rotateSlide( $('.hero-slide-current',$this) );
		});
		
		if($options.showPaginator)
			$this.append($paginator_element);
	}
	
	function cyclePaginator( slide_index )
	{
		paginator_items = $paginator_element.children();
		current_paginator = $('.hero-paginator-current',$paginator_element);
		current_paginator.removeClass('hero-paginator-current');
		
		if( typeof slide_index != 'undefined' )
			paginator_items.eq( slide_index ).addClass('hero-paginator-current');
		else
		{
			if( current_paginator.next().length )
				current_paginator.next().addClass('hero-paginator-current');
			else
				paginator_items.first().addClass('hero-paginator-current');
		}
	}
	
	function cycleIndicator( slide_index )
	{
		indicator_items = $indicator_element.children();
		current_indicator = $indicator_element.find('.hero-indicator-current');
		current_indicator.removeClass('hero-indicator-current');
		if( typeof slide_index != 'undefined' )
			indicator_items.eq( slide_index ).addClass('hero-indicator-current');
		else
		{
			if( current_indicator.next().length )
				current_indicator.next().addClass('hero-indicator-current');
			else
				indicator_items.first().addClass('hero-indicator-current');
		}
	}
	
	function cycleNavigator( slide_index )
	{
		//update the cooter navigator and indicator
		navigator_items = $navigator_element.children();
		current_nav_item = $navigator_element.find('.hero-navigator-current');
		current_nav_item.removeClass('hero-navigator-current');
			
		if( typeof slide_index != 'undefined' )
			navigator_items.eq( slide_index ).addClass('hero-navigator-current');
		else
		{
			if( current_nav_item.next($options.navSelector).length )
				current_nav_item.next($options.navSelector).addClass('hero-navigator-current');
			else
				navigator_items.first($options.navSelector).addClass('hero-navigator-current');
		}
	}
	
	$.fn.hero.defaults = {
		width: 550,
		height: 300,
		delay: 7000,
		speed: 1000,
		navSelector: '.caption',
		itemSelector: '.stage-item',
		navigatorWidth: 250,
		showNavigator: true,
		showPaginator: true,
		showIndicator: false
	}

})(jQuery);