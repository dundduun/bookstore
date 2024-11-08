<script setup lang="ts">
import CatalogSearch from '@/components/ui/catalog/CatalogSearch.vue';
import MobFilters from '@/components/ui/catalog/MobFilters.vue';

// const sortItems = [
//     { value: 'by-date-new-first', text: 'дата: сперва новые' },
//     { value: 'by-date-old-first', text: 'дата: сперва старые' },
//     { value: 'by-name-alphabetical', text: 'название: А-Я' },
//     { value: 'by-name-alphabetical-reversed', text: 'название: Я-А' },
//     { value: 'by-price-descending', text: 'цена: по убыванию' },
//     { value: 'by-price-ascending', text: 'цена: по возрастанию' },
// ];
const sort = ref();
const { focused: isSortFocused } = useFocus(sort);

</script>

<template>
    <div class="catalog-filter">
        <CatalogSearch class="catalog-search" />

        <div
            class="sort"
        >
            <div
                class="placeholder"
                ref="sort"
                tabindex="0"
            >
                <span>сортировка</span>
                <img
                    class="opening-chevron"
                    src="@/assets/images/left-chevron.png"
                    alt="expand"
                />
            </div>


            <Transition name="fade">
                <div
                    v-if="isSortFocused"
                    class="sort-options"
                >
                    as
                </div>
            </Transition>
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

    .sort {
        border: 1px solid $catalog-filter-border;
        border-radius: 3px;
        width: 260px;
        height: 30px;
        font-size: 16px;
        font-family: $font-family;
        font-weight: 300;
        background-color: $catalog-filter;

        @media (max-width: 980px) {
            display: none;
        }

        .placeholder {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 0 10px;
            cursor: pointer;

            .opening-chevron {
                transform: rotate(270deg);
                width: 16px;
                height: 16px;
            }
        }

        .sort-options {
            position: absolute;
            margin: 4px 0 0 -1px;
            border: 1px solid $catalog-filter-border;
            border-radius: 3px;
            width: 260px;
            padding: 0 10px;
        }
    }
}
</style>
