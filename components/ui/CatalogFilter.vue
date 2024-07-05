<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
        <div class="search-input-button-container">
            <input class="search-input" placeholder="Поиск" type="text" />
            <button class="search-button">
                <img
                    src="@/assets/images/loupe.svg"
                    alt="Искать"
                    class="loupe-icon"
                />
            </button>
        </div>

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
    </div>
</template>

<style scoped lang="scss">
.catalog-filter {
    height: 30px;
    display: flex;
    gap: 20px;

    .search-input-button-container {
        height: 100%;
        display: flex;

        .search-input {
            width: 230px;
            padding-left: 10px;
            border: 1px solid $catalog-filter-border;
            border-right: none;
            border-radius: 3px 0 0 3px;
            font-size: 16px;
            font-family: $font-family;
            font-weight: 300;
            background-color: $catalog-filter;

            &:focus {
                outline: none;
            }
        }

        .search-button {
            width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $catalog-filter;
            border: 1px solid $catalog-filter-border;
            border-radius: 0 3px 3px 0;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                .loupe-icon {
                    filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(174deg)
                        brightness(95%) contrast(102%);
                }
            }

            .loupe-icon {
                height: 20px;
                width: 20px;
                filter: invert(48%) sepia(0%) saturate(0%) hue-rotate(220deg)
                    brightness(94%) contrast(93%);
                transition: 0.2s;
            }
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
    }
}
</style>
