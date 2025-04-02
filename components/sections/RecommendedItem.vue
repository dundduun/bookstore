<script setup lang="ts">
import type { Database } from '@@/database.types';
import { useCartStore } from '@/stores/cart';

const client = useSupabaseClient<Database>();

const { data: giftTokenCategory } = await useAsyncData(async () => {
    const { data } = await client
        .from('category')
        .select('*')
        .eq('code', 'gift-token')
        .single();
    return data;
});

const { data: giftToken } = await useAsyncData(async () => {
    const { data } = await client
        .from('product')
        .select('*')
        .eq('category_id', giftTokenCategory.value!.id)
        .limit(1)
        .single();
    return data;
});

const { data: giftTokenImage } = client.storage
    .from('product_images')
    .getPublicUrl(giftToken.value!.pictures[0]);


const cartStore = useCartStore();
const giftId = 'c4ca4238-a0b9-2382-0dcc-509a6f75849b';
function addToCart(): void {
    cartStore.addToCart(giftId);
}
</script>

<template>
    <div class="gift-token">
        <div class="container">
            <img class="img" :src="giftTokenImage.publicUrl" />

            <div class="text">
                <span class="title">
                    {{ giftToken!.title }}
                </span>

                <span class="price">
                    от {{ giftToken!.price.toLocaleString() }} р.
                </span>

                <div class="buttons">
                    <button @click="addToCart" class="buy-button">купить</button>
<!--                    <button class="like-button">-->
<!--                        <img class="like-img" src="@/assets/images/like.svg" />-->
<!--                    </button>-->
                </div>

                <span class="description">
                    {{ giftToken!.description }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.gift-token {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    .container {
        display: flex;
        justify-content: center;
        width: fit-content;

        @media (max-width: 1000px) {
            flex-direction: column;
            align-items: flex-start;
        }

        @media (max-width: 330px) {
            margin-left: 20px;
        }

        .img {
            width: 62vw;
            height: 46vw;
            max-width: 760px;
            max-height: 570px;
            object-fit: cover;

            @media (max-width: 1000px) {
                width: 80vw;
                height: 59vw;
            }
        }

        .text {
            display: flex;
            flex-direction: column;
            margin-left: 40px;

            @media (max-width: 1000px) {
                margin: 30px 0 0 0;
            }

            .title {
                font-size: 24px;

                @media (max-width: 1220px) {
                    font-size: 22px;
                }

                @media (max-width: 700px) {
                    font-size: 20px;
                }
            }

            .price {
                margin-top: 25px;
                font-size: 20px;

                @media (max-width: 1220px) {
                    font-size: 18px;
                }

                @media (max-width: 700px) {
                    font-size: 16px;
                }
            }

            .buttons {
                width: 180px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin-top: 25px;

                .buy-button {
                    @include hover-button($primary, white);
                    padding: 14px 35px;
                    font-size: 16px;
                    font-weight: 600;
                }

                .like-button {
                    width: 47px;
                    height: 47px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    border: 1px $border-light-gray solid;
                    border-radius: 100%;
                    cursor: pointer;
                    background-color: white;

                    @media (hover: hover) {
                        &:hover {
                            .like-img {
                                transform: scale(1.15);
                            }
                        }
                    }

                    @media (hover: none) {
                        &:active {
                            .like-img {
                                transform: scale(1.15);
                            }
                        }
                    }

                    .like-img {
                        transform: scale(1.01);
                        width: 20px;
                        height: 17px;
                        transition: 0.3s;
                    }
                }
            }

            .description {
                margin-top: 30px;
                font-size: 14px;
                font-weight: 300;
            }
        }
    }
}
</style>
