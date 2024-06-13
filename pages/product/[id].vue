<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import type { Database } from '@@/database.types';
import { useMagicKeys } from '@vueuse/core';

const client = useSupabaseClient<Database>();
const route = useRoute();
const router = useRouter();

definePageMeta({
    layout: false,
});

const { data: productInstance, error } = await client
    .from('product')
    .select()
    .eq('id', route.params.id)
    .single();

if (error) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
    });
}

const productImage = ref({ publicUrl: '' });

if (productInstance.pictures[0]) {
    const { data } = client.storage
        .from('product_images')
        .getPublicUrl(productInstance.pictures[0]);
    productImage.value = data;
}

const { escape } = useMagicKeys();

watch(escape, (v) => {
    if (v) router.push('/');
});
</script>

<template>
    <div class="product-page">
        <div class="container">
            <div class="exit-buttons">
                <NuxtLink to="/" class="text-home-link">← На главную</NuxtLink>

                <NuxtLink to="/" class="mobile-home-link">
                    <img src="@/assets/images/left-arrow.svg" />
                </NuxtLink>

                <!-- set cross icon to catalogue whet it's done (or to previous page) -->
                <NuxtLink to="/" class="catalogue-link">
                    <img
                        src="@/assets/images/cross-icon.svg"
                        class="cross-icon"
                    />
                </NuxtLink>
            </div>

            <div class="product-data">
                <div v-if="productImage.publicUrl" class="picture-container">
                    <img :src="productImage.publicUrl" class="picture" />
                </div>
                <div v-else class="without-picture">
                    <span>Без изображения</span>
                </div>

                <div class="text">
                    <div class="main-information">
                        <span class="title">
                            {{ productInstance.title }}
                        </span>

                        <span class="price">
                            {{ productInstance.price }} р.
                        </span>
                    </div>

                    <button class="buy-button" ref="button">Купить</button>

                    <VueMarkdown
                        :source="productInstance.description"
                        class="description"
                    />
                </div>
            </div>

            <div class="mobile-buy-button-container">
                <button class="mobile-buy-button">Купить</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.product-page {
    width: 100%;
    background-color: $product-page-background;

    .container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 100px;

        .exit-buttons {
            position: fixed;
            width: 100%;
            max-width: 2000px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 2% 0;

            @media (max-width: 1100px) {
                background-color: $product-page-background;
            }

            @media (max-width: 560px) {
                position: fixed;
                height: 50px;
                margin-top: 0;
                padding: 0 0 0 10px;
                background-color: $product-page-background;
                border-bottom: 1px $shadow solid;
            }

            .text-home-link {
                padding: 10px;
                text-decoration: none;
                color: $font-color;
                cursor: pointer;

                @media (max-width: 560px) {
                    display: none;
                }
            }

            .mobile-home-link {
                display: none;
                width: 100%;

                @media (max-width: 560px) {
                    display: block;
                }
            }

            .cross-icon {
                height: 50px;
                width: auto;
                padding: 10px;

                @media (max-width: 560px) {
                    display: none;
                }
            }
        }

        .product-data {
            max-width: 700px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 100px;

            @media (max-width: 850px) {
                max-width: 82vw;
            }

            @media (max-width: 560px) {
                max-width: 100%;
            }

            .picture-container {
                @media (max-width: 660px) {
                    width: 100%;
                    max-width: 100%;
                }

                @media (max-width: 560px) {
                    min-height: unset;
                    min-width: unset;
                }

                .picture {
                    width: 88%;
                    height: auto;

                    @media (max-width: 850px) {
                        width: 100%;
                    }
                }
            }

            .without-picture {
                height: 400px;
                width: 500px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 17px;
                background-color: white;

                @media (max-width: 850px) {
                    width: 500px;
                    height: 400px;
                    max-width: 82vw;
                }

                @media (max-width: 560px) {
                    width: 100vw;
                    height: 80vw;
                    max-width: unset;
                }

                @media (max-width: 400px) {
                    font-size: 14px;
                }

                @media (max-width: 200px) {
                    font-size: 10px;
                }
            }

            .text {
                @media (max-width: 560px) {
                    padding: 0 5vw;
                }

                .main-information {
                    display: flex;
                    flex-direction: column;
                    color: $product-page-font-color;
                    font-weight: 500;

                    .title {
                        margin-top: 40px;
                        font-size: 24px;

                        @media (max-width: 560px) {
                            font-size: 22px;
                        }
                    }

                    .price {
                        margin-top: 25px;
                        font-size: 20px;

                        @media (max-width: 560px) {
                            font-size: 18px;
                        }
                    }
                }

                .buy-button {
                    margin-top: 25px;
                    padding: 12px 30px;
                    font-size: 16px;
                    border: 2px $background solid;
                    border-radius: 0;
                    font-family: $font-family;
                    color: white;
                    background-color: $background;
                    transition:
                        color 0.3s,
                        background-color 0.3s;
                    cursor: pointer;

                    @media (max-width: 560px) {
                        display: none;
                    }

                    @media (hover: hover) {
                        &:hover {
                            color: $background;
                            border: 2px $background solid;
                            background-color: white;
                        }
                    }

                    @media (hover: none) {
                        &:active {
                            color: $background;
                            border: 2px $background solid;
                            background-color: white;
                        }
                    }
                }

                .description {
                    margin-top: 35px;
                    font-size: 14px;
                    line-height: 1.54;
                    font-weight: 300;
                }
            }
        }

        .mobile-buy-button-container {
            display: none;
            position: fixed;
            width: 100%;
            height: 80px;
            align-items: center;
            margin-top: calc(100vh - 80px);
            padding: 0 20px;
            border-radius: 5px;
            background-color: white;
            box-shadow: 0 -3px 10px $shadow;

            @media (max-width: 560px) {
                display: flex;
            }

            .mobile-buy-button {
                width: 100%;
                padding: 12px 0;
                font-size: 14px;
                border: 2px $background solid;
                border-radius: 0;
                font-family: $font-family;
                color: $background;
                background-color: white;
                transition:
                    color 0.3s,
                    background-color 0.3s;
                cursor: pointer;

                @media (hover: hover) {
                    &:hover {
                        color: white;
                        background-color: $background;
                    }
                }

                @media (hover: none) {
                    &:active {
                        color: white;
                        background-color: $background;
                    }
                }
            }
        }
    }
}
</style>
