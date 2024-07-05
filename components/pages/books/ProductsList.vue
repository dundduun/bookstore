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
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
