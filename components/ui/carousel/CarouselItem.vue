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
            <div class="container">
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
@import 'assets/styles/mixins';

.carousel-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .picture {
        height: 500px;
        width: 100%;
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

            .title {
                max-width: 550px;
                font-size: 30px;
                color: $background;
            }

            .product-link {
                @include kill-link-decoration;
                @include hover-button($background, white);
                padding: 14px 35px;
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
}
</style>
