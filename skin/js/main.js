jQuery.noConflict()(function ($) {

    'use strict';

    $.exists = function(selector) {
        return ($(selector).length > 0);
    }

    window.onpageshow = function(event) {
      if (event.persisted) {
          ms_preloader(); 
      }
    };

    $( document ).ready(function() {

        // All Funtions
        ms_preloader();
        ms_menu();
        ms_home_slider();
        ms_masonry();
        ms_sort();
        ms_unite_gallery();
        ms_share_post();
        ms_format_video();
        ms_load_more();

    });
    /*------------------
        Page Transition
    -------------------*/
        function ms_preloader() {
            if ($.exists('.ms-preloader')) {
                ms_page_transition();
            } else {
                ms_page_notransition();
            }
        }
        function ms_page_notransition() {
            $('.ug-thumb-image, .ms-section__block img, .ms-footer').css('opacity', '1');
            $('.ms-main-container').addClass('loaded');
            $('.content-overlay').css('visibility', 'hidden');
        }
        function ms_page_transition() {
            var preload = anime({
                targets: '.ms-preloader',
                opacity: [1, 0],
                duration: 600,
                easing: 'easeInOutCubic',
                complete: function(preload) {
                    $('.ms-preloader').css('visibility', 'hidden');
                }
            });
            
            $('.ms-grid-item').css('pointer-events', 'none');
            var cont = anime({
                targets: '.ms-footer',
                opacity: [0, 1],
                easing: 'easeOutCubic',
                duration: 600,
                complete: function(cont) {
                    $('.content-overlay').css('visibility', 'hidden');
                    imagesLoaded('.album-item__img', { background: true }, function() {
                        var posts = $('.ms-grid-item');
                        var i = 0;
                        setInterval(function(){
                            if( i >= posts.length ) return false;
                            var el = posts[i];
                            $(el).addClass('loaded');
                            i++
                        }, 200);
                    });

                    $('.ms-section__block img').css({
                        'opacity': '1'
                    });
                    $('.ug-thumb-wrapper, .ms-post__item, .ms-grid-item').css({
                        'pointer-events': 'auto'
                    });
                }
            });
            $(document).on('click', '[data-type="page-transition"], a.page-numbers, .nav-links a, .ms-right-sidebar aside a', function(e) {
                var url = $(this).attr('href');
                if (url != '#' && url != '') {
                    e.preventDefault();
                    $('.ms-preloader').css('visibility', 'visible');
                    var url = $(this).attr('href');
                    var preload = anime({
                        targets: '.ms-preloader',
                        opacity: [0, 1],
                        duration: 300,
                        delay: 100,
                        easing: 'easeInOutQuad',
                        complete: function(preload) {
                            window.location.href = url;
                        }
                    });
                }
            });
        }
    /*------------------
        Masonry Grid
    -------------------*/
        function ms_masonry() {
            if ($.exists('.ms-ajax-content')) {
                var $container = jQuery('.ms-ajax-content');
                $container.imagesLoaded( function() {
                    $container.isotope({
                        itemSelector: '.ms-grid-item',
                        columnWidth: '.grid-sizer'
                    });   
                });
            }
        }
    /*------------------
        Menu
    -------------------*/
        function ms_menu() {

            if ($.exists('.navbar-white')) {
                $('.logo-light').addClass('current');
                if ($.exists('.ms-logo__default')) {
                    $('.ms-logo__default').css({'color' : '#fff'})
                }
            } else {
                $('.logo-dark').addClass('active');
            }
            if ($.exists('.hamburger')) {
                $('.hamburger').on('click', function(e) {
                    var burger = $(this);
                    $(burger).toggleClass('is-active');
                    $('.ms-container').toggleClass('is-parallax');
                    $('.ms-nav').toggleClass('is-visible');
                    $('.ms-header').not('.navbar-white').each(function() {
                        $('.logo-dark').toggleClass('active hide');
                        $('.logo-light').toggleClass('active');
                        if ($.exists('.ms-logo__default')) {
                            $('.ms-logo__default').toggleClass('active');
                        }
                    });
                    if ($.exists('.is-parallax')) {
                        $('.content-overlay').css('visibility', 'visible');
                        var overlay = anime({
                            targets: '.content-overlay',
                            opacity: [0, 1],
                            duration: 800,
                            easing: 'easeInOutQuad'
                        });
                    } else {
                        var overlay = anime({
                            targets: '.content-overlay',
                            opacity: [1, 0],
                            duration: 800,
                            easing: 'easeInOutQuad',
                            complete: function(preload) {
                                $('.content-overlay').css('visibility', 'hidden');
                            }
                        });
                    }
                });
            }
        }
    /*------------------
        Home Slider
    -------------------*/
        function ms_home_slider() {
            if ($.exists('.swiper-container')) {
                var d = $('.swiper-wrapper').data('direction'),
                    a = $('.swiper-wrapper').data('autoplay'),
                    l = $('.swiper-wrapper').data('loop');
                    if ( l == true ) {
                        $('.expanded-timeline__counter').css('display', 'none');
                    }
                var swiper = new Swiper('.swiper-container', {
                direction: d,
                autoplay: a,
                loop: l,
                slidesPerView: 1,
                speed: 1000,
                grabCursor: false,
                mousewheel: true,
                keyboard: true,
                simulateTouch: false,
                centeredSlides: true,
                parallax: true,
                effect: 'slide',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
                });

                var counter = $('.swiper-counter'),
                    firstslide = swiper.activeIndex + 1,
                    currentCount = $('<span class="count active start">' + firstslide + '<span/>');
                counter.append(currentCount);

                swiper.on('slideChange', function () {

                    var index = swiper.activeIndex + 1;
                    var prevCount = $('.count');
                    currentCount = $('<span class="count next">' + index + '<span/>');
                    currentCount.appendTo(counter);

                    var seekAnim = anime({
                        targets: '.count.active',
                        translateY: '-10px',
                        opacity: [1, 0],
                        easing: 'easeOutCubic',
                        duration: 800,
                        complete: function() {
                            prevCount.remove();
                            $('.count.next').addClass('active');
                        }
                    });
                    var seekAnim = anime({
                        targets: '.count:not(.active)',
                        translateY: [10, 0],
                        opacity: [0, 1],
                        easing: 'easeOutCubic',
                        duration: 800,
                        complete: function() {
                            prevCount.remove();
                            $('.count.next').addClass('active');
                        }
                    });
                });
            }
        }
    /*------------------
        Sort
    -------------------*/
        function ms_sort() {
            if ($.exists('.ms-ajax-content')) {

                var $grid = $('.ms-ajax-content').isotope({
                    itemSelector: '.ms-grid-item',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.grid-sizer',
                        layoutMode: 'layout'
                    }
                });

                $('.filtr-btn li').on('click', function() {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({ filter: filterValue });
                    $('.filtr-btn li').removeClass('active');
                    $(this).addClass('active');
                });

            }
        }
    /*------------------
        Unite-Gallery
    -------------------*/
        function ms_unite_gallery() {

            if ($.exists('#gallery')) {
                $('#gallery').unitegallery({
                    gallery_theme: 'tiles',
                    tiles_type: "justified",
                    tiles_justified_row_height: 350,
                    tiles_set_initial_height: true,
                    tiles_justified_space_between: 30,
                    tile_overlay_opacity: 0.7,
                    tile_enable_icons: false,
                    tile_textpanel_position: "inside_bottom",
                });
            }

            if ($.exists('#video_gallery')) {
                $('#video_gallery').unitegallery({
                    gallery_theme: 'tiles',
                    tiles_type: "justified",
                    tiles_justified_row_height: 350,
                    tiles_set_initial_height: true,
                    tiles_justified_space_between: 30,
                    tile_overlay_opacity: 0.7,
                    tile_enable_icons: true,
                    tile_textpanel_position: "inside_bottom",
                });
            }

        }
    /*------------------
        Embed video in Post
    -------------------*/
        function ms_format_video() {

            if ($.exists('p iframe')) {
            var iframe = $('p > iframe'),
                parent = $('p > iframe').parent('p');
                iframe.addClass('embed-responsive-item');
                iframe.removeAttr("width").removeAttr("height").css({ width: "", height: "" });
                parent.addClass('embed-responsive embed-responsive-16by9');
            }

        }
    /*------------------
        Share Post
    -------------------*/
        function ms_share_post() {

            if ($.exists('#share')) {
                $("#share").jsSocials({
                    showLabel: false,
                    showCount: false,
                    shareIn: "popup",
                    shares: [
                        { share: "facebook", logo: "socicon-facebook" },
                        { share: "twitter", logo: "socicon-twitter", },
                        { share: "pinterest", logo: "socicon-pinterest" },
                        { share: "googleplus", logo: "socicon-googleplus" },
                    ]
                });
            }

        }

        function ms_load_more() {

            if ($.exists('.ms-load-more')) {
                var $grid = $('.ms-ajax-content').imagesLoaded();
                var pageNum = parseInt(infinity_load.startPage)+1,
                max = parseInt(infinity_load.maxPages),
                nextLink = infinity_load.nextLink,
                $loadMore = $('.ms-load-more'),
                $posts_container = $('.ms-ajax-content');

                $posts_container.next().find($loadMore).on('click', function(event){
                event.preventDefault();
                    var button = $(this);
                    pageNum++;

                    $.ajax({
                        type: 'POST',
                        url: nextLink,
                        dataType: 'html',
                        beforeSend : function ( xhr ) {
                            button.html( '<span class="label-button">loading...</span>' ).addClass('btn-load');
                        },
                        success: function(data) {
                        var item = $(data),
                            val = item.find('.ms-grid-item'),
                            $container = $('.ms-ajax-content').isotope();
                        nextLink = nextLink.replace(/\/page\/[0-9]?/,'/page/'+ pageNum);
                            if(val.length > 0) {
                                setTimeout(function(){
                                    $container.append(val).isotope( 'appended', val );
                                    setTimeout(function(){
                                        revealPosts();
                                    }, 200);
                                    if(pageNum <= max) {
                                        button.html( '<span class="label-button">load more</span>' ).removeClass('btn-load').prev().before(val);
                                    } else {                     
                                        button.html('<span class="label-button">No more posts</span>').removeClass('btn-load').addClass('btn-disabled');
                                    }      
                                }, 1000);
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            $loadMore.text(textStatus + ' :: ' + errorThrown);
                        }
                    });

                });

            }

            function revealPosts() {

                var posts = $('.ms-grid-item:not(.loaded)');
                var i = 0;
                
                    setInterval(function(){
                        
                        if( i >= posts.length ) return false;
                        var el = posts[i];
                        $(el).addClass('loaded');
                        i++
                        
                    }, 200);

            }

        }
});