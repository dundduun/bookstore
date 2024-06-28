<script setup lang="ts">
import CategoriesSidebar from '@/components/pages/books/CategoriesSidebar.vue';
import CatalogSearch from '@/components/ui/CatalogSearch.vue';
import type { Database } from '@/database.types';

const client = useSupabaseClient<Database>();
</script>

<template>
    <div class="books-page">
        <CategoriesSidebar />

        <div class="search-and-goods">
            <CatalogSearch />
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
