import $ from "jquery";

const preloader = () => {
    const preloader = $('.preloader');

    preloader.addClass('preloader--hide');
    setTimeout(() => {
        preloader.remove();
    }, 700);
}

export default preloader;