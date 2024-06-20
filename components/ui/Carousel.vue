<script setup lang="ts">
import { Navigation } from 'swiper/modules';

const modules = [Navigation];
</script>

<template>
    <div class="landing-carousel">
        <Swiper
            class="carousel"
            :spaceBetween="30"
            :loop="true"
            :navigation="true"
            :modules="modules"
        >
            <SwiperSlide class="carousel-item">
                <img
                    class="image"
                    src="@/assets/images/carousel-flowers.jpeg"
                    alt="Картина Маши Даниловской с выставки в Питербуржском магазине masters bookstore"
                />

                <div class="text">
                    <div class="container">
                        <div class="description">
                            Выставка Маши Даниловской
                            <br />
                            в masters bookstore в Петебурге
                        </div>

                        <button class="buy-button">купить</button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide class="carousel-item">Slide 2</SwiperSlide>
            <SwiperSlide class="carousel-item">Slide 3</SwiperSlide>
        </Swiper>
    </div>
</template>
<style lang="scss">
@import '@/assets/styles/mixins.scss';

.landing-carousel {
    margin-top: 25px;

    .carousel {
        height: 700px;
        max-width: 5000px;
        margin-left: auto;
        margin-right: auto;

        .carousel-item {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            .image {
                position: absolute;
                left: 0;
                height: 100%;
                width: 100%;
                z-index: -1;
                object-fit: cover;
            }

            .text {
                height: 200px;
                display: flex;
                justify-content: center;
                background: white;

                .container {
                    width: 95%;
                    max-width: 1160px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .description {
                        font-size: 30px;
                        color: $font-color;
                    }

                    .buy-button {
                        padding: 14px 35px;
                        font-size: 16px;
                        font-weight: 600;
                        @include hover-button($font-color, white);
                    }
                }
            }
        }
    }
}
</style>
