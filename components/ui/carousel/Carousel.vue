<script setup lang="ts">
import CarouselItem from '@/components/ui/carousel/CarouselItem.vue';
import type { Database } from '~/database.types';

const client = useSupabaseClient<Database>();

const { data: events } = await client
    .from('event')
    .select()
    .order('created_at', { ascending: true });

// const swiper = ref(null);

// function getRef(swiperInstance: any) {
//     swiper.value = swiperInstance;
//     console.log(swiperInstance);
// }

// function nextSlide() {
//     swiper!.value!.slideNext();
// }

// ADD ERROR HANDLER
// v-if="!error" to <div class="landing-carousel">
// v-else --- reload
// to throw error pass to select nonexistent column
</script>

<template>
    <div class="landing-carousel">
        <Swiper
            class="carousel"
            :spaceBetween="30"
            :loop="true"
        >
        <!-- @swiper="getRef" -->
            <SwiperSlide class="carousel-item" v-for="event in events">
                <CarouselItem :event="event" />
            </SwiperSlide>
        </Swiper>
        <div class="slide-rulers">
            <img
                class="slide-ruler slide-ruler-left"
                src="@/assets/images/surrounded-right-arrow.svg"
                alt="prev"
            />
                <!-- @click="nextSlide" -->
            <img
                class="slide-ruler"
                src="@/assets/images/surrounded-right-arrow.svg"
                alt="next"
            />
        </div>
    </div>
</template>
<style scoped lang="scss">
.landing-carousel {
    margin-top: 25px;
    position: relative;

    .carousel {
        height: 700px;
        max-width: 5000px;
        margin-left: auto;
        margin-right: auto;
    }

    .slide-rulers {
        position: absolute;
        z-index: 1;
        top: 510px;
        left: 55%;
        display: flex;
        gap: 15px;

        .slide-ruler {
            width: 40px;
            height: 40px;
        }

        .slide-ruler-left {
            transform: rotate(180deg);
        }
    }
}
</style>
