$(document).ready(function() {

	$(document).on({
		mouseenter:function(e){
			var $this = $(this);
			$this.removeClass('a2').addClass('a1');
		},
		mousemove:function(e){
			var $this = $(this);
			$this.removeClass('a2').addClass('a1');
		},
		mouseleave:function(e){
			var $this = $(this);
			$this.removeClass('a1').addClass('a2');
			setTimeout(function(){
				$this.removeClass('a2');
			},500);
		}
	},'.an');
	
});