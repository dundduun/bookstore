<script setup lang="ts">
import CatalogSearch from '@/components/ui/catalog/CatalogSearch.vue';
import MobFilters from '@/components/ui/catalog/MobFilters.vue';

const sortOptions = [
    { text: 'дата: сперва новые' },
    { text: 'дата: сперва старые' },
    { text: 'название: А-Я' },
    { text: 'название: Я-А' },
    { text: 'цена: по убыванию' },
    { text: 'цена: по возрастанию' },
];
const sort = ref();
const { focused: isSortFocused } = useFocus(sort);

const isPlaceholderClicked = ref(false);

function blurOnSecondClick() {
    if (isPlaceholderClicked.value && isSortFocused.value) {
        isSortFocused.value = false;
        isPlaceholderClicked.value = false;
    } else {
        isPlaceholderClicked.value = true;
    }
}

watch(isSortFocused, () => {
    if (isPlaceholderClicked.value && !isSortFocused.value) {
        isPlaceholderClicked.value = false;
    }
});

const placeholderText = ref('сортировка');
const activeSort = ref('');
function editPlaceholderText(newText: string) {
    placeholderText.value = newText;
    activeSort.value = newText;
}

</script>

<template>
    <div class="catalog-filter">
        <CatalogSearch class="catalog-search" />

        <div
            class="sort"
            tabindex="0"
            ref="sort"
            @click="blurOnSecondClick()"
        >
            <div
                class="placeholder"
            >
                <span>{{ placeholderText }}</span>
                <img
                    class="opening-chevron"
                    src="@/assets/images/left-chevron.png"
                    alt="Раскрыть"
                />
            </div>

            <Transition name="fade-in">
                <div
                    v-if="isSortFocused"
                    class="sort-options">
                    <div
                        v-for="option in sortOptions"
                        @click="editPlaceholderText(option.text)"
                        :class="['option', { active: activeSort === option.text }]"
                    >
                        {{ option.text }}
                    </div>
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

            .option {
                display: flex;
                align-items: center;
                transition: 0.2s;
                border-radius: 3px;
                height: 31px;
                padding: 0 10px;
                background: white;
                cursor: pointer;

                &:hover {
                    background-color: $catalog-filter;
                }

                &.active {
                    background: $active-ok-button;
                }
            }
        }
    }

    .fade-in-enter-active {
        transition: opacity 0.3s ease;
    }

    .fade-in-leave-active {
        transition: opacity 0.1s ease;
    }

    .fade-in-enter-from,
    .fade-in-leave-to {
        opacity: 0;
    }
}
</style>
