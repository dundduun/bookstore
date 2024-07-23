<script setup lang="ts">
import LazyProductCard from '@/components/pages/books/ProductCard.vue';
import type { selectedProduct } from '@/types';

defineProps<{
    products: selectedProduct[] | null;
}>();
</script>

<template>
    <div class="products-list">
        <LazyProductCard
            v-for="(product, index) in products"
            :product="product"
            :key="index"
        />
    </div>
</template>

<style scoped lang="scss">
.products-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 330px) {
        grid-template-columns: 1fr;
    }
}
</style>
