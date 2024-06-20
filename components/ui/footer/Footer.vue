<template>
    <footer>
        <div class="news">
            <div class="text">
                <h2 class="title">новости masters bookstore</h2>

                <span class="description">
                    Подпишитесь, чтобы первыми узнать о новых поступлениях,
                    скидках и интересных мероприятиях
                </span>
            </div>

            <form class="form">
                <input
                    class="input"
                    type="email"
                    placeholder="ваш e-mail"
                    required
                />
                <button class="subscribe-button">подписаться</button>
            </form>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

footer {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 65px;
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

            .title {
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

        .form {
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

            .input {
                height: 60px;
                grid-area: input;
                padding: 0 20px;
                font-size: 16px;
                font-family: $font-family;
                border: none;
                border-radius: 0;

                &:focus {
                    outline: none;
                }
            }

            .subscribe-button {
                height: 60px;
                grid-area: button;
                margin-left: 20px;
                font-size: 16px;
                @include hover-button(black, white);

                @media (max-width: 820px) {
                    margin: 10px 0 0 0;
                }
            }
        }
    }
}
</style>
<script setup lang="ts"></script>
