$(document).ready(function () {

    /* Header Search Input */
    const eacOptions =
        {
            data: ["Колье белое с золотом", "Колье-галстук", "Колье Эстер", "Колье Кокетка", "Колье Pupa", "Колье белое с золотом1", "Колье-галстук2", "Колье Эстер3", "Колье Кокетка4", "Колье Pupa5"],
            list: {
                maxNumberOfElements: 15,
            }
        };

    const eacCities =
        {
            data: ["Пятигорск", "Краснодар", "Ростов", "Ессентуки", "Нью-Йорк"],
            list: {
                maxNumberOfElements: 15,
            }
        };

    let initEAC = (elem, data) => {
        if (!elem.hasClass('eac-initialized')) {
            elem.addClass('eac-initialized');
            elem.easyAutocomplete(data);
        }
    }

    initEAC($('.js-city-autocomplete'), eacCities);

    if (screen.width > 991) {

        $('.js-header-search').on('click', function () {
            if (!$(this).hasClass('expanded')) {
                const containerWidth = $(this).parents('.container').width();
                $(this).addClass('expanded');
                $(this).find('span').addClass('hidden');
                const searchInput = $(this).find('.header__search-input');
                searchInput.addClass('visible');
                searchInput.css('width', '45px');
                searchInput.animate({'width': containerWidth / 6});
                initEAC($('.js-easy-autocomplete'), eacOptions);
                const eacWrapper = $(this).find('.easy-autocomplete');
                eacWrapper.css('width', '45px');
                eacWrapper.animate({'width': containerWidth / 6});
                searchInput.focus();
            }
        })
    }
    else {
        $('.js-header-search').addClass('js-open-modal js-init-eac').attr('data-modal', 'modal-mobile-search')
        $('.js-init-eac').on('click', function () {
            setTimeout(() => {
                initEAC($('.js-easy-autocomplete-modal'), eacOptions);
            }, 402)

        });
    }
    /* END Header Search Input */

    /* Menu Dropdown */
    $('.js-menu-dropdown').on('mouseover', function () {
        $('.js-menu-dropdown').removeClass('active');
        $('.header__dropdown').removeClass('show');
        let dropdownId = $(this).attr('data-dropdown-id');
        let dropdownElement = $(`#${dropdownId}`);
        $(this).addClass('active');
        dropdownElement.addClass('show');
        $(this).on('mouseout', function () {
            let vThis = $(this);
            if (!dropdownElement.is(':hover')) {
                $(this).removeClass('active');
                $(`#${dropdownId}`).removeClass('show');
            }
            dropdownElement.on('mouseleave', function () {
                vThis.removeClass('active');
                $(this).removeClass('show');
            });
        })
    })
    /* END Menu Dropdown */

    /*--Overflow scroll glitch fix---*/

    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    /*--END Overflow scroll glitch fix---*/

    /* Modals */
    let renderClickableBG = (isDark, elementToClose, renderParent=$('body'), blockScroll=true) => {
        renderParent.append('<div class="clickable-bg"></div>');
        if (blockScroll) {
            $('body').addClass('modal-opened').css('padding-right', scrollWidth);
        }
        if (isDark) {
            $('.clickable-bg').addClass('clickable-bg--dark').fadeOut(1).fadeIn(400);
        }
        $('.clickable-bg').on('click', function () {
            $(this).remove();
            if (elementToClose) {
                elementToClose.removeClass('opened');
                $('body').removeClass('modal-opened').css('padding-right', 0);
            }
        })
    }

    $('.js-open-modal').on('click', function (e) {
        e.preventDefault();
        let modalToOpen = $(this).attr('data-modal');
        $(`#${modalToOpen}`).addClass('opened').fadeOut(1).fadeIn(400);
        $('body').addClass('modal-opened').css('padding-right', scrollWidth);
        renderClickableBG(true, $(`#${modalToOpen}`), $(`#${modalToOpen}`))
    })

    $('.js-close-modal').on('click', function () {
        let modalToClose = $(this).parents('.modal');
        modalToClose.removeClass('opened');
        $('body').removeClass('modal-opened').css('padding-right', 0);
        modalToClose.find(('.clickable-bg')).remove();
    })

    /* END Modals */

    /* Mobile Menu */
    $('.js-open-mob-menu').on('click', function () {
        $('.mobile-menu').addClass('opened');
        renderClickableBG(true, $('.mobile-menu'));
    });

    $('.js-close-mobile-menu').on('click', function () {
        $('.clickable-bg').remove();
        $('.mobile-menu').removeClass('opened');
        $('body').removeClass('modal-opened').css('padding-right', 0)
    });

    $('.js-open-dropdown').on('click', function () {
        $(this).find($('.mobile-menu__nav-dropdown')).addClass('active');
        $('.mobile-menu__top').addClass('show-back');
        $('.mobile-menu').addClass('dd-opened');
    })

    $('.js-mob-back').on('click', function () {
        $('.mobile-menu__nav-dropdown.active').removeClass('active');
        $('.mobile-menu__top').removeClass('show-back');
        $('.mobile-menu').removeClass('dd-opened');
    })

    $('.js-filter-dropdown').on('click', function () {
        $(this).toggleClass('active');
        $(this).parent().find('.js-filter-dropdown-box').slideToggle('300');
    })
    /* END Mobile Menu */

    /* Sliders */

    const mainSlider = new Swiper('.js-main-slider', {
        loop: true,
        lazy: true,
        navigation: {
            nextEl: '.slider-button--next',
            prevEl: '.slider-button--prev',
        },
        pagination: {
            el: '.slider-pagination',
            clickable: true,
        }
    });

    let sideSlidesTransparency = (slider) => {
        let visibleSlides = slider.find('.swiper-slide-visible');
        slider.find('.swiper-slide').removeClass('semi-transparent')
        visibleSlides.eq(0).addClass('semi-transparent')
        visibleSlides.eq(0).prev().addClass('semi-transparent')
        visibleSlides.eq(-1).addClass('semi-transparent')
        visibleSlides.eq(-1).next().addClass('semi-transparent')
    }

    let initProductSlider = (element) => {
        const ProductSlider = new Swiper(element, {
            loop: true,
            lazy: true,
            centeredSlides: false,
            slidesPerView: 2,
            spaceBetween: 20,
            navigation: {
                nextEl: '.slider-button--next',
                prevEl: '.slider-button--prev',
            },
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            watchOverflow: true,
            breakpoints: {
                767: {
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                }
            },
            on: {
                init: function () {
                    if (screen.width > 991) {
                        let visibleSlides = $(element).find('.swiper-slide-visible');
                        visibleSlides.eq(0).addClass('semi-transparent')
                        visibleSlides.eq(0).prev().addClass('semi-transparent')
                        visibleSlides.eq(-1).addClass('semi-transparent')
                        visibleSlides.eq(-1).next().addClass('semi-transparent')
                    }
                },
            }
        });

        if (screen.width > 991) {
            ProductSlider.on('slideChange', function () {
                sideSlidesTransparency($(element));
            });
            ProductSlider.on('touchEnd', function () {
                sideSlidesTransparency($(element));
            });

        }
    }

    let productSliders = ['.js-best-sell-slider', '.js-hit-slider', '.js-category-slider', '.js-you-will-like-slider', '.js-buy-also-slider']

    productSliders.forEach((element) => {
        initProductSlider(element);
    })

    $('.js-inner-slider').each(function () {
        const innerProductSlider = new Swiper($(this)[0], {
            lazy: true,
            pagination: {
                el: '.slider-pagination',
                clickable: true,
            }
        });
    })

    $('.js-cart-slider').each(function () {
        const cartSlider = new Swiper($(this)[0], {
            lazy: true,
            spaceBetween: 0,
            navigation: {
                nextEl: '.slider-button--next',
                prevEl: '.slider-button--prev',
            },
            breakpoints: {
                767: {
                    spaceBetween: 15,
                }
            },
        });
    })

    const productCardThumbSlider = new Swiper('.js-product-thumb-slider', {
        lazy: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        spaceBetween: 10,
        breakpoints: {
            767: {
                slidesPerView: 5,
                direction: 'vertical',
            }
        },
    });

    const productCardMainSlider = new Swiper('.js-product-main-slider', {
        lazy: true,
        slidesPerView: 1,
        thumbs: {
            swiper: productCardThumbSlider,
        },
    });

    const testimonialsSlider = new Swiper('.js-testimonials-slider', {
        spaceBetween: 10,
        lazy: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.slider-button--next',
            prevEl: '.slider-button--prev',
        },
        breakpoints: {
            600: {
                spaceBetween: 30,
            },
            767: {
                spaceBetween: 140,
            }
        },
    });

    const newsSlider = new Swiper('.js-news-slider', {
        spaceBetween: 60,
        lazy: true,
        slidesPerView: '1',
        navigation: {
            nextEl: '.slider-button--next',
            prevEl: '.slider-button--prev',
        },
        breakpoints: {
            1199: {
                slidesPerView: '2',
            },
        },
    });


    /* END Sliders */

    /* Inputs */

    const phoneInputs = document.querySelectorAll("input[type='tel']");
    const maskOptions = {
        mask: '+{0}(000)000-00-00'
    };
    phoneInputs.forEach((element) => {
        const mask = IMask(element, maskOptions);
    })

    let removeFilterItem = (target, text) => {
        if (screen.width <= 600) {
            if (target.hasClass('product-filter__item--type')) {
                let filter = $('.mobile-filters__dropdown--type').find('.form-group.choosen');
                filter.removeClass('choosen');
                filter.find('.custom-radio').prop('checked', false);
            }

            $('.mobile-filters__dropdown').find('.custom-checkbox__label').each(function () {
                if ($(this).text() === text) {
                    $(this).parents('.form-group').removeClass('checked');
                    $(this).parents('.form-group').find('.js-custom-cb').removeClass('checked');
                    $(this).parents('.form-group').find('.custom-radio').prop('checked', false);
                }
            })
        }
        target.remove();
    }

    let addFilter = (elementText, parent, additionalClass='') => {

        let filterItem = $('<div/>', {
            "class": `product-filter__item js-filter-item ${additionalClass}`,
        })
        filterItem.html(`<span>${elementText}</span>
                <div class="product-filter__item-bg product-filter__item-bg--red">
                    <picture>
                        <source data-srcset="img/prod-filter-bg-red.webp" type="image/webp" srcset="img/prod-filter-bg-red.webp">
                        <img class=" lazyloaded" data-src="img/prod-filter-bg-red.png" alt="image" width="107" height="31" src="img/prod-filter-bg-red.png">
                    </picture>
                </div>`)
        filterItem.on('click', function () {
            removeFilterItem(filterItem, elementText)
        })
        parent.append(filterItem);
    }

    if (screen.width <= 600) {
        $('.product-filter__sortby-title').addClass('js-open-popup');
    }

    let closePopup = (popup) => {
        popup.removeClass('opened');
        $('.clickable-bg').remove();
    }

    $('.js-radio').on('click',function () {
        $(this).parent().find('.js-radio').removeClass('choosen');
        $(this).addClass('choosen');
        $(this).find('.custom-radio').prop('checked', true);
    });

    $('.js-filter-radio').on('click',function () {
        $(this).parent().find('.js-filter-radio').removeClass('choosen');
        $(this).addClass('choosen');
        $(this).find('.custom-radio').prop('checked', true);
        if (screen.width > 600) {
            $(this).parents('.product-filter__items-box').find('.js-filter-item').remove();
            addFilter($(this).find('.custom-radio__label').text(), $(this).parents('.product-filter__items-box'));
            closePopup($(this).parents('.js-popup'));
        }
        else {
            $('.mobile-filters__chosen-filters').find('.js-filter-item.product-filter__item--type').remove();
            addFilter($(this).find('.custom-radio__label').text(), $('.mobile-filters__chosen-filters'), 'product-filter__item--type');
        }
    })

    $('.js-checkbox').on('click',function () {
        $(this).toggleClass('checked').find('.custom-cb-badge').toggleClass('checked');
        $(this).find('.custom-checkbox').prop('checked', !isChecked);
    });

    $('.js-filter-checkbox').on('click',function () {
        $(this).toggleClass('checked').find('.custom-cb-badge').toggleClass('checked');
        let isChecked = $(this).find('.custom-checkbox').prop('checked');
        let isAllowed = true;
        $(this).find('.custom-checkbox').prop('checked', !isChecked);
        if (screen.width <= 600) {
            let filterText = $(this).find('.custom-checkbox__label').text();
            $('.mobile-filters__chosen-filters .product-filter__item span').each(function () {
                if ($(this).text() === filterText) {
                    $(this).parents('.js-filter-item').remove();
                    isAllowed = false;
                }
            });
            if (isAllowed) {
                addFilter(filterText, $('.mobile-filters__chosen-filters'));
            }
        }
    });

    $('.js-popup-apply').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.product-filter__items-box').find('.js-filter-item').remove();
        $(this).parents('.js-popup').find('.js-filter-checkbox').each(function () {
            if ($(this).hasClass('checked')) {
                addFilter($(this).find('.custom-checkbox__label').text(), $(this).parents('.product-filter__items-box'));
            }
        });
        closePopup($(this).parents('.js-popup'));
    });

    $('.js-sort-item').on('click', function () {
        $(this).parents('.product-filter__sortby').find('.js-sort-text').text($(this).text())
        closePopup($(this).parents('.js-popup'));
    });

    $('.js-clear-filter').on('click', function () {
        $('.product-filter__item').remove();
        $('.form-group').removeClass('checked');
        $('.js-custom-cb').removeClass('checked');
        $('.js-radio').removeClass('choosen');
        $('.product-filter__item input').prop('checked', false);
    });

    $('.js-filter-item').on('click', function () {
        removeFilterItem($(this), $(this).find('span').text())
    })

    $('.js-custom-select .custom-select-option').on('click', function () {
        let optionValue = $(this).text();
        let customSelect = $(this).parents('.js-custom-select');
        customSelect.find('.custom-select__value').text(optionValue);
        setTimeout(function () {
            $('.clickable-bg').remove();
        }, 50);
        customSelect.find('option').each(function () {
            if ($(this).text() === optionValue) {
                customSelect.find('select').val(optionValue).change();
            }
        })
    })

    $('.js-qnty-minus').on('click', function () {
        let customNum = $(this).siblings('.js-qnty-num');
        if (customNum.val() >= 2 ) {
            customNum.val(Number(customNum.val()) - 1);
        }
    })

    $('.js-qnty-plus').on('click', function () {
        let customNum = $(this).siblings('.js-qnty-num')
        customNum.val(Number(customNum.val()) + 1);
    })

    /* END  Inputs */

    /*------ Datepicker -------*/
    if ($('.datepicker-wrapper').length > 0) {

        $('#account-birth-date').datepicker({
            autoClose: true,
        })

    }
    /*------ END Datepicker -------*/



    /*--Maps--*/
    function loadScript(url, callback){

        var script = document.createElement("script");

        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function(){
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    //Айдишники и параметры карт для загрузки
    let mapsToLoad = [
        {
            id: 'modal-map-container',
            mapWithForm: true,
        },
        {
            id: 'page-map-container',
            mapWithForm: false,
        },
    ]

    function init(){
        // Создание карт.
        function prepareMap (mapId, mapWithForm) {

            let mapJsonPath = $('.js-shops').attr('data-json');
            let myGeoObjects = [];
            let objectsCounter = 0;
            $.getJSON(mapJsonPath, function(data) {
                data.forEach(city => {
                    let cityElem = document.createElement('div');
                    let cityCenterCoords = [0, 0];
                    cityElem.className = `shops__city ${(objectsCounter === 0 ? "opened" : "")} js-slide-down`;
                    cityElem.innerText = `${city.city} ${city.shops.length}`;

                    cityElem.addEventListener('click', function () {
                        $(this).next('.js-slide-down-wrapper').slideToggle();
                        $(this).toggleClass('opened');
                    })

                    let shopsWrapper = document.createElement('div');
                    shopsWrapper.className = `shops__cities-box ${(objectsCounter === 0 ? "opened" : "")} js-slide-down-wrapper`;

                    city.shops.forEach(shop => {
                        let shopElem = null;
                        if (mapWithForm) {
                            shopElem = document.createElement('div');
                            shopElem.className = "form-group form-group--radio js-radio";
                            shopElem.innerHTML = `
                            <label class="custom-radio__label" for="modal-radio[${objectsCounter}]">${shop.name}</label>
                            <input class="custom-radio" type="radio" name="form-group-radio" id="modal-radio[${objectsCounter}]">`
                            shopElem.addEventListener('click', function () {
                                this.closest('.shops__list').querySelectorAll('.js-radio').forEach(function (item) {
                                    item.classList.remove('choosen');
                                })
                                this.classList.add('choosen');
                                this.querySelector('.custom-radio').checked = true;
                            })
                            shopsWrapper.append(shopElem);
                        }
                        else {
                            shopElem = document.createElement('div');
                            shopElem.className = "shops__item";
                            shopElem.innerHTML = `
                                <div class="shops__item-inner shops__item-address">
                                    <svg class="icon icon-marker">
                                        <use xlink:href="img/svg/sprite.svg#marker"></use>
                                    </svg>
                                    ${shop.address}
                                </div>
                                <div class="shops__item-inner shops__item-worktime">
                                    <svg class="icon icon-marker">
                                        <use xlink:href="img/svg/sprite.svg#clock"></use>
                                    </svg>
                                    Режим работы ${shop.worktime}
                                </div>
                                <a href="tel:${shop.phone}" class=" shops__item-inner shops__item-phone">
                                    <svg class="icon icon-marker">
                                        <use xlink:href="img/svg/sprite.svg#phone2"></use>
                                    </svg>
                                    ${shop.phone}
                                </a>`
                            shopsWrapper.append(shopElem);
                        }

                        objectsCounter++;
                        let balloonInner =
                            `<div class="custom-balloon">
                                    <div class="custom-balloon__bg"></div>
                                    <div class="custom-balloon__text"><b>${shop.name}</b></div>
                                    <div class="custom-balloon__text">${shop.address}</div>
                                    <div class="custom-balloon__text">Режим работы ${shop.worktime}</div>
                             </div>`

                        let placemark = new ymaps.Placemark(shop.coords, {
                                balloonContent: balloonInner,
                            },
                            {
                                hideIconOnBalloonOpen: false,
                                balloonOffset: [4, -37],
                                iconLayout: 'default#image',
                                iconImageHref: 'img/svg/marker.svg',
                            });


                        myGeoObjects.push(placemark)

                        shopElem.addEventListener('click', function () {
                            myMap.setCenter(shop.coords, 17);
                            if (!placemark.balloon.isOpen()) {
                                placemark.balloon.open();
                            } else {
                                placemark.balloon.close();
                            }
                            if (screen.width < 991) {
                                let elementWhereToScroll;
                                if ($('#modal-map').length > 0) {
                                    elementWhereToScroll = '.modal__box';
                                }
                                else {
                                    elementWhereToScroll = [document.documentElement, document.body]
                                }
                                $(elementWhereToScroll).animate({
                                    scrollTop: $('.shops__map-container').offset().top - 50
                                }, 700);
                            }
                        })
                        cityCenterCoords[0] +=Number(shop.coords[0]);
                        cityCenterCoords[1] +=Number(shop.coords[1]);
                    })
                    let citiesNum = city.shops.length;
                    let cityCenter = [cityCenterCoords[0] / citiesNum, cityCenterCoords[1] / citiesNum];
                    document.querySelector('.shops__list').append(cityElem)
                    document.querySelector('.shops__list').append(shopsWrapper)
                    let citiesBtn = document.createElement('div');
                    citiesBtn.className = `common-btn-simple`;
                    citiesBtn.innerText = `Все магазины г. ${city.city}`
                    citiesBtn.addEventListener('click', function () {
                        myMap.setCenter(cityCenter, 13);
                    })
                    shopsWrapper.append(citiesBtn)
                })


                var myMap = new ymaps.Map(mapId, {
                    center: data[0].shops[0].coords,
                    zoom: 13,
                    controls: ['zoomControl'],
                });

                myGeoObjects.forEach(item => {
                    myMap.geoObjects.add(item);
                })
                myMap.behaviors.disable('scrollZoom');
            });

        }

        mapsToLoad.forEach(item => {
            if ($('#' + item.id).length > 0) {
                prepareMap(item.id, item.mapWithForm)
            }
        })
    }


    let check_if_load = false;
    const checkLoadMap = () => {
        if (!check_if_load) {
            check_if_load = true;
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=04709a29-6f21-442a-9cb5-272b39900456&lang=ru_RU", function(){
                ymaps.ready(init);
            });
        }
    }

    if ($('.map-container').length > 0) {
        checkLoadMap();
    }


    /*--END Maps--*/


    /* Misc */
    $('.js-toggle-active').on('click', function () {
        $(this).toggleClass('active');
    })

    let moveElement = (element, target, screenSize, append=true) => {
        if (screen.width < screenSize) {
            if (append) {
                $(element).appendTo(target);
            }
            else {
                $(element).prependTo(target);
            }
        }
    }

    moveElement('.optics-block__title', '.optics-block__inner', 768, false);

    moveElement('.optics-block__btn', '.optics-block .container', 768);

    moveElement('.product-filter__sortby', '.product-filter__mobile-wrapper', 991 );

    moveElement('.product-filter__sortby .product-filter__popup', '.product-filter__sortby', 600 );

    moveElement('.product-filter__popup--type .form-group', '.mobile-filters__dropdown--type', 600 );

    moveElement('.product-filter__popup--material .form-group', '.mobile-filters__dropdown--material', 600 );

    moveElement('.product-filter__popup--color .form-group', '.mobile-filters__dropdown--color', 600 );

    moveElement('.product-filter__popup--price .form-group', '.mobile-filters__dropdown--price', 600 );



    $('.js-open-popup').on('click', function () {
        $('.js-open-popup').removeClass('opened');
        let popup = $(this).parent().find('.js-popup');
        popup.toggleClass('opened');
        renderClickableBG(false, popup, $('body'), false);
    })


    if (screen.width <= 600) {
        $('.js-footer-dropdown').on('click', function () {
            let element = $(this).next('.footer__nav--mobile-folded')
            $(this).next('.footer__nav--mobile-folded').slideToggle({
                start: function () {
                    $(this).css('display', 'block')
                }
            }).toggleClass('opened');
            element.css('display', 'block');
            $(this).toggleClass('opened');
        })
    }

    $('.js-tab-toggle').on('click', function () {
        $('.js-tab-toggle').removeClass('active');
        $(this).addClass('active');
        $('.js-tab').removeClass('active');
        $('#' + $(this).attr('data-tabs')).addClass('active');
    });

    let colorStars = (element) => {
        let starsScore = element.attr('data-rating');
        let numberOfFilledStars = Math.trunc(starsScore);
        let percentOfLastStar = (starsScore - numberOfFilledStars) * 100;
        element.find('.star').each(function (index) {
            $(this).find('.star__icon--active').css('width', '0')
            if (index < numberOfFilledStars) {
                $(this).find('.star__icon--active').css('width', '100%')
            } else if (index == numberOfFilledStars) {
                $(this).find('.star__icon--active').css('width', `${percentOfLastStar}%`)
            }
        })
    }

    $('.js-stars').each(function () {
        colorStars($(this));
    });

    $('.js-to-cart').on('click', function () {
        $(this).addClass('pushed').attr('href', '#').off();
        $(this).find('span').text('Перейти в корзину');
    });

    $('.js-clickable-star').on('click', function () {
        $(this).parents('.js-stars').attr('data-rating', $(this).index() + 1);
        colorStars($(this).parents('.js-stars'));
    });

    $('.js-cart-delete').on('click', function () {
        let cartItem = $(this).parents('.cart-items__item');
        cartItem.toggleClass('pre-deleted');
        $(this).find('.cart-items__item-delete-icon').toggleClass('hidden');
        $(this).find('span').text(cartItem.hasClass('pre-deleted') ? 'Вернуть' : 'Удалить')

    });

    $('.js-slide-down').on('click', function () {
        $(this).next('.js-slide-down-wrapper').slideToggle()
        $(this).toggleClass('opened');
    });

    $('.js-scroll-to').on('click', function () {
        const elementToScroll = '#' + $(this).attr('data-scroll');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(elementToScroll).offset().top
        }, 1000);
    });

    /* END Misc */

});


