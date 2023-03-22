document.addEventListener("click", eventDocClick, false);
window.addEventListener("load", eventWinLoad, false);

window.addScript = function (scriptPath, callback) {
    if ($("script[src='" + scriptPath + "']").length == 0) {
        var scr = document.createElement("script");
        scr.type = "text/javascript";
        scr.src = scriptPath;
        if (callback) scr.onload = function () {
            callback();
        };
        $("body")[0].appendChild(scr);
    } else if (callback) callback();
};

//глобальный обработчик кликов по документу
function eventDocClick(e) {
    var targ = e.target;
    var clickedEl = e.target;
    var ddlActive = null;

    while (targ && targ != this) {
        if (targ.tagName == "HTML") {
            var el;
            if (el = document.querySelector(".dropdown_lang.active")) {
                el.classList.remove("active");
            }
            
            break;
        }

        if(targ.classList.contains("dropdown-item") && targ.parentNode.parentNode.classList.contains("dropdown_lang")) {
            document.querySelector(".dropdown_lang_toggle").textContent = targ.textContent;
        }
        if(targ.classList.contains("headerMain-togglerMobMenu")) {
            var html = document.documentElement;
            if(!html.classList.contains('mobileMenuOpened')) {
                html.classList.add('setReadyMobileMenu');
                setTimeout(function() {
                    html.classList.add('mobileMenuOpened');
                }, 30);
            }
            else {
                html.classList.remove('mobileMenuOpened');
                setTimeout(function() {
                    html.classList.remove('setReadyMobileMenu');
                },400);
            }
            break;
        }
        if(targ.tagName == "BODY" && document.documentElement.classList.contains('mobileMenuOpened')) {
            var html = document.documentElement;
            html.classList.remove('mobileMenuOpened');
                setTimeout(function() {
                    html.classList.remove('setReadyMobileMenu');
                },400);
            break;
        }

        targ = targ.parentNode;
    }
};

function eventWinLoad(e) {
    initSlick();
};

function initSlick() {
    if (document.getElementsByClassName("reviewsSlideShow")[0]) {

        if (typeof $.fn.Slick == 'undefined') {
            addScript("js/slick1.8.1.min.js");
        }

        setTimeout(function() {            
            $(".reviewsSlideShow").slick(reviewsSlickParams);
        }, 50);
    }
};
var reviewsSlickParams = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slide: 'div',
    arrows: true,
    autoplay: false,
    mobileFirst: true,
    responsive: [        
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                adaptiveHeight: true
            }
        }
    ]
};
