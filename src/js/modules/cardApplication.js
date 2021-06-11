import $ from "jquery";
import Inputmask from "inputmask";

const cardApplication = () => {
    const body = $('body');
    const pageNav = $('.page-nav');
    const classNavOpen = 'page-nav--open';
    const pageHeader = $('.page-header');
    const pageMain = $('.page-main');
    const pageFooter = $('.page-footer');
    const classCardApplicationOpen = 'card-application--open';
    const btnsOpenFormArr = [$('.card__btn'), $('.issue-card__btn')];

    const changeTabIndex = (value, ...elements) => {
        $.each(elements, (i, el) => {
            $(el).find('a, button, input').attr('tabindex', `${value}`);
        });
    }

    const closeForm = () => {
        if (event.keyCode === 27) {
            changeTabIndex(-1, $('.card-application'));
            pageNav.hasClass(classNavOpen) ? changeTabIndex(0, pageNav) : '';
            changeTabIndex(0, pageHeader, pageMain, pageFooter);
            $('.card-application__form-item select').next().toggleClass('card-application__form-item-field--select-open');
            $('.card-application__form-item-field--select-list').removeClass('card-application__form-item-field--select-list-open');
            $('.card-application__form-item select').next().find('svg').parent().removeClass('card-application__form-item-icon--dropdown-open');
            $('.card-application').fadeOut();
            $('body').overlayScrollbars({
                className : "os-theme-light",
                overflowBehavior: {
                    x: 'scroll',
                    y: 'scroll'
                }
            });
            $(document).off('keydown');
        };
    };

    $.each(btnsOpenFormArr, (i, el) => {
        el.on('click', () => {
            body.addClass(classCardApplicationOpen);
            if ($('.card-application').length <= 0) {
                $.ajax({
                    type: 'GET',
                    url: 'views/components/cardApplication.html',
                    success: (data) => {
                        body.append(data);
                        createForm();
                        changeTabIndex(0, $('.card-application'));
                        changeTabIndex(-1, pageNav, pageHeader, pageMain, pageFooter);
                        $('.card-application').fadeIn();
                        $(document).on('keydown', () => {
                            closeForm();
                        });
                    }
                });
            } else {
                changeTabIndex(0, $('.card-application'));
                changeTabIndex(-1, pageNav, pageHeader, pageMain, pageFooter);
                body.overlayScrollbars({
                    className : "os-theme-light",
                    overflowBehavior: {
                        x: 'hidden',
                        y: 'hidden'
                    }
                });
                $('.card-application').fadeIn();
                $(document).on('keydown', () => {
                    closeForm();
                });
            };
        });
    });

    const createForm = () => {
        const cardApplicationSection = $('.card-application');
        const btnCloseCardApplication = $('.card-application__btn-close');
        const form = $('#form-order');
        const fieldForm = $('.card-application__form-item-field');
        const btnForm = $('.card-application__form-btn');
        const selectFieldForm = $('.card-application__form-item select');
        const classBtnDisabledForm = 'card-application__form-btn--disabled';
        const classFocusField = 'card-application__form-item-field--focus';
        const regExpName = /^[а-яА-Яa-zA-Z-\s]+$/;
        const regExpEmail = /^[a-zA-Z-_]{1}[a-zA-Z0-9-_.]+@+[a-zA-Z0-9-_.]{1,}$/;
        const regExpPhone = /^[0-9+\s]{1,16}$/g;
        const classErrorElem = '.card-application__form-item-error';
        const classIconErrorElem = '.card-application__form-item-icon--error';
        const classIconSuccessElem = '.card-application__form-item-icon--success';
        const classErrorField = 'card-application__form-item-field--error';
        const phoneFieldElem = '.card-application__form-item-field--phone';
        const iconErrorElem = `
            <div class="card-application__form-item-icon card-application__form-item-icon--error">
                <svg>
                    <use xlink:href="img/sprites/sprite.svg#icon-error"></use>
                </svg>
            </div>
        `;
        const errorElem = `
            <div class="card-application__form-item-error">
                Некорректно введены данные
            </div>
        `;
        const iconSuccessElem = `
            <div class="card-application__form-item-icon card-application__form-item-icon--success">
                <svg>
                    <use xlink:href="img/sprites/sprite.svg#icon-success"></use>
                </svg>
            </div>
        `;
        const iconDropDownElem = `
            <div class="card-application__form-item-icon card-application__form-item-icon--dropdown">
                <svg>
                    <use xlink:href="img/sprites/sprite.svg#icon-dropdown"></use>
                </svg>
            </div>
        `;

        //Скрыть форму
        btnCloseCardApplication.on('click', (e) => {
            pageNav.hasClass(classNavOpen) ? changeTabIndex(0, pageNav) : '';
            changeTabIndex(0, pageHeader, pageMain, pageFooter);
            changeTabIndex(-1, cardApplicationSection);
            $('body').removeClass(classCardApplicationOpen);
            cardApplicationSection.fadeOut();
            $('.card-application__form-item select').next().toggleClass('card-application__form-item-field--select-open');
            $('.card-application__form-item-field--select-list').removeClass('card-application__form-item-field--select-list-open');
            $('.card-application__form-item select').next().find('svg').parent().removeClass('card-application__form-item-icon--dropdown-open');

            $(document).off('keydown');

            $('body').overlayScrollbars({
                className : "os-theme-light",
                overflowBehavior: {
                    x: 'scroll',
                    y: 'scroll'
                }
            });
        });

        //Маска на поле формы
        Inputmask({
            mask: "+7 999 999 99 99",
            showMaskOnHover: false,
        }).mask(phoneFieldElem);

        //Кастомизация поля формы select
        const changeSelectFieldForm = (selectFieldForm, classSelectFieldForm, classListSelectFieldForm, classItemSelectFieldForm, classCurrentItemSelectFieldForm, classSelectOpenFieldForm, classListOpenSelectFieldForm, iconDropDownElem, classIconDropdownOpenFieldForm) => {
            selectFieldForm.css('display', 'none');

            selectFieldForm.after(`
                <div class="${classSelectFieldForm.join(' ')}" tabindex="0">
                    <div class="${classCurrentItemSelectFieldForm}"></div>
                    <div class="${classListSelectFieldForm}"></div>
                    ${iconDropDownElem}
                </div>
            `);

            selectFieldForm.children().each((i, elem) => {
                selectFieldForm.next().find(`.${classListSelectFieldForm}`).append(`
                    <div class="${classItemSelectFieldForm}" data-value="${$(elem).attr('value')}">
                        ${$(elem).text()}
                    </div>
                `);
            });

            selectFieldForm.next().children().first().text(() => {
                return selectFieldForm.next().find(`.${classListSelectFieldForm}`).children().first().text();
            });

            const actionEventSelectFieldForm = () => {
                selectFieldForm.next().toggleClass(classSelectOpenFieldForm);
                selectFieldForm.next().find('svg').parent().toggleClass(classIconDropdownOpenFieldForm);
                $(`.${classListSelectFieldForm}`).toggleClass(classListOpenSelectFieldForm);
            };

            selectFieldForm.next().on('click', () => {
                actionEventSelectFieldForm();
            });

            selectFieldForm.next().on('keydown', (e) => {
                if (e.keyCode === 13) {
                    actionEventSelectFieldForm();

                    if (selectFieldForm.next().hasClass(classSelectOpenFieldForm)) {
                        changeTabIndex(-1, cardApplicationSection);
                        selectFieldForm.next().attr('tabindex', '-1');
                        selectFieldForm.next().find(`.${classItemSelectFieldForm}`).each((i, el) => {
                            $(el).attr('tabindex', '0');
                        });
                    } else {
                        changeTabIndex(0, cardApplicationSection);
                        selectFieldForm.next().attr('tabindex', '0');
                        selectFieldForm.next().find(`.${classItemSelectFieldForm}`).each((i, el) => {
                            $(el).attr('tabindex', '-1');
                        });
                    };
                };
            });

            selectFieldForm.next().find(`.${classItemSelectFieldForm}`).each((i, elem) => {
                $(elem).on('click', () => {
                    selectFieldForm.next().find(`.${classCurrentItemSelectFieldForm}`).text($(elem).text());
                    selectFieldForm.find(`option[value="${$(elem).data('value')}"]`).prop('selected', true);
                });

                $(elem).on('keydown', (e) => {
                    if (e.keyCode === 13) {
                        selectFieldForm.next().find(`.${classCurrentItemSelectFieldForm}`).text($(elem).text());
                        selectFieldForm.find(`option[value="${$(elem).data('value')}"]`).prop('selected', true);
                    };
                });
            });

        };

        changeSelectFieldForm(
            selectFieldForm,
            ['card-application__form-item-field', 'card-application__form-item-field--select'],
            'card-application__form-item-field--select-list',
            'card-application__form-item-field--select-item',
            'card-application__form-item-field--select-current',
            'card-application__form-item-field--select-open',
            'card-application__form-item-field--select-list-open',
            iconDropDownElem,
            'card-application__form-item-icon--dropdown-open'
        );

        //Сделать кнопку отправки формы неактивной
        btnForm.prop('disabled', true);
        btnForm.addClass(classBtnDisabledForm);

        const checkField = (elem, regExp) => {
            if (!regExp.test(elem.val())) {
                resetFieldForm(elem);
                elem.parent().append(errorElem);
                elem.parent().append(iconErrorElem);
                elem.addClass(classErrorField);
                elem.data('valid', 'invalid');
            } else {
                resetFieldForm(elem);
                elem.removeClass(classErrorField);
                elem.parent().append(iconSuccessElem);
                elem.data('valid', 'valid');
            };
        };

        const resetFieldForm = (elem) => {
            elem.parent().find(classErrorElem).remove();
            elem.parent().find(classIconErrorElem).remove();
            elem.parent().find(classIconSuccessElem).remove();
        };

        fieldForm.each((i, el) => {
            if ($(el).attr('type') === 'checkbox') {
                $(el).on('click', () => {
                    if ($(el).prop('checked')) {
                        $(el).data('valid', 'valid');
                    } else {
                        $(el).data('valid', 'invalid');
                    }
                });
            };

            if ($(el).attr('type') === 'text' || $(el).attr('type') === 'email') {
                $(el).on('focus', () => {
                    $(el).addClass(classFocusField);
                });

                $(el).on('blur', () => {
                    $(el).val() === '' ? $(el).removeClass(classFocusField) : $(el).val($.trim($(el).val()));
                });

                $(el).on('input', () => {
                    if ( $(el).val() !== '') {
                        switch ($(el).attr('name')) {
                            case 'name':
                                checkField($(el), regExpName);
                                break;
                            case 'email':
                                checkField($(el), regExpEmail);
                                break;
                            case 'phone':
                                checkField($(el), regExpPhone);
                                break;
                        }
                    } else {
                        $(el).removeClass(classErrorField);
                        resetFieldForm($(el));
                        $(el).data('valid', 'invalid');
                    };
                });

            };

            if ($(el).attr('type')) {
                $(el).data('valid', 'invalid');

                $(el).on('input', () => {
                    if (fieldForm.filter('[name="name"]').data('valid') === 'valid' && fieldForm.filter('[name="email"]').data('valid') === 'valid' && fieldForm.filter('[name="phone"]').data('valid') === 'valid' && fieldForm.filter('#checkbox').data('valid') === 'valid') {
                        btnForm.prop('disabled', false);
                        btnForm.removeClass(classBtnDisabledForm);
                    } else {
                        btnForm.prop('disabled', true);
                        btnForm.addClass(classBtnDisabledForm);
                    };
                });
            };
        });

        const createMessageForm = (icon, title, text) => {
            cardApplicationSection.append(`
                <div class="card-application__form-message">
                    <div class="card-application__form-message-wrapper">
                        <div class="card-application__form-message-icon">
                            <svg>
                                <use xlink:href="img/sprites/sprite.svg#${icon}"></use>
                            </svg>        
                        </div>
                        <h2 class="card-application__form-message-title">${title}</h2>
                        <p class="card-application__form-message-text">${text}</p>
                    </div>
                </div>
            `);
        }

        form.on('submit', (e) => {
            e.preventDefault();

            const data = new FormData(form[0]);
            const action = form.attr('action');

            cardApplicationSection.append(`
                <div class="preloader" style="top: 0;">
                    <img src="img/sprites/intermediate-svg/spinner.svg" alt="">
                </div>
            `);

            $.ajax({
                type: 'POST',
                processData: false,
                contentType: false,
                data: data,
                url: action,
                timeout: 20000,
                success: () => {
                    $('.preloader').remove();
                    createMessageForm(
                        'icon-form-success',
                        'Ваша заявка принята',
                        'В ближайшее время с вами свяжется наш менеджер'
                    );
                    form[0].reset();
                    fieldForm.each((i, el) => {
                        $(el).removeClass(classFocusField);
                        $(el).removeClass(classErrorField);
                        resetFieldForm($(el));
                        $(el).data('valid', 'invalid');
                    });
                    btnForm.prop('disabled', true);
                    btnForm.addClass(classBtnDisabledForm);
                    setTimeout(() => {
                        body.removeClass(classCardApplicationOpen);
                        $('.card-application__form-message').remove();
                        cardApplicationSection.hide();
                        body.overlayScrollbars({
                            className : "os-theme-light",
                            overflowBehavior: {
                                x: 'scroll',
                                y: 'scroll'
                            }
                        });
                    }, 5000);
                },
                error: (jqXHR, textStatus) => {
                    console.log('Ошибка: ' + textStatus);
                    $('.preloader').remove();
                    createMessageForm(
                        'icon-error',
                        'Ошибка. Что-то пошло не так',
                        'Повторите попытку позже'
                    );
                    setTimeout(() => {
                        body.removeClass(classCardApplicationOpen);
                        $('.card-application__form-message').remove();
                        cardApplicationSection.hide();
                        body.overlayScrollbars({
                            className : "os-theme-light",
                            overflowBehavior: {
                                x: 'scroll',
                                y: 'scroll'
                            }
                        });
                    }, 5000);
                }
            });
        });

        $('.card-application__form-item-field--select-list').overlayScrollbars({
            className : "os-theme-light"
        });

        cardApplicationSection.overlayScrollbars({
            className : "os-theme-light",
        });

        $('body').overlayScrollbars({
            overflowBehavior: {
                x: 'hidden',
                y: 'hidden'
            }
        });
    };
};

export default cardApplication;