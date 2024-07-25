<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import CatalogSearch from '@/components/ui/CatalogSearch.vue';

const selectItems = [
    { value: 'new-first', text: 'Дата: сперва новые' },
    { value: 'old-first', text: 'Дата: сперва старые' },
    { value: 'alphabetical-order', text: 'Название: А-Я' },
    { value: 'alphabetical-reversed-order', text: 'Название: Я-А' },
    { value: 'descending', text: 'Цена: по убыванию' },
    { value: 'ascending', text: 'Цена: по возрастанию' },
];

const model = ref();

onMounted(() => {
    model.value = 'new-first';
});
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
                <button class="filters">
                    <img
                        src="@/assets/images/settings.svg"
                        class="settings-icon"
                    />
                    <span>Фильтры</span>
                </button>

                <button class="search">
                    <img src="@/assets/images/loupe.svg" class="loupe-icon" />
                </button>
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

                .settings-icon {
                    height: 25px;
                }
            }

            .search {
                padding: 10px 0 10px 10px;

                .loupe-icon {
                    width: 25px;
                    height: 25px;
                    filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(174deg)
                        brightness(95%) contrast(102%);
                }
            }
        }
    }
}
</style>
