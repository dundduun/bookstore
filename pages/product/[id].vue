<script setup lang="ts">
import type { Database } from '@@/database.types';

definePageMeta({
    layout: false,
});

const client = useSupabaseClient<Database>();
const route = useRoute();
const router = useRouter();

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

const description =
    "<style>br {display: block; content: ' '; height: 25px;}</style>" +
    productInstance.description;
</script>

<template>
    <div class="product-page">
        <div class="exit-buttons">
            <a class="return" @click="router.back">Назад</a>
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

            <span v-html="description" class="description"></span>
        </div>
    </div>
</template>

<style lang="scss">
.product-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100px;
    background-color: $product-page-background;

    .exit-buttons {
        margin-top: 25px;

        .return {
            cursor: pointer;
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
            border: 2px $primary solid;
            border-radius: 0;
            font-family: $font-family;
            color: $primary;
            background-color: white;
            transition: 0.3s;
            cursor: pointer;

            &:hover {
                color: white;
                background-color: $background;
            }
        }

        .description {
            margin-top: 30px;
            font-size: 14px;
            line-height: 1.5;
            font-weight: 300;
        }
    }
}
</style>
