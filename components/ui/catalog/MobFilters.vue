<script setup lang="ts">
import CatalogSearch from '@/components/ui/catalog/CatalogSearch.vue';
import MobSubfilter from '@/components/ui/catalog/MobSubfilters/MobSubfilter.vue';
import Sort from '@/components/ui/catalog/MobSubfilters/Sort.vue';
import PriceRegulator from '@/components/ui/catalog/PriceRegulator.vue';
import InStockCheckbox from '@/components/ui/catalog/InStockCheckbox.vue';

const activeFilter = ref('');
function toggleFilter(clickedFilter: string) {
    if (activeFilter.value !== clickedFilter) {
        activeFilter.value = clickedFilter;
    } else {
        activeFilter.value = '';
    }
}

const activeSubfilter = ref('');
function toggleSubfilter(clickedFilter: string) {
    if (activeSubfilter.value !== clickedFilter) {
        activeSubfilter.value = clickedFilter;
    } else {
        activeSubfilter.value = '';
    }
}

const subfilters = [
    {
        name: 'сортировка',
        maxHeight: '250px',
        component: Sort,
    },
    {
        name: 'цена',
        maxHeight: '75px',
        component: PriceRegulator,
    },
    {
        name: 'наличие',
        maxHeight: '70px',
        component: InStockCheckbox,
    },
];
</script>

<template>
    <div class="mob-filters">
        <div class="buttons">
            <button
                class="filters"
                :class="{
                    'active-filter': activeFilter === 'filtersButton',
                }"
                @click="toggleFilter('filtersButton')"
            >
                <img
                    src="@/assets/images/settings.svg"
                    class="settings-icon"
                    alt="filters"
                />
                <span>фильтры</span>
            </button>

            <button
                class="search"
                :class="{
                    'active-filter': activeFilter === 'searchButton',
                }"
                @click="toggleFilter('searchButton')"
            >
                <img
                    src="@/assets/images/loupe.svg"
                    class="loupe-icon"
                    alt="search"
                />
            </button>
        </div>

        <div class="fickle-filters">
            <CatalogSearch
                v-show="activeFilter === 'searchButton'"
                class="catalog-search"
            />

            <div v-show="activeFilter === 'filtersButton'" class="subfilters">
                <MobSubfilter
                    v-for="(subfilter, index) in subfilters"
                    :key="index"
                    :name="subfilter.name"
                    :max-height="subfilter.maxHeight"
                    :is-active="subfilter.name === activeSubfilter"
                    @toggle-subfilter="toggleSubfilter"
                    class="subfilter"
                >
                    <component :is="subfilter.component"></component>
                </MobSubfilter>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mob-filters {
    display: none;

    @media (max-width: 980px) {
        display: block;
    }

    .buttons {
        display: flex;
        justify-content: space-between;

        .filters {
            display: flex;
            align-items: center;
            gap: 10px;
            transition: 0.2s;

            .settings-icon {
                height: 25px;
            }
        }

        .search {
            padding: 10px 0;
            transition: 0.2s;

            .loupe-icon {
                width: 25px;
                height: 25px;
                filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(174deg)
                    brightness(95%) contrast(102%);
            }
        }
    }

    .fickle-filters {
        width: 100%;
        display: flex;
        justify-content: center;

        .catalog-search {
            width: 100%;
            height: 40px;
            margin-top: 20px;
        }

        .subfilters {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            border: solid $m-filters-border;
            border-width: 1px 0;

            .subfilter:nth-child(even) {
                border: solid $m-filters-border;
                border-width: 1px 0;
            }
        }
    }
}

.active-filter {
    filter: invert(60%) sepia(0%) saturate(55%) hue-rotate(157deg)
        brightness(106%) contrast(92%);
}
</style>
