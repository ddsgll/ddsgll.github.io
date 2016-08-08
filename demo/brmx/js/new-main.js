function initSliders() {
  var opts = {
    cellSelector: '.row-slider__item',
    pageDots: false,
    prevNextButtons: false,
    cellAlign: 'left',
    wrapAround: true
  }
  
  var sliderPops = new Flickity(".slider-popular", opts);
  var sliderNew  = new Flickity(".slider-new", opts);
  
  var
    slPopsPrev = document.querySelector("#sl-popular-arrows .arrow-left"),
    slPopsNext = document.querySelector("#sl-popular-arrows .arrow-right"),
    slNewPrev  = document.querySelector("#sl-new-arrows .arrow-left"),
    slNewNext  = document.querySelector("#sl-new-arrows .arrow-right");
  
  slPopsPrev.onclick = function() {sliderPops.previous();}
  slPopsNext.onclick = function() {sliderPops.next();}
  slNewPrev.onclick  = function() {sliderNew.previous();}
  slNewNext.onclick  = function() {sliderNew.next();}
}

initSliders();