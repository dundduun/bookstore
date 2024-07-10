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
        <div class="books-page-container">
            <CategoriesSidebar />

            <div class="filter-and-products-list">
                <CatalogFilter />
                <ProductsList class="products-list" :products />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.books-page {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;

    .books-page-container {
        height: 100%;
        width: 100%;
        max-width: 2000px;
        display: flex;
        justify-content: center;
        padding: 0 20px 0 50px;

        .filter-and-products-list {
            .products-list {
                margin: 50px 0 0 30px;
            }
        }
    }
}
</style>
