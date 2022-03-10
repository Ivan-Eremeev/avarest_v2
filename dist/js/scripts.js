$(document).ready(function () {

	// Брэйкпоинты js
	var	breakXl = 1400,
			breakLg = 1200,
			breakMd = 1025,
			breakSm = 769,
			breakXs = 500;

	// Запрет перехода по ссылкам с хэшем
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Мобильное меню
	function myMenu(menu) {
		if (menu.length) {
			menu.each(function () {
				var $this = $(this),
						menuBtn = $this.find('#menu-btn'),
						over = $this.find('#menu-over'),
						close = $this.find('#menu-close'),
						body = $('body'),
						scrollbarWidth;
				menuBtn.on('click', toggleOpenMenu);
				over.on('click', menuClose);
				close.on('click', menuClose);
				function menuOpen() { // Открывание меню
					body.addClass('lock').css('padding-right', scrollbarWidth);
					$this.addClass('open');
					menuBtn.addClass('is-active');
				}
				function menuClose() { // Закрывание меню
					body.removeClass('lock').css('padding-right', 0);
					$this.removeClass('open');
					menuBtn.removeClass('is-active');
				}
				function scrollbarWidthCalc() { // Вычисление ширины скролла
					var documentWidth = parseInt(document.documentElement.clientWidth),
							windowsWidth = parseInt(window.innerWidth);
							scrollbarWidth = windowsWidth - documentWidth;
				}
				function toggleOpenMenu() { // Открывание/закрывание меню
					if ($this.hasClass('open')) {
						menuClose();
					}else {
						menuOpen();
					}
				}
				scrollbarWidthCalc();
				$(window).resize(scrollbarWidthCalc);
			})
		};
	};
	myMenu($('.js-menu'));

	// Анимация увеличения значения числа
	function countNumber(block) {
		block.each(function () {
			var scrollTop = false,
				countNumberStatus = true,
				$this = $(this),
				blockPosition = $this.position().top,
				valUp = $this.data('val-up'),
				valTo = $this.data('val-to'),
				valDuration = $this.data('duration');
			$this.html(0);
      gofunc();
			$(window).scroll(function () {
        gofunc();
			});
      function gofunc() {
        scrollTop = $(window).scrollTop() + $(window).height();
        if (scrollTop > blockPosition && countNumberStatus) {
          $({ numberValue: valUp }).animate({ numberValue: valTo }, {
            duration: valDuration,
            easing: "swing",
            step: function (val) {
              $this.html(Math.ceil(val));
            }
          });
          countNumberStatus = false;
        }
      }
		});
	};
	countNumber($(".count-number"));

	// Смена положения блока при изменении ширины окна
	// function(блок, куда переместить, куда вернуть)
	function replace(block, to, from, mediaBreak) {
		function replaceToggle() {
			if ($(window).width() <= mediaBreak) { // условие на ширину окна
				block.appendTo(to); // Переместить блок
			} else {
				block.appendTo(from); // Вернуть блок обратно
			}
		}
		replaceToggle();
		$(window).resize(function () {
			replaceToggle();
		})

	}
	replace($('#contacts'), $('#contactsTo'), $('#contactsFrom'), breakSm);
	replace($('#descriptionBtn'), $('#descriptionBtnTo'), $('#descriptionBtnFrom'), breakSm);

	// Swiper
	const welcomeSlider = new Swiper('#welcomeSlider', {
		slidesPerView: 1,
		effect: 'fade',
		loop: true,
		navigation: {
			nextEl: '.welcome__arrow--next',
			prevEl: '.welcome__arrow--prev',
		},
	});
	
	const slidercardsSlider = new Swiper('#slidercardsSlider', {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		navigation: {
			nextEl: '.slidercards__arrow--next',
			prevEl: '.slidercards__arrow--prev',
		},
		breakpoints: {
			1050: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			500: {
				slidesPerView: 2,
				spaceBetween: 20
			},
		}
	});

	// Вставка видео с ютуб
	function youtubeInsert() {
		$('.js_youtube').one('click', function () {
			var $this = $(this),
				url = iframe_url = "https://www.youtube.com/embed/" + $(this).attr('id') + "?autoplay=1&autohide=1",
				active = false;
			var iframe = $('<iframe/>', {
				'frameborder': '0',
				'src': iframe_url,
				'allow': 'autoplay',
			});
			// Убираем "Посмотрите видео" при воспроизведении
			$('.videoOver').hide();
			// Заменяем миниатюру HTML5 плеером с YouTube
			if (!active) {
				$this.append(iframe);
				active = true;
			}
		})
	}
	youtubeInsert();

});