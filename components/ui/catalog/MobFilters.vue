<script setup lang="ts">
import CatalogSearch from '@/components/ui/catalog/CatalogSearch.vue';
import MobSubfilter from '@/components/ui/catalog/MobSubfilters/MobSubfilter.vue';
import Sort from '@/components/ui/catalog/MobSubfilters/Sort.vue';
import PriceRegulator from '@/components/ui/catalog/PriceRegulator.vue';
import AvailCheckbox from '@/components/ui/catalog/MobSubfilters/AvailCheckbox.vue';

const activeFilter = ref('');
function toggleFilter(clickedFilter: string) {
    if (!activeFilter.value || activeFilter.value !== clickedFilter) {
        activeFilter.value = clickedFilter;
    } else {
        activeFilter.value = '';
    }
}

// const activeSecondaryFilter = ref('');
// function toggleSecondaryFilter(clickedFilter: string) {
//     if (
//         !activeSecondaryFilter.value ||
//         activeSecondaryFilter.value !== clickedFilter
//     ) {
//         activeSecondaryFilter.value = clickedFilter;
//     } else {
//         activeSecondaryFilter.value = '';
//     }
// }
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
                <img src="@/assets/images/settings.svg" class="settings-icon" />
                <span>фильтры</span>
            </button>

            <button
                class="search"
                :class="{
                    'active-filter': activeFilter === 'searchButton',
                }"
                @click="toggleFilter('searchButton')"
            >
                <img src="@/assets/images/loupe.svg" class="loupe-icon" />
            </button>
        </div>

        <div class="fickle-filters">
            <CatalogSearch
                v-show="activeFilter === 'searchButton'"
                class="m-catalog-search"
            />

            <div v-show="activeFilter === 'filtersButton'" class="subfilters">
                <MobSubfilter
                    :component-name="'AvailCheckbox'"
                    :local-name="'сортировка'"
                    :max-height="'250px'"
                    class="mob-subfilter"
                >
                    <Sort />
                </MobSubfilter>

                <MobSubfilter
                    :component-name="'PriceRegulator'"
                    :local-name="'цена'"
                    :max-height="'75px'"
                    class="mob-subfilter"
                >
                    <PriceRegulator :min-price="1" :max-price="100" />
                </MobSubfilter>

                <MobSubfilter
                    :component-name="'AvailCheckbox'"
                    :local-name="'наличие'"
                    :max-height="'70px'"
                    class="mob-subfilter"
                >
                    <AvailCheckbox />
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

        .m-catalog-search {
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

            .mob-subfilter:nth-child(even) {
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
