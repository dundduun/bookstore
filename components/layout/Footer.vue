<template>
    <footer>
        <div class="news">
            <div class="text">
                <h3>новости masters bookstore</h3>

                <span class="description">
                    Подпишитесь, чтобы первыми узнать о новых поступлениях,
                    скидках и интересных мероприятиях
                </span>
            </div>

            <form class="email-form">
                <input
                    type="email"
                    class="email-input"
                    placeholder="Your E-mail"
                />
                <button class="subscribe">подписаться</button>
            </form>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    background-color: $primary;

    .news {
        max-width: 1206px;
        flex-grow: 1;
        display: grid;
        grid-template: 60px / 330px 1fr;
        grid-template-areas: 'text form';
        justify-content: center;
        align-content: center;
        justify-items: center;
        padding: 33px;

        @media (max-width: 820px) {
            grid-template: 60px 163px / 1fr;
            grid-template-areas: 
                'text'
                'form';
        }

        @media (max-width: 326px) {
            grid-template: 95px 163px / 1fr;
            grid-template-areas: 
                'text'
                'form';
        }

        .text {
            width: 330px;
            grid-area: text;

            @media (max-width: 820px) {
                max-width: 90vw;
                min-height: fit-content;
                text-align: center;
            }

            h3 {
                font-weight: normal;
                font-size: 23px;
                color: white;
                margin: 0;
            }

            .description {
                font-size: 12px;
                color: white;
            }
        }

        .email-form {
            max-width: 670px;
            grid-area: form;
            display: grid;
            grid-template: 100% / 490px 180px;
            grid-template-areas: 'input button';
            justify-self: end;

            @media (max-width: 1070px) {
                grid-template: 100% / 1fr 180px;
                grid-template-areas: 'input button';
                justify-self: stretch;
                justify-content: stretch;
            }

            @media (max-width: 820px) {
                grid-template: 60px 70px / 82vw;
                grid-template-areas: 
                    'input'
                    'button';
                justify-self: center;
                margin: 33px 0 0 0;
            }


            .email-input {
                height: 60px;
                grid-area: input;
                padding: 0 20px;
                font-size: 16px;
                font-family: Gilroy;
                border: none;

                &:focus {
                    outline: none;
                }
            }

            .subscribe {
                height: 60px;
                grid-area: button;
                margin-left: 20px;
                font-size: 16px;
                font-family: Gilroy;
                color: white;
                background-color: black;
                border: none;

                &:hover {
                    cursor: pointer;
                }

                @media (max-width: 820px) {
                    margin: 10px 0 0 0;
                }
            }
        }
    }
}
</style>
