<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import CatalogSearch from '@/components/ui/catalog/CatalogSearch.vue';

const selectItems = [
    { value: 'new-first', text: 'дата: сперва новые' },
    { value: 'old-first', text: 'дата: сперва старые' },
    { value: 'alphabetical-order', text: 'название: А-Я' },
    { value: 'alphabetical-reversed-order', text: 'название: Я-А' },
    { value: 'descending', text: 'цена: по убыванию' },
    { value: 'ascending', text: 'цена: по возрастанию' },
];

const model = ref();

onMounted(() => {
    model.value = 'new-first';
});

const activeFilter = ref('');
function activateFilter(clickedFilter: string) {
    if (!activeFilter.value) {
        activeFilter.value = clickedFilter;
    } else if (activeFilter.value !== clickedFilter) {
        activeFilter.value = clickedFilter;
    } else {
        activeFilter.value = '';
    }
}
</script>

<template>
    <div class="catalog-filter">
        <CatalogSearch class="catalog-search" />

        <Select class="select-filter" v-model="model">
            <SelectTrigger class="select-filter">
                <SelectValue :placeholder="selectItems[0].text" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem
                        class="select-item"
                        v-for="(item, index) in selectItems"
                        :value="item.value"
                        :key="index"
                    >
                        {{ item.text }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <div class="mob-filters">
            <div class="buttons">
                <button
                    class="filters"
                    :class="{
                        'active-filter': activeFilter === 'filtersButton',
                    }"
                    @click="activateFilter('filtersButton')"
                >
                    <img
                        src="@/assets/images/settings.svg"
                        class="settings-icon"
                    />
                    <span>фильтры</span>
                </button>

                <button
                    class="search"
                    :class="{
                        'active-filter': activeFilter === 'searchButton',
                    }"
                    @click="activateFilter('searchButton')"
                >
                    <img src="@/assets/images/loupe.svg" class="loupe-icon" />
                </button>
            </div>

            <div class="fickle-filters">
                <CatalogSearch v-show="activeFilter === 'searchButton'" class="m-catalog-search" />

                <div v-show="activeFilter === 'filtersButton'" class="sort-price-availability">
                    <button class="sort filter">
                        <span>сортировка</span>
                        <img class="chevron-icon" src="@/assets/images/left-chevron.png" />
                    </button>

                    <button class="price filter">
                        <span>цена</span>
                        <img class="chevron-icon" src="@/assets/images/left-chevron.png" />
                    </button>

                    <button class="availability filter">
                       <span>наличие</span>
                       <img class="chevron-icon" src="@/assets/images/left-chevron.png" />
                    </button>
                </div>
            </div>
        </div>
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
        width: 260px;
        height: 30px;
        padding-left: 10px;
        border: 1px solid $catalog-filter-border;
        border-radius: 3px;
        font-size: 16px;
        font-family: $font-family;
        font-weight: 300;
        background-color: $catalog-filter;

        @media (max-width: 980px) {
            display: none;
        }
    }

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

            .active-filter {
                filter: invert(60%) sepia(0%) saturate(55%) hue-rotate(157deg)
                    brightness(106%) contrast(92%);
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

            .sort-price-availability {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-top: 20px;
                border: 1px solid $m-filters-border;
                border-width: 1px 0px;

                .filter {
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 15px;

                    &.price {
                        border: 1px solid $m-filters-border;
                        border-width: 1px 0;
                    }

                    .chevron-icon {
                        height: 15px;
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
}
</style>
