<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import { useCartStore } from '@/stores/cart';
import type { Database } from '@/database.types';

const client = useSupabaseClient<Database>();
const route = useRoute();
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

useHead({
    title: productInstance.title,
});

const productImage = ref({ publicUrl: '' });
if (productInstance.pictures[0]) {
    const { data } = client.storage
        .from('product_images')
        .getPublicUrl(productInstance.pictures[0]);
    productImage.value = data;
}

const { $gsap } = useNuxtApp();
onMounted(() => {
    const tl = $gsap.timeline({});
    tl.to('.product-data', { y: 0, opacity: 1, duration: 0.3 });
});

onBeforeRouteLeave(() => {
    const tl = $gsap.timeline({});
    tl.to('.product-data', { y: 50, opacity: 0.1, duration: 0.3 });
    tl.to('.product-data', { y: 1000, opacity: 0, duration: 30 });
});

const cartStore = useCartStore();


function addToCart(): void {
    cartStore.addToCart(route.params.id);
}
</script>

<template>
    <div class="product-data">
        <div class="picture-container">
            <img
                v-if="productImage.publicUrl"
                :src="productImage.publicUrl"
                class="picture"
                alt="Изображение товара"
            />

            <div v-else class="without-picture">
                <span>Без изображения</span>
            </div>
        </div>

        <div class="text">
            <div class="main-information">
                <span class="title">
                    {{ productInstance!.title }}
                </span>

                <span class="price">
                    {{ productInstance!.price.toLocaleString() }} р.
                </span>
            </div>

            <button @click="addToCart" class="buy-button" ref="button">купить</button>

            <VueMarkdown
                :source="productInstance!.description"
                class="description"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.product-data {
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 100px;
    transform: translateY(50px);
    opacity: 0;

    @media (max-width: 850px) {
        width: 82vw;
    }

    @media (max-width: 560px) {
        width: 100%;
    }

    .picture-container {
        width: 100%;
        height: 616px;

        @media (max-width: 850px) {
            height: 82vw;
        }

        @media (max-width: 560px) {
            height: 100vw;
        }

        .picture {
            width: 616px;
            height: 100%;
            object-fit: cover;

            @media (max-width: 850px) {
                width: 100%;
                height: 100%;
            }
        }

        .without-picture {
            width: 616px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            background-color: white;

            @media (max-width: 850px) {
                width: 100%;
                height: 100%;
            }

            @media (max-width: 400px) {
                font-size: 14px;
            }

            @media (max-width: 200px) {
                font-size: 10px;
            }
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
            @include hover-button($background, $product-page-background);
            margin-top: 25px;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: 500;

            @media (max-width: 560px) {
                display: none;
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
</style>
