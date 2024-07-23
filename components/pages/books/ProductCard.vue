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
                    подробнее
                </NuxtLink>
                <button class="buy-button button">купить</button>
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
                border: 1px solid $border-light-gray;

                @media (max-width: 1250px) {
                    font-size: 14px;
                } 

                @media (max-width: 1100px) {
                    font-size: 12px;
                }
            }
        }

        .title {
            margin-top: 10px;
            font-size: 20px;
            font-weight: 500;

            @media (max-width: 1400px) and (min-width: 900px) {
                margin-top: 3px;
                font-size: 18px;
            }

            @media (max-width: 1100px) and (min-width: 900px) {
                font-size: 16px;
            }

            @media (max-width: 770px) {
                font-size: 16px;
            }

            @media (max-width: 400px) {
                font-size: 14px;
            }
        }
    }

    .buttons-and-price {
        .price-link {
            display: flex;
            flex-direction: column;

            .price {
                margin-top: 10px;
                font-size: 16px;

                @media (max-width: 770px) {
                    font-size: 14px;
                }
            }
        }

        .buttons {
            display: flex;
            gap: 6px;
            margin-top: 20px;

            @media (max-width: 900px) and (min-width: 750px) {
                gap: 10px;
            }

            .button {
                padding: 10px 15px;

                @media (max-width: 1250px) {
                    padding: 8px 7%;
                    font-size: 12px;
                }

                @media (max-width: 900px) and (min-width: 770px) {
                    padding: 10px 15px;
                    font-size: 16px;
                }

                @media (max-width: 460px) {
                    padding: 8px 5%;
                }

                @media (max-width: 380px) {
                    padding: 7px 4px;
                    font-size: 9px;
                }
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
