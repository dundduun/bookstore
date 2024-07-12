<script setup lang="ts">
import type { selectedProduct } from '@/types';
import type { Database } from '@/database.types';

const client = useSupabaseClient<Database>();

const props = defineProps<{
    product: selectedProduct;
}>();

const picture = ref({ publicUrl: '' });
if (props.product.pictures[0]) {
    const { data } = client.storage
        .from('product_images')
        .getPublicUrl(props.product.pictures[0]);
    picture.value = data;
}
</script>

<template>
    <div class="product-card">
        <NuxtLink class="picture-title-link" :to="`/product/${product.id}`">
            <div class="picture-container">
                <img
                    v-if="picture.publicUrl"
                    class="picture picture-container-child"
                    :src="picture.publicUrl"
                />

                <div v-else class="without-picture picture-container-child">
                    Без изображения
                </div>
            </div>

            <span class="title">
                {{ product.title }}
            </span>
        </NuxtLink>

        <div class="buttons-and-price">
            <NuxtLink class="price-link" :to="`/product/${product.id}`">
                <span class="price">
                    {{ product.price.toLocaleString() }}р.
                </span>
            </NuxtLink>

            <div class="buttons">
                <NuxtLink
                    class="more-details-button button"
                    :to="`/product/${product.id}`"
                >
                    Подробнее
                </NuxtLink>
                <button class="buy-button button">Купить</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.product-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    color: $product-page-font-color;

    .picture-title-link {
        display: flex;
        flex-direction: column;

        .picture-container {
            .picture-container-child {
                width: 100%;
                aspect-ratio: 1 / 1;
            }

            .picture {
                object-fit: cover;
            }

            .without-picture {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .title {
            margin-top: 10px;
            font-size: 20px;
            font-weight: 500;
        }
    }

    .buttons-and-price {
        .price-link {
            display: flex;
            flex-direction: column;

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
}
</style>
