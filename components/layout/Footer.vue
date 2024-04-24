<template>
    <footer>
        <div class="links-container">
            <div class="masters-project">
                <span class="masters-project-name">
                    masters<br />
                    project
                </span>

                <a href="https://t.me/artschoolmasters">
                    <img
                        class="img-link"
                        src="@/assets/images/black-telegram.png"
                    />
                </a>

                <a href="https://vk.com/artschoolmaste">
                    <img class="img-link" src="@/assets/images/black-vk.png" />
                </a>

                <a href="https://masters-project.ru/">
                    школа<br />
                    masters
                </a>

                <a href="https://masters-project.ru/subscriptions-promo/">
                    подписка<br />
                    masters
                </a>
            </div>

            <div class="masters-bookstore"></div>
        </div>

        <div class="news"></div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    margin-top: 100px;
    border: 1px black solid;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;

    .links-container {
        max-width: 1206px;
        flex-grow: 1;
        display: flex;
        align-items: center;

        .masters-project {
            width: 300px;
            height: 161px;
            display: grid;
            grid-template: 80px 85px / 75px 75px 8px 70px 10px 70px;
            grid-template-areas:
                'project-name project-name project-name . image-links image-links'
                'masters-school . masters-subscribe masters-subscribe .';
            border: 1px black solid;

            .masters-project-name {
                font-size: 40px;
                color: $dark-font-color;
            }

            a {
                text-decoration: none;
                color: inherit;

                .img-link {
                    width: 27px;
                    height: 27px;
                }
            }
        }

        .masters-bookstore {
            width: 700px;
            height: 161px;
            border: 1px red solid;
        }
    }

    .news {
        width: 100%;
    }
}
</style>
