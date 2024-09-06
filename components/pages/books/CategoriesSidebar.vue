<script setup lang="ts">
import PriceRegulator from '@/components/ui/catalog/PriceRegulator.vue';
import AvailCheckbox from '@/components/ui/catalog/MobSubfilters/AvailCheckbox.vue';
import type { Database } from '@/database.types';
const client = useSupabaseClient<Database>();

const { data: categories } = await client
    .from('category')
    .select('title')
    .order('title');
const allCategory = {
    title: 'Все',
};

const { data: mostExpensiveProduct } = await client
    .from('product')
    .select('price')
    .order('price', { ascending: true })
    .limit(1)
    .single();

const { data: mostCheapProduct } = await client
    .from('product')
    .select('price')
    .order('price', { ascending: false })
    .limit(1)
    .single();

const activeCategory = ref(-1);
function clickCategory(category: { title: string }, index: number) {
    activeCategory.value = index;
    // emit category to books
}
</script>

<template>
    <div class="categories-sidebar">
        <div class="categories">
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

        <div class="price-regulator-container">
            <PriceRegulator
                :min-price="mostExpensiveProduct!.price"
                :max-price="mostCheapProduct!.price"
            />
        </div>

        <div class="availability">
            <span class="title">наличие</span>
            <AvailCheckbox class="checkbox" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.categories-sidebar {
    min-width: 260px;
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    border-right: 1px $background solid;
    color: $font-color;

    @media (max-width: 980px) {
        min-width: unset;
        padding: 0 20px;
        font-size: 18px;
        text-align: center;
        border: none;
    }

    .categories {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-right: 35px;

        @media (max-width: 980px) {
            flex-flow: row wrap;
            justify-content: center;
            gap: 18px;
        }

        .category {
            width: auto;
            min-height: 20px;
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

    .price-regulator-container {
        margin-top: 50px;

        @media (max-width: 980px) {
            display: none;
        }
    }

    .availability {
        display: flex;
        flex-direction: column;
        margin-top: 50px;

        @media (max-width: 980px) {
            display: none;
        }

        .title {
            font-size: 18px;
        }

        .checkbox {
            margin-top: 10px;
        }
    }
}
</style>
