<script setup lang="ts">
import CategoriesSidebar from '@/components/pages/books/CategoriesSidebar.vue';
import CatalogFilter from '@/components/ui/CatalogFilter.vue';
import ProductsList from '@/components/pages/books/ProductsList.vue';
import type { Database } from '@/database.types';

const client = useSupabaseClient<Database>();

const { data: products } = await client
    .from('product')
    .select('*')
    .order('created_at', { ascending: false });
</script>

<template>
    <div class="books-page">
        <CategoriesSidebar />

        <div class="filter-and-products-list">
            <CatalogFilter />
            <ProductsList :products />
        </div>
    </div>
</template>

<style scoped lang="scss">
.books-page {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    padding: 0 50px;
}
</style>
