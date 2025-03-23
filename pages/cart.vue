<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

import CartCard from '@/components/pages/cart/CartCard.vue';

const cartStore = useCartStore();
</script>

<template>
    <div class="page-template">
        <div class="page-container">
            <h2>корзина</h2>
<!--            {{ cartStore.cart }}-->

            <div class="cart-cards">
                <CartCard v-for="item in cartStore.cart" :product="item" />
            </div>
        </div>
    </div>
</template>
