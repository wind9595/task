import $ from "jquery";

const nav = () => {
    const body = $('body');
    const btn = $('.page-header__btn');
    const pageNav = $('.page-nav');
    const pageHeader = $('.page-header');
    const pageMain = $('.page-main');
    const pageFooter = $('.page-footer');
    const classNavOpen = 'page-nav--open';
    const classNavOpenSection = 'page-nav--open-section';
    const iconNav = $('.page-header__icon use');
    const iconBurger = 'img/sprites/sprite.svg#icon-burger';
    const iconClose = 'img/sprites/sprite.svg#icon-close-nav';

    pageNav.find('a').attr('tabindex', '-1');

    if (pageNav.hasClass(classNavOpen)) {
        pageNav.find('a').attr('tabindex', '0');
        pageNav.find('a').first().filter(':visible').focus();
    } else {
        pageNav.find('a').attr('tabindex', '-1');
    };

    btn.on('click', () => {
        pageNav.toggleClass(classNavOpen);

        if (pageNav.hasClass(classNavOpen)) {
            pageNav.find('a').attr('tabindex', '0');
            pageNav.find('a').first().filter(':visible').focus();

            if ($(window).width() < 1200) {
                body.overlayScrollbars({
                    className : "os-theme-light",
                    overflowBehavior: {
                        x: 'hidden',
                        y: 'hidden'
                    }
                });
            };
        } else {
            pageNav.find('a').attr('tabindex', '-1');

            if ($(window).width() < 1200) {
                body.overlayScrollbars({
                    className : "os-theme-light",
                    overflowBehavior: {
                        x: 'scroll',
                        y: 'scroll'
                    }
                });
            }
        };

        if ($(window).width() >= 1200 && $(window).width() <= 1920) {
            pageHeader.toggleClass(classNavOpenSection);
            pageMain.toggleClass(classNavOpenSection);
            pageFooter.toggleClass(classNavOpenSection);
        };

        iconNav.attr('xlink:href') === iconBurger ? iconNav.attr('xlink:href', iconClose) : iconNav.attr('xlink:href', iconBurger);
    });
}

export default nav;