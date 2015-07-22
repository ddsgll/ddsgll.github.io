$(document).ready(function() {

    $("#mobile_menu_open").on('click', function() {
        $(".menuList").addClass("opened");
    });

    $(".mobile-close").on('click', function() {
        $(".menuList").removeClass("opened");
    });

    $("#main_slider").flickity({
        cellSelector: '.item',
        pageDots: false,
        prevNextButtons: false,
        wrapAround: true
    });

    $(".slider .slide_nav").on('click', function() {
        var act = $(this).data("action");
        $("#main_slider").flickity(act);
    });

    $(".prog_list .row").flickity({
        cellSelector: '.prog_item',
        pageDots: false,
        prevNextButtons: false,
        wrapAround: true
    });

    $("#prog_main_prev").on('click', function() {
        $(".prog_list .row").flickity("previous");
    });

    $("#prog_main_next").on('click', function() {
        $(".prog_list .row").flickity("next");
    });



    $(".top_lang").on('click', function() {
        $(this).next(".sub_lang").toggleClass("active");
    });



    var st_row = $(".stolp").find(".row"),
        st_img = $(".stolp").find(".stolp_image img");

    st_row.find(".number").on('click', function() {
        
        var i = $(this).parent().parent().data("image");
        var string = "img/stolp_photo/" + i + ".png";
        st_img.fadeOut(300,function() {
            $(this).attr("src",string).fadeIn(300);
        });

        
        st_row.removeClass("active");
        $(this).parent().parent().addClass("active");
    });

});







///////////////////////////////
// MAP
///////////////////////////////

var map_styles =
[
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "invert_lightness": true
            },
            {
                "saturation": 10
            },
            {
                "lightness": 30
            },
            {
                "gamma": 0.5
            },
            {
                "hue": "#0076ff"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#00a0df"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "47"
            },
            {
                "lightness": "75"
            },
            {
                "color": "#006bc5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "43"
            },
            {
                "lightness": "56"
            },
            {
                "gamma": "6.48"
            },
            {
                "color": "#0051a9"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "33"
            },
            {
                "color": "#7bc2f9"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#7bc2f9"
            },
            {
                "lightness": "-52"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "100"
            },
            {
                "invert_lightness": true
            },
            {
                "lightness": "-43"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "color": "#063770"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0051a9"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0051a9"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7bc2f9"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "34"
            },
            {
                "lightness": "18"
            },
            {
                "color": "#0051a9"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#3789e4"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "98"
            },
            {
                "gamma": "4.20"
            },
            {
                "color": "#7bedf9"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#7bc2f9"
            },
            {
                "lightness": "-55"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#232f3a"
            }
        ]
    }
];

function initialize() {
	var mapOptions = {
		zoom: 17,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(42.9644937,47.4939926)
	}
	var map = new google.maps.Map(document.getElementById('foot_map'),
	                            mapOptions);

	var image = 'img/icons/map_pointer.png';
	var myLatLng = new google.maps.LatLng(42.9626408,47.4911388);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	map.setOptions({styles: map_styles});
}

google.maps.event.addDomListener(window, 'load', initialize);

///////////////////////////////////////////////////////