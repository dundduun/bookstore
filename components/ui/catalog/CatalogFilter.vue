<script setup lang="ts">
import CatalogSearch from '@/components/ui/catalog/CatalogSearch.vue';
import MobFilters from '@/components/ui/catalog/MobFilters.vue';

const selectItems = [
    { value: 'by-date-new-first', text: 'дата: сперва новые' },
    { value: 'by-date-old-first', text: 'дата: сперва старые' },
    { value: 'by-name-alphabetical', text: 'название: А-Я' },
    { value: 'by-name-alphabetical-reversed', text: 'название: Я-А' },
    { value: 'by-price-descending', text: 'цена: по убыванию' },
    { value: 'by-price-ascending', text: 'цена: по возрастанию' },
];
</script>

<template>
    <div class="catalog-filter">
        <CatalogSearch class="catalog-search" />

        <div
            class="select-filter"
            tabindex="0"
        >
            <img
                class="opening-chevron"
                src="@/assets/images/left-chevron.png"
                alt="expand"
            />
        </div>

        <MobFilters />
    </div>
</template>

<style scoped lang="scss">
.catalog-filter {
    height: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;

    @media (max-width: 980px) {
        height: unset;
        width: 100%;
        display: block;
        padding: 0 20px;
    }

    .catalog-search {
        width: 260px;

        @media (max-width: 980px) {
            display: none;
        }
    }

    .select-filter {
        display: flex;
        justify-content: end;
        align-items: center;
        border: 1px solid $catalog-filter-border;
        border-radius: 3px;
        width: 260px;
        height: 30px;
        padding: 0 10px;
        cursor: pointer;
        font-size: 16px;
        font-family: $font-family;
        font-weight: 300;
        background-color: $catalog-filter;

        //&:focus {
        //   background-color: green;
        //}

        @media (max-width: 980px) {
            display: none;
        }

        .opening-chevron {
            transform: rotate(270deg);
            width: 16px;
            height: 16px;
        }
    }
}
</style>
