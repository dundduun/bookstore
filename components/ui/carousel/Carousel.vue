<script setup lang="ts">
import type { Database } from '@/database.types';

const client = useSupabaseClient<Database>();

const { data: events } = await client
    .from('event')
    .select()
    .order('created_at',  { ascending: true });

// ADD ERROR HANDLER
// v-if="!error" to <div class="landing-carousel">
// v-else --- reload
// to throw error pass to select nonexistent column

console.log(events);

// import { Navigation } from 'swiper/modules';
//
// const modules = [Navigation];
</script>

<template>
    <div class="landing-carousel">
        <Swiper
            class="carousel"
            :spaceBetween="30"
            :loop="true"
        >
<!--            :modules="modules"-->
            <SwiperSlide class="carousel-item" v-for="event in events">
                {{ event.title }}
<!--                <img-->
<!--                    class="image"-->
<!--                    src="@/assets/images/carousel-flowers.jpeg"-->
<!--                    alt="Картина Маши Даниловской с выставки в Питербуржском магазине masters bookstore"-->
<!--                />-->

<!--                <div class="text">-->
<!--                    <div class="container">-->
<!--                        <div class="description">-->
<!--                            {{ events![0].title }}-->
<!--                        </div>-->

<!--                        <button class="buy-button">купить</button>-->
<!--                    </div>-->
<!--                </div>-->
            </SwiperSlide>
<!--            <SwiperSlide class="carousel-item">Slide 2</SwiperSlide>-->
<!--            <SwiperSlide class="carousel-item">Slide 3</SwiperSlide>-->
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
