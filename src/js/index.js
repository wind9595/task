import $ from "jquery";
import preloader from "./modules/preloader";
import nav from "./modules/nav";
import cards from "./modules/cards";
import cardApplication from "./modules/cardApplication";
import 'overlayscrollbars/js/jquery.overlayScrollbars.min';

$(window).on('load', () => {
    preloader();
    nav();
    cards();
    cardApplication();
    $('body').overlayScrollbars({
        className : "os-theme-light",
    });

});
