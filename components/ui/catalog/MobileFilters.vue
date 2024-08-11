<script setup lang="ts">
import CatalogSearch from '@/components/ui/catalog/CatalogSearch.vue';

const activeFilter = ref('');
function toggleFilter(clickedFilter: string) {
    if (!activeFilter.value || activeFilter.value !== clickedFilter) {
        activeFilter.value = clickedFilter;
    } else {
        activeFilter.value = '';
    }
}

const activeSecondaryFilter = ref('');
function toggleSecondaryFilter(clickedFilter: string) {
    if (
        !activeSecondaryFilter.value ||
        activeSecondaryFilter.value !== clickedFilter
    ) {
        activeSecondaryFilter.value = clickedFilter;
    } else {
        activeSecondaryFilter.value = '';
    }
}
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

            <div
                v-show="activeFilter === 'filtersButton'"
                class="secondary-filters"
            >
                <div
                    class="sort filter"
                    @click="toggleSecondaryFilter('sort')"
                >
                    <div
                        class="filter-inner"
                        :class="{
                            'active-filter': activeSecondaryFilter === 'sort',
                        }"
                    >
                        <span>сортировка</span>
                        <img
                            src="@/assets/images/left-chevron.png"
                            class="chevron-icon"
                            :class="{
                                'rotate-270': activeSecondaryFilter === 'sort',
                            }"
                        />
                    </div>
                </div>

                <div
                    class="price filter"
                    @click="toggleSecondaryFilter('price')"
                >
                    <div
                        class="filter-inner"
                        :class="{
                            'active-filter': activeSecondaryFilter === 'price',
                        }"
                    >
                        <span>цена</span>
                        <img
                            class="chevron-icon"
                            src="@/assets/images/left-chevron.png"
                            :class="{
                                'rotate-270': activeSecondaryFilter === 'price',
                            }"
                        />
                    </div>
                </div>

                <div
                    class="filter"
                    @click="toggleSecondaryFilter('availability')"
                >
                    <div
                        class="filter-inner"
                        :class="{
                            'active-filter':
                                activeSecondaryFilter === 'availability',
                        }"
                    >
                        <span>наличие</span>
                        <img
                            class="chevron-icon"
                            src="@/assets/images/left-chevron.png"
                            :class="{
                                'rotate-270':
                                    activeSecondaryFilter === 'availability',
                            }"
                        />
                    </div>
                </div>
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

        .secondary-filters {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            border: solid $m-filters-border;
            border-width: 1px 0;

            .filter {
                height: 45px;
                font-size: 15px;
                cursor: pointer;

                &.price {
                    border: solid $m-filters-border;
                    border-width: 1px 0;
                }

                .filter-inner {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: 0.2s;

                    .chevron-icon {
                        height: 15px;
                        transform: rotate(180deg);
                        transition: 0.2s;
                    }
                }
            }
        }
    }
}

.active-filter {
    filter: invert(60%) sepia(0%) saturate(55%) hue-rotate(157deg)
        brightness(106%) contrast(92%);

    .chevron-icon {
        transform: rotate(270deg) !important;
    }
}
</style>
