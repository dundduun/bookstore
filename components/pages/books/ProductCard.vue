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

            <span class="price"> {{ product.price.toLocaleString() }}р. </span>
        </NuxtLink>

        <div class="buttons">
            <button class="more-details-button button">Подробнее</button>
            <button class="buy-button button">Купить</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.product-card {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    color: $product-page-font-color;

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
            margin-top: 10px;
            font-size: 20px;
            font-weight: 500;
        }

        .price {
            margin-top: 10px;
            font-size: 16px;
        }
    }

    .buttons {
        display: flex;
        gap: 6px;
        margin-top: 20px;

        .button {
            padding: 10px 15px;
        }

        .more-details-button {
            @include hover-button(white, $primary);
            border-color: $primary;

            @media (hover: hover) {
                &:hover {
                    color: white;
                    background-color: $background;
                    border-color: $background;
                }
            }

            @media (hover: none) {
                &:active {
                    color: white;
                    background-color: $background;
                    border-color: $background;
                }
            }
        }

        .buy-button {
            @include hover-button($primary, white);

            @media (hover: hover) {
                &:hover {
                    color: white;
                    background-color: $background;
                    border-color: $background;
                }
            }

            @media (hover: none) {
                &:active {
                    color: white;
                    background-color: $background;
                    border-color: $background;
                }
            }
        }
    }
}
</style>
