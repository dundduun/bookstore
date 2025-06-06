<script setup lang="ts">
import type { Database } from '@@/database.types';
import type { SearchedProductResult } from '@/types';
import QueryPopupHints from '@/components/sections/landing-search/QueryPopupHints.vue';

const client = useSupabaseClient<Database>();

const searchQuery = ref('');
const searchedData = ref<SearchedProductResult>([]);
const previousQuery = ref('');
const isSearchLoading = ref(false);
watchDebounced(
    searchQuery,
    async (newSearchQuery) => {
        if (
            previousQuery.value.toLowerCase() !== newSearchQuery.toLowerCase()
        ) {
            searchedData.value = [];
            previousQuery.value = newSearchQuery;
            if (newSearchQuery) {
                isSearchLoading.value = true;

                const { data } = await client.rpc('search_product', {
                    search_term: newSearchQuery,
                });
                searchedData.value = data!;
                isSearchLoading.value = false;

                if (searchedData.value[0] && newSearchQuery.length > 4) {
                    await $fetch(
                        `api/updateSearchProductStats/${newSearchQuery}`,
                    );
                }
                isSearchLoading.value = false;
            }
        }
    },
    { debounce: 700, maxWait: 5000 },
);
provide('searchQuery', searchQuery);

const inputElement = ref();
const inputWidth = ref('');
useResizeObserver(inputElement, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;
    inputWidth.value = width + 135 + 'px';
});

const hintsElement = ref();
const isHintsVisible = ref(true);
const isHintsFocused = ref(false);
const { focused: isInputFocused } = useFocus(inputElement);
function hintsAffected(isComponentsHintsFocused: boolean) {
    isHintsFocused.value = isComponentsHintsFocused;
}

watchDebounced(
    [isInputFocused, isHintsFocused],
    ([isInputFocused, isHintsFocused]) => {
        isHintsVisible.value = isInputFocused || isHintsFocused;
    },
    { debounce: 1 },
);

function clickCrossIcon() {
    searchQuery.value = '';
    searchedData.value = [];
    inputElement.value.focus();
}

function clickSearchButton() {
    inputElement.value.focus();
}
</script>

<template>
    <div class="landing-search">
        <form class="form" @submit.prevent>
            <input
                v-model="searchQuery"
                ref="inputElement"
                @keydown.esc="inputElement.blur"
                class="input"
                type="text"
                placeholder="название / описание книги"
            />

            <img
                class="loupe-icon"
                src="@/assets/images/loupe.svg"
                alt="Поиск"
            />

            <Transition class="icon-transition" name="fade">
                <img
                    v-if="isSearchLoading"
                    class="loading-icon"
                    src="@/assets/images/search-loading.svg"
                    alt="Загрузка..."
                />

                <img
                    v-else-if="searchQuery"
                    @click="clickCrossIcon"
                    class="cross-icon"
                    src="@/assets/images/cross-icon.svg"
                    alt="Стереть"
                />
            </Transition>

            <button @click="clickSearchButton" class="search-button">искать</button>
        </form>

        <Transition name="fade" appear>
            <QueryPopupHints
                v-if="previousQuery && !isSearchLoading"
                v-show="isHintsVisible && searchQuery"
                ref="hintsElement"
                :container-width="inputWidth"
                :searched-data="searchedData"
                @hints-affected="hintsAffected"
            />
        </Transition>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

@mixin absolutely-positioned-search-cross-and-loading {
    position: absolute;
    width: 21px;
    height: 21px;
    margin-left: 710px;

    @media (max-width: 1230px) {
        right: 240px;
        margin-right: 0;
    }

    @media (max-width: 600px) {
        right: 50px;
        margin-bottom: 80px;
    }
}

@keyframes spin {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
}

.landing-search {
    height: 240px;
    width: 100%;
    max-width: 5000px;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    background-color: $primary;

    .form {
        height: 100%;
        width: 100%;
        max-width: 1240px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding: 0 25px;

        @media (max-width: 600px) {
            flex-direction: column;
        }

        .input {
            height: 60px;
            width: 970px;
            flex: 0 1 auto;
            padding: 0 65px;
            border: 2px $background solid;
            font-size: 16px;
            font-family: $font-family;
            color: white;
            background-color: inherit;

            &::placeholder {
                color: white;
            }

            &:focus {
                outline: none;
            }

            @media (max-width: 600px) {
                width: 100%;
            }
        }

        .loupe-icon {
            position: absolute;
            height: 25px;
            width: auto;
            margin-right: 1085px;

            @media (max-width: 1230px) {
                left: 50px;
                margin-right: 0;
            }

            @media (max-width: 600px) {
                margin-bottom: 80px;
            }
        }

        .cross-icon {
            @include absolutely-positioned-search-cross-and-loading;
            cursor: pointer;
        }

        .loading-icon {
            @include absolutely-positioned-search-cross-and-loading;
            animation: spin 1200ms;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        .search-button {
            height: 60px;
            width: 170px;
            flex: 0 0 auto;
            font-size: 16px;
            font-weight: 500;
            @include hover-button($background, white, $primary);

            @media (max-width: 600px) {
                width: 100%;
            }
        }
    }
}
</style>
