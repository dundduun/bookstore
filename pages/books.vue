<script setup lang="ts">
import CategoriesSidebar from '@/components/pages/books/CategoriesSidebar.vue';
import CatalogFilter from '@/components/ui/catalog/CatalogFilter.vue';
import ProductsList from '@/components/pages/books/ProductsList.vue';
// import CartLink from '@/components/ui/CartLink.vue';

import type { Database } from '@/database.types';
import CartLink from '@/components/ui/CartLink.vue';

const client = useSupabaseClient<Database>();

const { data: products } = await client
    .from('product')
    .select('*')
    .order('created_at', { ascending: false });

const { data: mostCheapProduct } = await client
    .from('product')
    .select('price')
    .order('price', { ascending: true })
    .limit(1)
    .single();

const { data: mostExpensiveProduct } = await client
    .from('product')
    .select('price')
    .order('price', { ascending: false })
    .limit(1)
    .single();

const filtersData = useFiltersStore();
filtersData.minPrice = mostCheapProduct!.price;
filtersData.maxPrice = mostExpensiveProduct!.price;
</script>

<template>
    <div class="books-page">
        <div class="books-page-container">
            <CartLink />

<!--            <CategoriesSidebar />-->

            <div class="filter-and-products-list">
<!--                <CatalogFilter />-->
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
        max-width: 1440px;
        display: flex;
        justify-content: center;
        padding: 0 20px 0 50px;

        @media (max-width: 980px) {
            flex-direction: column;
            padding: 0 22px;
        }

        @media (max-width: 430px) {
            padding: 0;
        }

        .filter-and-products-list {
            @media (max-width: 980px) {
                margin-top: 130px;
            }

            .products-list {
                margin: 50px 0 0 30px;

                @media (max-width: 980px) {
                    margin: 0;
                }
            }
        }
    }
}
</style>
