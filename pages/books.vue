<script setup lang="ts">
import CategoriesSidebar from '@/components/pages/books/CategoriesSidebar.vue';
import type { Database } from '@/database.types';

const client = useSupabaseClient<Database>();
</script>

<template>
    <div class="books-page">
        <CategoriesSidebar />
    </div>
</template>
