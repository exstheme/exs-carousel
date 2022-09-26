/*!
 * ExS Carousel v1.0.0 (https://exs-carousel.exsthemewp.com/)
 * Copyright ExS Theme, Fastest ans Smallest WordPress theme. (https://exsthemewp.com)
 *
 * Licensed under the MIT license.
 */
window.exsCarousel=function(config){
	'use strict';
	var defaults={
		selector:'.exs-carousel',
		dots:false,
		arrows:false,
		autoplay:false,
		interval:5000
	}

	config=Object.assign(defaults,config);

	//detecting carousel and returning if no carousels founded
	var d=document;
	var carousels=d.querySelectorAll(config.selector);
	if(!carousels.length){
		return;
	}

	function hasClass(el,className){
		return el.classList.contains(className);
	}
	function setTransform(el,transform){
		el.style.transform=transform;
	}
	function scroll(carousel,count,forward,index=null){
		var nextSlide;
		//scroll by arrows or swipes
		if(!index){
			var currentSlide=(parseInt(carousel.style.transform.replace('translateX(','').replace('-','').replace('%)',''),10))/100+1;
			//if end and direction is forward - set to 0
			if(forward&&currentSlide===count){
				nextSlide=1;
				setTransform(carousel,'translateX(0%)');
			}else{
				if(forward){
					nextSlide=currentSlide+1;
					setTransform(carousel,'translateX(-'+ currentSlide*100 +'%)');
				}else{
					if(currentSlide===1){
						nextSlide=count;
						setTransform(carousel,'translateX(-'+ (count-1)*100 +'%)');
					}else{
						nextSlide=currentSlide-1;
						setTransform(carousel,'translateX(-'+ (currentSlide-2)*100 +'%)');
					}
				}
			}
		//scroll by dots
		} else {
			nextSlide=parseInt(index,10);
			setTransform(carousel,'translateX(-'+ (nextSlide-1)*100 +'%)');
		}
		//active dot
		if(nextSlide&&(hasClass(carousel,'dots')||config.dots)){
			var listItems=carousel.nextSibling.childNodes;
			listItems.forEach(function (item){item.classList.remove('active')});
			listItems[nextSlide-1].classList.add('active')
		}
		//reset timer
		if(carousel.exsTimer&&carousel.exsMs){
			clearInterval(carousel.exsTimer);
			carousel.exsTimer=setInterval(function(){
				scroll(carousel,count,1);
			},carousel.exsMs);
		}
	}

	//init carousels
	carousels.forEach(function(carousel){
		//check if already inited
		if(!hasClass(carousel,'inited')){
			//wrap carousel if it is not already wrapped
			if(!hasClass(carousel.parentNode,'exs-carousel-wrap')){
				var wrapper=d.createElement('div');
				wrapper.setAttribute('class', 'exs-carousel-wrap');
				carousel.parentNode.insertBefore(wrapper, carousel);
				wrapper.appendChild(carousel);
			}
			//add 'exs-carousel' class for custom selector
			if(!hasClass(carousel,'exs-carousel')){
				carousel.classList.add('exs-carousel');
			}

			//set initial transform
			setTransform(carousel,'translateX(0%)');
			var count=carousel.children.length;

			//EVENTS
			//drag
			carousel.addEventListener('pointermove',function(e){
				if(hasClass(carousel,'dragging')||!e.buttons){
					return;
				}
				carousel.classList.add('dragging');
				if(e.movementX < 0) {
					scroll(carousel,count,1);
				}
				if(e.movementX > 0){
					scroll(carousel,count,0);
				}
			});
			carousel.addEventListener('pointerout', function(){
				carousel.classList.remove('dragging');
			});

			//dots
			if(hasClass(carousel,'dots')||config.dots){
				var dotsNav=d.createElement('nav');
				dotsNav.setAttribute('class', 'exs-carousel-dots');
				for(var i=0;i<count;i++){
					var dot=d.createElement('i');
					dot.setAttribute('data-index', i+1);
					if(0===i){
						dot.classList.add('active');
					}
					dotsNav.appendChild(dot);
					dot.addEventListener('click',function(e){
						scroll(carousel,count,0,e.target.getAttribute('data-index'));
					});
				}
				carousel.parentNode.insertBefore(dotsNav,carousel.nextSibling);
			}

			//arrows
			if(hasClass(carousel,'arrows')||config.arrows){
				var arrowsNav=d.createElement('nav');
				arrowsNav.setAttribute('class', 'exs-carousel-arrows');
				for(var j=0;j<2;j++){
					var ar=d.createElement('i');
					arrowsNav.appendChild(ar);
					if(0===j){
						ar.addEventListener('click',function(e){
							scroll(carousel,count,0);
						});
					}else{
						ar.addEventListener('click',function(e){
							scroll(carousel,count,1);
						});
					}
				}
				carousel.parentNode.insertBefore(arrowsNav,carousel);
			}

			//interval
			var interval=carousel.getAttribute('data-interval');
			if(interval||hasClass(carousel,'autoplay')||config.autoplay){
				var ms=interval?parseInt(interval,10):config.interval;
				var timer=setInterval(function (){
					scroll(carousel,count,1);
				},ms);
				carousel.exsTimer=timer;
				carousel.exsMs=ms;
			}

			//add 'inited' class to prevent double initialization
			carousel.classList.add('inited');
		}
	});
}
//auto init with default config values
window.addEventListener('load',function(){
	exsCarousel({selector:'.exs-carousel.autoinit'});
});