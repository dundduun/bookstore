<script setup lang="ts">
import ProductCard from '@/components/pages/books/ProductCard.vue';
import type { selectedProduct } from '@/types';

defineProps<{
    products: selectedProduct[] | null;
}>();
</script>

<template>
    <div class="products-list">
        <ProductCard
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

    @media (max-width: 980px) {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
