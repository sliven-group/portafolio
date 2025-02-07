jQuery(function($){
let mySwiper=document.querySelectorAll('.mySwiper');
if(mySwiper){
    for (var i = 0; i < mySwiper.length; i++) {
        mySwiper[i].classList.add("mySwiper-"+i)
        var swiper = new Swiper(".mySwiper-"+i, {
          // navigation: {
          //   nextEl: ".swiper-button-next",
          //   prevEl: ".swiper-button-prev",
          // },
            effect: "fade",
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }
}
let b1ListGallery=document.querySelectorAll( '.b1ListGallery ' );
if(b1ListGallery){
	for (var i = 0; i < b1ListGallery.length; i++) {
        b1ListGallery[i].setAttribute("id", 'lightgallery-'+i);
		lightGallery(document.getElementById('lightgallery-'+i))
	}
}
//CONFIGURACION POR DEFECTO DEL OBSERVER
        const appearOptions = {
            threshold: 0,
            rootMargin: "0px 0px -40% 0px"
        };
        const imgOptions = {
            threshold: 0,
            rootMargin: "0px 0px 10% 0px"
        };
        // OBSERVER BASICO (SOLO AGREGA UNA CLASE)
        const simpleObs = new IntersectionObserver((entries,simpleObs)=>{
            entries.forEach(entry =>{
                let obsItem = entry.target
                if (!!entry.isIntersecting) {
                    obsItem.classList.add("isVisible");
                    simpleObs.unobserve(obsItem)
                }else {return;}
            })
        },appearOptions)
        const obsItemArray = document.querySelectorAll(".obsv");
        obsItemArray.forEach(fader => {
            setTimeout(() => {
                simpleObs.observe(fader);
            }, 500);
        })
        // OBSERVER PARA ANIMACIONES DE ENTRADA 
        const appearOnScroll = new IntersectionObserver(function(
            entries,
            appearOnScroll
            ) {
            entries.forEach(entry => {
                let scrollItem = entry.target
                if (!!entry.isIntersecting) {
                    let listOfItems = scrollItem.querySelectorAll('.scroll-item')
                    Array.prototype.forEach.call(listOfItems, (el, i) => {
                        el.style.transitionDelay = `${i * 170}` + 'ms'
                        el.classList.add("animaActive");
                    })
                    appearOnScroll.unobserve(scrollItem);
                    setTimeout(() => {
                        listOfItems.forEach((el)=>{
                            el.style.transitionDelay = '0ms'
                            el.classList.remove("initAnima")
                            el.classList.remove("animaActive")
                            el.classList.remove("scroll-item")
                        })
                    }, 1500);
                } else {return;}
            });
        },
        appearOptions)
        const faderWrap = document.querySelectorAll(".scroll-wrapper");
        faderWrap.forEach(wrap => {
            let listOfItems = wrap.querySelectorAll('.scroll-item')
            listOfItems.forEach(fader => {
                let dataAnima = fader.getAttribute('data-anima')
                if (!dataAnima) {
                    fader.classList.add("initAnima")
                }else{
                    fader.classList.add(`${dataAnima}`)
                }
            })
            setTimeout(() => {
                appearOnScroll.observe(wrap);
            }, 500);
        })

let typed = document.querySelector('.typed');
if(typed){

let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
}

	// header

    // END TAB
});