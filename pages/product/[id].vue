<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import type { Database } from '@@/database.types';

const client = useSupabaseClient<Database>();
const route = useRoute();

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
</script>

<template>
    <div class="product-page">
        <div class="container">
            <div class="exit-buttons">
                <NuxtLink to="/" class="home-link">← На главную</NuxtLink>

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

                <div class="main-information">
                    <span class="title">
                        {{ productInstance.title }}
                    </span>

                    <span class="price"> {{ productInstance.price }} р. </span>
                </div>

                <button class="buy-button" ref="button">Купить</button>

                <VueMarkdown
                    :source="productInstance.description"
                    class="description"
                />
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
            width: 98%;
            max-width: 2000px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;

            .home-link {
                padding: 10px;
                text-decoration: none;
                color: $font-color;
                cursor: pointer;
            }

            .cross-icon {
                height: 50px;
                width: auto;
                padding: 10px;
            }
        }

        .product-data {
            max-width: 700px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 100px;

            .picture-container {
                min-height: 369px;
                min-width: 400px;

                .picture {
                    width: 88%;
                    height: auto;
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
            }

            .main-information {
                display: flex;
                flex-direction: column;
                color: $product-page-font-color;
                font-weight: 500;

                .title {
                    margin-top: 40px;
                    font-size: 24px;
                }

                .price {
                    margin-top: 25px;
                    font-size: 20px;
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
                transition: 0.3s;
                cursor: pointer;

                &:hover {
                    color: $background;
                    border: 2px $background solid;
                    background-color: white;
                }
            }

            .description {
                margin-top: 15px;
                font-size: 14px;
                line-height: 1.54;
                font-weight: 300;
            }
        }
    }
}
</style>
