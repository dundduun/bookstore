<script setup lang="ts">
import type { Database } from '@@/database.types';
import type { SearchedProductResult } from '@/types';
import QueryPopupHints from '@/components/sections/LandingSearch/QueryPopupHints.vue';

const client = useSupabaseClient<Database>();

const searchQuery = ref('');
const searchedData = ref<SearchedProductResult>([]);
const similarQueriesChecker = ref('');
const allowedUpdatesToDatabase = ref(7);
const isSearchLoading = ref(false);
watchDebounced(
    searchQuery,
    async (newSearchQuery) => {
        if (newSearchQuery) {
            if (similarQueriesChecker.value !== newSearchQuery) {
                isSearchLoading.value = true;
                similarQueriesChecker.value = newSearchQuery;

                const { data } = await client.rpc('search_product', {
                    search_term: newSearchQuery,
                });
                searchedData.value = data!;

                if (searchedData.value[0]) {
                    if (newSearchQuery.length > 2) {
                        if (allowedUpdatesToDatabase.value) {
                            await client.rpc('increase_product_search_rank', {
                                update_term: newSearchQuery,
                            });
                            allowedUpdatesToDatabase.value--;
                        }
                    }
                }
                isSearchLoading.value = false;
            }
        } else {
            searchedData.value = [];
        }
    },
    { debounce: 700, maxWait: 5000 },
);

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

function hintsAffected() {
    isHintsFocused.value = !isHintsFocused.value;
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
    inputElement.value.focus();
}
</script>

<template>
    <div class="landing-search">
        <form class="form" @submit.prevent>
            <input
                v-model="searchQuery"
                ref="inputElement"
                class="input"
                type="text"
                placeholder="название / описание книги"
            />

            <img class="loupe-icon" src="@/assets/images/loupe.svg" />

            <Transition class="icon-transition" name="search-icons">
                <img
                    v-if="isSearchLoading"
                    class="loading-icon"
                    src="@/assets/images/search-loading.svg"
                />

                <img
                    v-else-if="searchQuery"
                    @click="clickCrossIcon"
                    class="cross-icon"
                    src="@/assets/images/search-cross.svg"
                />
            </Transition>

            <button class="button">искать</button>
        </form>

        <Transition name="hints" appear>
            <QueryPopupHints
                v-show="isHintsVisible"
                ref="hintsElement"
                :container-width="inputWidth"
                :searched-data="searchedData"
                @hints-affected="hintsAffected"
            />
        </Transition>
    </div>
</template>

<style scoped lang="scss">
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
    display: flex;
    justify-content: center;
    margin-top: 25px;
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

        .button {
            height: 60px;
            width: 170px;
            flex: 0 0 auto;
            font-size: 16px;
            border: 2px $background solid;
            cursor: pointer;
            font-family: $font-family;
            color: white;
            background-color: $background;

            @media (max-width: 600px) {
                width: 100%;
            }

            @media (hover: hover) {
                transition:
                    color 0.3s,
                    background-color 0.3s;

                &:hover {
                    color: $background;
                    background-color: $primary;
                }
            }

            @media (hover: none) {
                transition:
                    color 0.1s,
                    background-color 0.1s;

                &:active {
                    color: $background;
                    background-color: $primary;
                }
            }
        }
    }

    .search-icons-enter-active,
    .search-icons-leave-active,
    .hints-enter-active,
    .hints-leave-active {
        transition: opacity 0.3s ease;
    }

    .search-icons-enter-from,
    .search-icons-leave-to,
    .hints-enter-from,
    .hints-leave-to {
        opacity: 0;
    }
}
</style>
