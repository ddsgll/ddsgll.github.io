// Класс скрипта
function scriptApp() {

	this.scr_title = "";
	this.startQuestion = "";
	this.answers = [];

	this.addAnswer = function(ans) {
		this.answers.push(ans);
	};

	this.show_all = function() {
		var result;
		var mas = this.answers;

		console.info("ВСЕ БЛОКИ ("+ this.answers.length + " штук)");
		_.each(mas, function(ans) {
			console.info("Инфо: lvl=" + ans._id[0] + "; query=" + ans._id[1] + "; Ответ: " + ans.answer + "; Вопрос: " + ans.reaction + ";");
		});
	};

	this.num_in_level = function(lvl) {
		var q = '*[data-level="' + lvl + '"]';
		return $(q).length;
	};

	this.get_block = function(l,q) {
		var mas = this.answers;

		var result = _.each(mas, function(obj) {
			return (obj._id[0] == l && obj._id[1] == q);
		});

		return result;
	};

	this.say = function(s) {
		s ? alert(s) : alert("DAT ASS!!");
	};

	this.delete_answer = function() {

	};

	this.move = function(obj,top,left) {
		obj.offset( {top: top, left: left} );
	};
}

// Класс вопроса
function answ(l,q,a,r) {
	this._id = [l,q];
	this.answer = a;
	this.reaction = r;

	this.set_inf = function(ans,rea) {
		this.answer = ans;
		this.reaction = rea;
	}
}

var app = new scriptApp();