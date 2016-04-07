if ( $("#instafeed").length )
{

	var template = _.template(
    '<div class="col-lg-8 col-lg-offset-2">' +
    	'<div class="inst-item">'+
    		'<div class="inst-item__photo">'+
    			'<a href="<%= link %>">'+
    				'<img src="<%= images.standard_resolution.url %>" alt="">'+
    			'</a>'+
    		'</div>'+
    		'<div class="inst-item__meta">'+
    			'<span class="like"></span>'+
    			'<span><%= likes.count %></span>'+
    		'</div>'+
    	'</div>' +
	'</div>');

    var lastId = 0;

    var feed = new Instafeed({
        clientId: 'd84a51bb3706437991713e4f58f37cdc',
        accessToken: '2325935473.1677ed0.60e7653a64ff4f4db0d48fa5a8541425',
        get: 'tagged',
        tagName: 'colorit2016',
        limit: 1,
    	resolution: 'standard_resolution',
    	sortBy: 'most-liked',
    });

    feed.run();
}
