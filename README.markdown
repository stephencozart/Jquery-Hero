#Usage

##Html

    <div id="hero">
        <div class="stage-item">
            <img src="http://lorempixel.com/550/300/sports/1/" alt="" />
            <div class="caption">This could be whatever and will be displayed at the side of the stage</div>
        </div>
        <div class="stage-item">
            <img src="http://lorempixel.com/550/300/sports/2/" alt="" />
            <div class="caption">This is second stage item and could be whatever and will be displayed at the side of the stage</div>
        </div>
        <div class="stage-item">
            <img src="http://lorempixel.com/550/300/sports/3/" alt="" />
            <div class="caption">This is second stage item and could be whatever and will be displayed at the side of the stage</div>
        </div>
    </div>
    
##CSS

    #hero-navigator .caption {background-color:#ccc;height:100px;}
    #hero-navigator .caption.hero-navigator-current {background-color: #ddd}

    #hero-indicator {position:absolute;top:320px;left:0;}
    #hero-indicator span {display:inline-block;width:15px;height:15px;background-color:#dddddd;margin-right:5px;}
    #hero-indicator span.hero-indicator-current {background-color:#383838;}

    #hero-paginator {position:absolute;top:340px;left:0;}
    #hero-paginator span {display:inline-block;padding:5px 10px;background-color:#dddddd;margin-right:5px;}
    #hero-paginator span.hero-paginator-current {background-color:#383838;color:#efefef;}

##Script

    (function($) {
        options = {
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
        $('#hero').hero(options);
        
        //auto slideshow start
        $('#hero').hero('start');
        
    });
    
Hovering over the paginator and navigator elements will cycle to its matching slide.  The $('#hero') element will be positioned relative and the slides in it absolutely.  The navigator currently is automatically positioned to the right of the slides.
The Paginator and indicator buttons are not positioned and must be positioned via css or other means.
