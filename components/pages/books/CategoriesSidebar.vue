<script setup lang="ts">
import type { Database } from '@/database.types';
const client = useSupabaseClient<Database>();

const { data: categories } = await client
    .from('category')
    .select('title')
    .order('title');
const allCategory = {
    title: 'Все',
};

const activeCategory = ref(-1);
function clickCategory(category: { title: string }, index: number) {
    activeCategory.value = index;
    // emit category to books
}
</script>

<template>
    <div class="categories-sidebar">
        <span
            class="category"
            :class="{ 'active-category': activeCategory === -1 }"
            @click="clickCategory(allCategory, -1)"
        >
            {{ allCategory.title }}
        </span>
        <span
            class="category"
            v-for="(category, index) in categories"
            :class="{ 'active-category': activeCategory === index }"
            @click="clickCategory(category, index)"
        >
            {{ category.title }}
        </span>
    </div>
</template>

<style scoped lang="scss">
.categories-sidebar {
    min-width: 260px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 80px;
    border-right: 1px $background solid;
    color: $font-color;

    @media (max-width: 980px) {
        min-width: unset;
        flex-flow: row wrap;
        justify-content: center;
        gap: 18px;
        padding: 0 20px;
        font-size: 18px;
        text-align: center;
        border: none;
    }

    .category {
        width: auto;
        height: 20px;
        transition: color 0.2s;
        cursor: pointer;

        @media (max-width: 980px) {
            height: unset;
        }
    }

    .active-category {
        color: $background;
    }
}
</style>
