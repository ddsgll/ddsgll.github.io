// Класс скрипта
function scriptApp() {

	this.scr_title = "Скрипт";
	this.startQuestion = "";
	this.answers = [];

	// Вставляет объект ответа в массив
	this.addAnswer = function(ans) {
		this.answers.push(ans);
	};

	this.get_ierarchy = function() {};

	this.refresh = function() {};

	// Выводит список всех существующих вопросов уровня ниже 1
	this.show_all = function() {
		var result;
		var mas = this.answers;

		console.info("ВСЕ БЛОКИ ("+ this.answers.length + " штук)");
		_.each(mas, function(ans) {
			console.info("Инфо: lvl=" + ans._id[0] + "; query=" + ans._id[1] + "; Ответ: " + ans.answer + "; Вопрос: " + ans.reaction + ";");
		});
	};

	// Возвращает количество элементов на уровне
	this.num_in_level = function(lvl) {
		var q = '*[data-level="' + lvl + '"]';
		return $(q).length;
	};

	// Возвращает объект вопроса по уровню и номеру (доработать)
	this.get_block = function(l,q) {
		var mas = this.answers;

		var result = _.find(mas, function(obj) {
			return (obj._id[0] == l && obj._id[1] == q);
		});

		return result;
	};

	// Вывод информации в консоль для проверки работы событий
	this.say = function(s) {
		s ? console.info(s) : console.info("DAT ASS!!");
	};

	// Удаление объекта вопроса из массива (доработать)
	this.delete_answer = function(l,q) {
		app.alert("You asked me to delete answer №" + q + " in level " + l);

		var mas = this.answers;

		_.each(mas, function(el,ind) {
			if (el._id[0] == l && el._id[1] == q) {
				app.say("You've deleted element " + q + " in level " + l);
				app.answers.splice(ind,1);
			}
		});
	};

	// Перерассчет объектов после удаления
	this.recount = function(l) {
		var els = this.num_in_level(l),
			mas = this.answers,
			max = 0, t_mas = [];	

		_.each(mas, function(el) {
			{
				el._id[0] === l ? t_mas.push(el._id[1]) : "";
			}
		});

		max = _.max(t_mas);

		var msg = "";

		els < max ? msg = "error" : msg = "no errors";

		alert("Max value in level " + l + " is " + max + ";\nNumber of elements is " + els + ";\nThere is " + msg);
	};

	this.alert = function(msg) {
		$(".alert p").text(msg);
		$(".alert").addClass("active");
		$(".alert").animate({top: 0}, 2200, function() {
			$(".alert").removeClass("active");
		});

		return false;
	};
}

// Класс вопроса
function answ(l,q,a,r) {
	this._id = [l,q];
	this.answer = a;
	this.reaction = r;

	this.answers = [];
}

// Класс плеера
function player(data) {
	this.data = data;

	this.run = function() {
		data.alert("Запуск скрипта");
		var pl = $("#scr_player");

		pl.addClass("active");
		pl.find(".player .title").text( data.scr_title );
		pl.find(".player .question").text( data.startQuestion );
	};

	this.stop = function() {
		var pl = $("#scr_player");
		pl.removeClass("active");
	};

	this.refresh = function(obj) {
		var q = obj.question;
	};
}

var app = new scriptApp();
var play = new player(app);