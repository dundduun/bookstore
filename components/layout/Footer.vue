<template>
    <footer>
        <div class="links-container">
            <div class="masters-project">
                <div class="name-and-media">
                    <div class="masters-project-name">
                        masters<br />
                        project
                    </div>

                    <div class="media">
                        <a href="https://t.me/artschoolmasters">
                            <img
                                class="img-media-link"
                                src="@/assets/images/black-telegram.png"
                            />
                        </a>

                        <a href="https://vk.com/artschoolmaste">
                            <img
                                class="img-media-link"
                                src="@/assets/images/black-vk.png"
                            />
                        </a>
                    </div>
                </div>

                <div class="school-and-subscribe-links">
                    <a href="https://masters-project.ru/">
                        школа<br />
                        masters
                    </a>

                    <a href="https://masters-project.ru/subscriptions-promo/">
                        подписка<br />
                        masters
                    </a>
                </div>
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
            width: 400px;
            height: 161px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px black solid;

            .name-and-media {
                display: flex;
                justify-content: space-between;

                .masters-project-name {
                    font-size: 40px;
                }

                .media {
                    display: flex;
                    gap: 6px;

                    .img-media-link {
                        width: 27px;
                        height: 27px;
                    }
                }
            }

            .school-and-subscribe-links {
                display: flex;
                justify-content: space-between;

                a {
                    text-decoration: none;
                    color: inherit;
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
