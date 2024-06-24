<script setup lang="ts">
import CarouselItem from '@/components/ui/carousel/CarouselItem.vue';
import type { Database } from '@/database.types';
import type { Swiper } from 'swiper/types';

const client = useSupabaseClient<Database>();

const { data: events } = await client
    .from('event')
    .select()
    .order('created_at', { ascending: true });

const swiper = ref<Swiper>();

const onSwiperInit = (swiperInstance: Swiper) => {
    swiper.value = swiperInstance;
};

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
            @swiper="onSwiperInit"
        >
            <SwiperSlide class="carousel-item" v-for="event in events">
                <CarouselItem :event="event" />
            </SwiperSlide>
        </Swiper>
        <div class="slide-rulers">
            <img
                class="slide-ruler slide-ruler-left"
                src="@/assets/images/surrounded-right-arrow.svg"
                alt="prev"
                @click="swiper!.slidePrev()"
            />
            <img
                class="slide-ruler"
                src="@/assets/images/surrounded-right-arrow.svg"
                alt="next"
                @click="swiper!.slideNext()"
            />
        </div>
    </div>
</template>
<style scoped lang="scss">
.landing-carousel {
    margin-top: 25px;
    position: relative;

    .carousel {
        max-width: 5000px;
        margin-left: auto;
        margin-right: auto;
    }

    .slide-rulers {
        position: absolute;
        z-index: 1;
        top: 450px;
        left: calc(50% - 47px);
        display: flex;
        gap: 15px;

        @media (max-width: 1000px) {
            top: 250px;
        }

        @media (max-width: 550px) {
            display: none;
        }

        .slide-ruler {
            width: 40px;
            height: 40px;
            cursor: pointer;
        }

        .slide-ruler-left {
            transform: rotate(180deg);
        }
    }
}
</style>
