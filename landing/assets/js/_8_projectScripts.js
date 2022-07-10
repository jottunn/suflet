jQuery(document).ready(function(){
    //add sticky class to #masthead
    jQuery(window).scroll(function () {
         if (jQuery(this).scrollTop() >= 400) {
            jQuery("#masthead").addClass('opac');
         } else {
            jQuery("#masthead").removeClass('opac');
         }
    });


    var myLazyLoad = new LazyLoad({
        elements_selector: ".lazy"
    });

    /* Back-to-top */
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = jQuery('.ksw-top:not(.ksw-ask)');

    //hide or show the "back to top" link
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > offset) {
            $back_to_top.addClass('ksw-is-visible');
            //fix lazy load on stupid laptops
            myLazyLoad.loadAll();

        } else {
            $back_to_top.removeClass('ksw-is-visible ksw-fade-out');
        }
        if (jQuery(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('ksw-fade-out');
        }
    });

    /* smooth scroll to top */
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        jQuery('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration
        );
    });

    //nav on mobile
     var viewportWidth = $(window).width();
    if (viewportWidth <= 1200) {
        //show sub-mmenu
        jQuery(".cd-morph-dropdown").find("li.has-dropdown > a, .has-kids > a").each(function(){
            jQuery(this).attr('href','#');
            jQuery(this).click(function(e){
                e.preventDefault();
                jQuery(".cd-morph-dropdown").find("li").removeClass("selected");
                jQuery(".show-kids").removeClass("show-kids");
                jQuery(this).parent("li").addClass("selected");
                if (jQuery(this).parent("div").hasClass("has-kids")) {
                    jQuery(this).parents("li.has-dropdown").addClass("selected");
                    jQuery(this).parent("div").addClass("show-kids").addClass("selected");
                    jQuery(this).parents(".sub-menu-style-2").addClass("move-out");
                    jQuery(".main-menu").addClass('show-depth-3');
                    jQuery('.go-back').addClass("show-depth-2");
                } else {
                     jQuery(".main-menu").removeClass('show-depth-3');
                     jQuery('.go-back').removeClass("show-depth-2");
                }
                jQuery(".main-menu").addClass("move-out");
                jQuery(".go-back").removeClass("hide");
            })
        })

        jQuery('.go-back').on('click', function(){
            var selected = $(this);
            if (jQuery(this).hasClass("show-depth-2")) {
                jQuery(".depth-2").removeClass("selected").removeClass("show-kids");
                jQuery(".sub-menu-style-2").removeClass("move-out");
                jQuery('.go-back').removeClass("show-depth-2");
                jQuery(".main-menu").removeClass('show-depth-3');
            } else {
                selected.parent('ul').removeClass('move-out');
                selected.addClass('hide');
                jQuery("li.has-dropdown.selected").removeClass("selected");
            }
        });
	}

	//clickable divs
    jQuery(".makeitlink").each(function(){
        jQuery(this).on("click", function(){
            const isTextSelected = window.getSelection().toString();
            if (!isTextSelected) {
                const mainLink = jQuery(this).find('a')[0];
                mainLink.click();
            }
        });
    })

   var img1 = jQuery("#home-bkg").find('img').attr('src');
    jQuery("body.home").css('background-image', 'url("'+img1+'")');

    if (viewportWidth <= 500) {
        //add image as background for mobile carousels
        jQuery(".carousel:not(.infobox)").each(function(){
            jQuery(this).find('.carousel-item').each(function(){
                let imgSrc = jQuery(this).find('img').attr('src');
                jQuery(this).css('background-image', 'url("' + imgSrc + '"');
            })
        })
    }
})