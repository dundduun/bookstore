<script setup lang="ts">
import type { Database } from '@/database.types';

const client = useSupabaseClient<Database>();

const props = defineProps<{
    event: {
        id: string;
        created_at: string;
        title: string;
        picture: string;
        product_id: string;
    };
}>();

const eventPicture = ref({ publicUrl: '' });

if (props.event.picture) {
    const { data } = client.storage
        .from('event_images')
        .getPublicUrl(props.event.picture);
    eventPicture.value = data;
}
</script>

<template>
    <div class="carousel-item">
        <img class="picture" :src="eventPicture.publicUrl" />

        <div class="text">
            <div class="text-container">
                <div class="title">
                    {{ event.title }}
                </div>

                <NuxtLink
                    class="product-link"
                    :to="`/product/${event.product_id}`"
                >
                    к товару
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins';

.carousel-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .picture {
        height: 500px;
        width: 100%;
        object-fit: cover;

        @media (max-width: 1000px) {
            height: 300px;
        }
    }

    .text {
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 800px) {
            justify-content: flex-start;
        }

        .text-container {
            width: 95%;
            min-height: 200px;
            max-width: 1160px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 50px;
            padding: 25px;

            @media (max-width: 1000px) {
                height: unset;
            }

            @media (max-width: 800px) {
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                gap: 15px;
            }

            @media (max-width: 550px) {
                min-height: 250px;
            }

            @media (max-width: 370px) {
                min-height: 300px;
            }

            .title {
                max-width: 550px;
                font-size: 30px;
                color: $background;

                @media (max-width: 1000px) {
                    font-size: 24px;
                }

                @media (max-width: 800px) {
                    max-width: unset;
                }
            }

            .product-link {
                @include kill-link-decoration;
                @include hover-button($background, white);
                min-width: 140px;
                max-width: 100%;
                padding: 14px 35px;
                font-size: 16px;
                font-weight: 600;

                @media (max-width: 800px) {
                    width: 210px;
                    text-align: center;
                }
            }
        }
    }
}
</style>
