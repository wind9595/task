import $ from "jquery";

const cards = () => {
    const listTypeCard = $('.issue-card__type');


    const formatValue = (value) => {
        return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    class Card {
      constructor(name, type, costWithoutServices, costServices, miles, percents, img, link) {
          this.name = name;
          this.type = type;
          this.costWithoutServices = costWithoutServices;
          this.costServices = costServices;
          this.miles = miles;
          this.percents = percents;
          this.img = img;
          this.link = link;
      }

      get typeCard() {
          return this.type;
      }

      addTypeCard() {
          listTypeCard.append(`
                <li class="issue-card__type-item" data-type="${this.type}">
                    <button class="issue-card__type-btn" type="button">${this.name}</button>
               </li>
          `);
      }

      addCard() {
          const imgCardElem = $('.issue-card__img img');
          const costWithoutServicesElem = $('.issue-card__info-descr--without-services-value');
          const costServicesElem = $('.issue-card__info-descr--services-value');
          const milesElem = $('.issue-card__info-descr--miles-value');
          const percentsElem = $('.issue-card__info-descr--percents-value');
          const linkElem = $('.issue-card__info-link');

          imgCardElem.attr('src', this.img);
          costWithoutServicesElem.text(formatValue(this.costWithoutServices));
          costServicesElem.text(formatValue(this.costServices));
          milesElem.text(formatValue(this.miles));
          percentsElem.text(this.percents);
          linkElem.attr('href', this.link);
      }
    };

    let cards = [
        new Card(
            'Кредитная карта',
            'credit',
            6490,
            4990,
            1000,
            5,
            'img/card.png',
            '/creditCard/'
        ),
        new Card(
            'Дебетовая карта',
            'debit',
            12490,
            10490,
            800,
            10,
            'img/card.png',
            '/debitCard/'
        ),
    ];

    listTypeCard.empty();

    $.each(cards, (i, el) => {
        el.addTypeCard();
    });

    const itemsTypeCard = listTypeCard.children();
    const classActiveItemTypeCard = 'issue-card__type-item--active';
    const classActiveBtnTypeCard = 'issue-card__type-btn--active';

    cards[0].addCard();

    itemsTypeCard.each((i, el) => {
        $(el).find('.issue-card__type-btn').prop('disabled', false);

        $(el).on('click', () => {
            itemsTypeCard.each((i, el) => {
               $(el).removeClass(classActiveItemTypeCard);
               $(el).find('.issue-card__type-btn').removeClass(classActiveBtnTypeCard);
               $(el).find('.issue-card__type-btn').prop('disabled', false);
            });

            $(el).addClass(classActiveItemTypeCard);
            $(el).find('.issue-card__type-btn').addClass(classActiveBtnTypeCard);
            $(el).find('.issue-card__type-btn').prop('disabled', true);

            const typeDataEl = $(el).data('type');
            let arrDataCard = [];

            $.each(cards, (i, el) => {
                arrDataCard.push(el.type);
            });

            $.each(arrDataCard, (i, el) => {
                if (el === typeDataEl) {
                    cards[i].addCard();
                }
            });
        });
    });

    itemsTypeCard.first().addClass(classActiveItemTypeCard);
    itemsTypeCard.first().find('.issue-card__type-btn').addClass(classActiveBtnTypeCard);
    itemsTypeCard.first().find('.issue-card__type-btn').prop('disabled', true);
};

export default cards;