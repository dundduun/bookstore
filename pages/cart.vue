<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

import CartCard from '@/components/pages/cart/CartCard.vue';

const cartStore = useCartStore();
</script>

<template>
    <div class="page-template cart-page">
        <div class="page-container">
            <div v-if="cartStore.cart.length > 0" class="cart-is-full">
                <h2>корзина</h2>
                <div class="cart-cards">
                    <CartCard v-for="item in cartStore.cart" :key="item.id" :product="item" />
                </div>
            </div>
            <div v-else class="cart-is-empty">
                <h2>корзина пуста.</h2>
                <NuxtLink to="/books">
                    <button class="basic-button link-to-books">за покупками!</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cart-page {
    .page-container {
        .cart-is-full {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .cart-cards {
                margin-top: 50px;
            }
        }

        .cart-is-empty {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 50px;
        }
    }
}
</style>
