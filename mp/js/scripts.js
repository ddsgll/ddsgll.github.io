$(document).ready(function() {
    
    // Scripting
    //
    // Left menu
    $(".subcat").hide();

    var lm_items = $(".left_menu .item");

    lm_items.on('click', function() {

        if ( $(this).hasClass('active') )
            {
                $(this).removeClass('active')
                        .find(".subcat").slideUp();
            }

        else
            {
                $(this).addClass('active')
                        .siblings().removeClass('active')
                        .find(".subcat").slideUp();

                $(this).find(".subcat").slideDown();
            }
    });

    // Item count cart
    var c_input = $(".cart_list .items_amount");

    c_input.each(function() {
        var c_add = $(this).siblings(".plus"),
            c_sub = $(this).siblings(".minus"),
            c_one = $(this).parent().parent().find(".price"),
            c_sum = $(this).parent().parent().find(".sum");

        init_counter($(this),c_sub,c_add,c_one,c_sum, 50, 1500, 100);
    });


    // Map
	var main_lat = 0,
		main_lon = 0;

	getCoord('Люберцы, инициативная 1');
	ymaps.ready(initMap);

	mainMark = {
	            	iconImageHref:   'img/icons/map_label.png',  // картинка иконки
	            	iconImageSize:   [ 320,  150], 			 	 // размер иконки
	            	iconImageOffset: [-40, -125], 			 	 // позиция иконки
               }

    // Получение координат адреса | Яндекс карты 2.1
    function getCoord(address) {
    	var result;

    	$.ajax({
    		url: "http://geocode-maps.yandex.ru/1.x/?format=json&geocode="+address,
    		dataType: "JSON",
    		success: function(data, textMessage) {

				// response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos - строка с координатами из запрошенного JSON

    			result = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');

    			main_lat = result[0]/1;
    			main_lon = result[1]/1;
    				
    			console.log(textMessage+"\nКоординаты адреса '"+address+"': "+main_lat+", "+main_lon);

    		},

    		error: function(textMessage) {
    			console.log(textMessage);
    		}
    	});
    }

    // Инициализация карты
    function initMap(){    

        footMap = new ymaps.Map("main_map", {
            center: [main_lon, main_lat],
            zoom: 16,
            controls: []
        });

        footPlacemark = new ymaps.Placemark( [main_lon, main_lat], {balloonContent: ''}, mainMark );
        footMap.geoObjects.add(footPlacemark);

    	console.log("Footer map initialised");

	}

    /*
    Счетчик
    ///////////
        field    - INOUT с цифрой количества
        sub      - элемент для уменьшения количества
        add      - элемент для увеличения количества
        onePrice - SPAN с величиной суммы за 1 предмет
        sumPrice - SPAN для вывода суммы за указанное количество предметов
        min      - минимальное количество
        max      - максимальное количество
        def      - количество по умолчанию при загрузке страницы
    */
    function init_counter(field, sub, add, onePrice, sumPrice, min, max, def) {

            def < min ? def = min : "";

            //Количество по умолчанию
            var itemCount = def / 1;
            console.log("Тип переменной itemCount: " + typeof(itemCount));


            //Цена за один товар
            var one = onePrice.text() / 1;
            console.log("Тип переменной one: " + typeof(one));

            field.val(itemCount);

            var t_sum = one * itemCount;
            sumPrice.text(t_sum);           //Подсчет суммы
            console.log("Тип переменной t_sum: " + typeof(t_sum) + " | (значение: " + t_sum + ")\n\n");

            //Прибавить
            add.on('click', function() {
                
                //Если количество не больше максимального
                if(itemCount < max) {
                    itemCount += 10;                //плюс 10
                    t_sum = one * itemCount;
                    sumPrice.text(t_sum);           //Подсчет суммы
                    field.val(itemCount);           //Изменение значения в поле

                    console.log("Тип переменной itemCount: " + typeof(itemCount));
                    console.log("Тип переменной one: " + typeof(one));
                    console.log("Тип переменной t_sum: " + typeof(t_sum) + " | (значение: " + t_sum + ")\n\n");
                }
            });

            //Убавить
            sub.on('click', function() {

                //Если количество не меньше минимального
                if(itemCount > min) {
                    itemCount -= 10;                //Минус 10
                    t_sum = one * itemCount;
                    sumPrice.text(t_sum);           //Подсчет суммы
                    field.val(itemCount);           //Изменение значения в поле

                    console.log("Тип переменной itemCount: " + typeof(itemCount));
                    console.log("Тип переменной one: " + typeof(one));
                    console.log("Тип переменной t_sum: " + typeof(t_sum) + " | (значение: " + t_sum + ")\n\n");
                }
            });

            //ИЗменить в поле ввода
            field.on('input', function() {

                //Запись введенного значения в переменную
                itemCount = $(this).val();

                //Если введенная строка - число в диапазоне [min;max], то...
                if( itemCount > min && itemCount < max && typeof(itemCount) != NaN)
                {
                    //Подсчитываем сумму
                    t_sum = one * itemCount;
                    sumPrice.text(t_sum);           //Подсчет суммы
                }

                //Иначе, если введенная строка - число больше максимального, то...
                else if ( itemCount > max  && typeof(itemCount) != NaN)
                {
                    $(this).val(max)                //Меняем значение поля на максимально
                    itemCount = $(this).val();      //Присваиваем переменной значение поля
                    t_sum = one * itemCount;
                    sumPrice.text(t_sum);           //Подсчет суммы
                }
                else 
                {
                    $(this).val(min);               //Меняем значение поля на минимальное
                    itemCount = $(this).val();      //Присваиваем переменной значение поля
                    t_sum = one * itemCount;
                    sumPrice.text(t_sum);           //Подсчет суммы
                }
            });
    }
});
