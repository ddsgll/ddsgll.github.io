if ( $("#instafeed").length )
{
    var instTemplate =
    '<div class="col-lg-4 col-md-4">' +
        '<div class="inst-item">'+
            '<div class="inst-item__photo">'+
                '<a href="{{link}}">'+
                    '<img src="{{image}}" alt="">'+
                '</a>'+
            '</div>'+
            '<div class="inst-item__meta">'+
                '<span class="like"></span>'+
                '<span>{{likes}}</span>'+
            '</div>'+
        '</div>' +
    '</div>';

	var template = _.template(
    '<div class="col-lg-4 col-md-4">' +
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
        template: instTemplate,
        get: 'tagged',
        tagName: 'cats',
        limit: 6,
		resolution: 'standard_resolution',
		sortBy: 'most-recent',
        mock: true,

        success: function(data) {
            curId = data.data[0].id;

            isNoNews = lastId === curId;

            if(isNoNews === false) {
                lastId = curId;
                updatePhotos(data.data);
            }

            console.log(isNoNews);
            console.log(data.data);
        },

        after: function() {
            $(".inst-item").animate({opacity: 1}, 200);
        }
    });

    feed.run();

    window.setInterval(function() {
        feed.run();
    }, 3000);

    function updatePhotos(data) {

        var instaHTML = '';

        _.each(data, function(el, i, arr) {

            var htmlString = template(el);

            instaHTML += htmlString;

        });

        $("#instafeed").fadeOut(100, function() {
            $(this).html(instaHTML).fadeIn(100);
        });

    }


}