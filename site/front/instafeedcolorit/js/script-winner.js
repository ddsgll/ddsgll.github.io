if ( $("#instafeed").length )
{

	var templateInst =
    '<div class="col-lg-4 col-md-4">' +
    	'<a href="{{link}}"><div class="inst-item">'+
            '<h3></h3>' +
    		'<div class="inst-item__photo">'+
				'<img src="{{image}}" alt="" /> '+
    		'</div>'+
    		'<div class="inst-item__meta">'+
    			'<span class="like"></span>'+
    			'<span>{{likes}}</span>'+
    		'</div>'+
    	'</div></a>' +
	'</div>';

    var sortType = 'most-recent';

    var lastId = 0;

    var feed = new Instafeed({
        clientId: 'd84a51bb3706437991713e4f58f37cdc',
        accessToken: '2325935473.1677ed0.60e7653a64ff4f4db0d48fa5a8541425',
        get: 'tagged',
        template: templateInst,
        tagName: 'colorit2016',
		resolution: 'standard_resolution',
		sortBy: 'most-liked',
        limit: 1000,
        success: function(data) {
            console.log(data)
        },
        after: function() {
            $("#instafeed").find(".inst-item").each(function() {
                $(this).animate({opacity: 1}, 200);
            });
        }
    });

    feed.run();
}
