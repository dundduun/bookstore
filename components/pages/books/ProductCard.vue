<script setup lang="ts">
import type { selectedProduct } from '@/types';
import type { Database } from '@/database.types';

const client = useSupabaseClient<Database>();

const props = defineProps<{
    product: selectedProduct;
}>();

const { data: picture } = client.storage
    .from('product_images')
    .getPublicUrl(props.product.pictures[0]);
</script>

<template>
<div class="product-card">
    <NuxtLink class="picture-title-link" :to="`/product/${product.id}`">

        <div class="picture-container">
            <img class="picture" :src="picture.publicUrl" />
        </div>

        <span class="title">
            {{ product.title }}
        </span>

        <span class="price">
            {{ product.price }}
        </span>
    </NuxtLink>

    <div class="buttons">
        <button class="more-details-button">
            Подробнее
        </button>
        <button class="buy-button">
            Купить
        </button>
    </div>
</div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.product-card {
    width: 33%;
    max-width: 420px;
    padding: 10px 20px;
    color: $product-page-font-color;

    border: 1px black solid;

    .picture-title-link {
        display: flex;
        flex-direction: column;

        .picture-container {

            .picture {
                width: 100%;
                aspect-ratio: 1 / 1;
                object-fit: cover;
            }
        }

        .title {
            font-size: 20px;
            font-weight: 500;
        }
    }

    .buttons {

        .more-details-button {
            @include hover-button($primary, white);

        }

        .buy-button {
            @include hover-button($background, white);
        }
    }
}
</style>
