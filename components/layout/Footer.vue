<template>
    <footer>
        <div class="social-media">
            <div class="masters-project">
                <span class="project-name">
                    masters<br />
                    project
                </span>

                <div class="network telegram">
                    <a href="https://t.me/artschoolmasters">
                        <img class="img-link" src="@/assets/images/black-telegram.png" />
                    </a>
                </div>

                <div class="network vk">
                    <a href="https://vk.com/artschoolmaste">
                        <img class="img-link" src="@/assets/images/black-vk.png" />
                    </a>
                </div>

                <div class="masters-school text-link">
                    <a href="https://masters-project.ru/">
                        школа<br />
                        masters
                    </a>
                </div>

                <div class="masters-subscribe text-link">
                    <a href="https://masters-project.ru/subscriptions-promo/">
                        подписка<br />
                        masters
                    </a>
                </div>
            </div>

            <div class="masters-bookstore">
                <span class="project-name">
                    masters<br />
                    bookstore
                </span>

                <div class="network telegram">
                    <a href="https://t.me/mastersbookstore">
                        <img class="img-link" src="@/assets/images/red-telegram.png" />
                    </a>
                </div>

                <div class="network vk">
                    <a href="https://vk.com/mstrs_bookstore">
                        <img class="img-link" src="@/assets/images/red-vk.png" />
                    </a>
                </div>

                <div class="catalogue text-link">
                    <a href="https://www.masters-bookstore.ru/books">
                        книжный<br />
                        каталог
                    </a>
                </div>

                <div class="delivery text-link">
                    <a href="https://www.masters-bookstore.ru/delivery">
                        доставка<br />
                        и оплата
                    </a>
                </div>

                <div class="policy text-link">
                    <a href="https://www.masters-bookstore.ru/policy">
                        политика<br />
                        конфиденциальности
                    </a>
                </div>
            </div>
        </div>

        <div class="news"></div>
    </footer>
</template>

<style scoped lang="scss">
@mixin network-links {
    &.vk {
        margin-top: 8px;
        grid-area: vk;
    }

    &.telegram {
        margin-top: 8px;
        grid-area: telegram;
    }

    a {
        .img-link {
            width: 27px;
            height: 27px;

            @media(max-width: 980px) {
                width: 25px;
                height: 25px;
            }
        }
    }
}

@mixin project-name($color) {
    grid-area: project-name;
    font-size: 40px;
    line-height: 97%;
    color: $color;

    @media(max-width: 980px) {
        font-size: 25px;
    }
}

footer {
    margin-top: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;

    .social-media {
        max-width: 1206px;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .masters-project {
            display: grid;
            grid-template: 130px 40px / 155px 73px 38px 35px;
            grid-template-areas:
                'project-name . telegram vk'
                'masters-school masters-subscribe masters-subscribe .';

            @media(max-width: 980px) {
                grid-template: 88px 20px / 105px 33px 33px 30px;
                grid-template-areas:
                    'project-name . telegram vk'
                    'masters-school masters-subscribe masters-subscribe masters-subscribe';
            }

            .project-name {
                @include project-name($dark-font-color);
            }

            .network {
                @include network-links;
            }

            .text-link {

                @media(max-width: 980px) {
                    font-size: 13px;
                }

                &.masters-school {
                    grid-area: masters-school;
                }

                &.masters-subscribe {
                    grid-area: masters-subscribe;
                }

                a {
                    @include kill-link-decoration;
                }
            }
        }

        .masters-bookstore {
            display: grid;
            grid-template: 130px 40px / 164px 20px 149px 145px 40px 27px;
            grid-template-areas:
                'project-name project-name . . telegram vk'
                'catalogue delivery delivery policy . .';
            margin-left: 100px;
            padding-left: 100px;
            border-left: 1px $primary solid;

            .project-name {
                @include project-name($primary);
            }

            .network {
                @include network-links;
            }

            .text-link {

                @media(max-width: 980px) {
                    font-size: 13px;
                }

                &.catalogue {
                    grid-area: catalogue;
                }

                &.delivery {
                    grid-area: delivery;
                }

                &.policy {
                    grid-area: policy;
                }

                a {
                    @include kill-link-decoration;
                }
            }
        }
    }

    .news {
        width: 100%;
    }
}
</style>
