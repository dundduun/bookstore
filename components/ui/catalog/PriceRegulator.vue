<script setup lang="ts">
const filtersStore = useFiltersStore();
const priceRegulator = ref([filtersStore.minPrice, filtersStore.maxPrice]);
// ADD DEBOUNCED WATCHER, CHANGING PINIA STATE
</script>

<template>
    <div class="price-regulator">
        <span class="title">цена</span>

        <div class="price-slider">
            <ElSlider
                v-model="priceRegulator"
                range
                :show-tooltip="false"
                :min="filtersStore.minPrice"
                :max="filtersStore.maxPrice"
            />
        </div>

        <div class="control-inputs">
            <input
                class="min-price control-input"
                type="number"
                v-model="priceRegulator[0]"
            />

            <span> - </span>

            <input
                class="max-price control-input"
                type="number"
                v-model="priceRegulator[1]"
            />

            <button class="ok-button">OK</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.price-regulator {
    .title {
        font-size: 18px;

        @media (max-width: 980px) {
            display: none;
        }
    }

    .price-slider {
        margin-top: 10px;
        padding: 0 30px 0 10px;

        @media (max-width: 980px) {
            display: none;
        }
    }

    .control-inputs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 30px 0 10px;

        @media (max-width: 980px) {
            align-items: center;
            margin: 10px 0 28px 0;
        }

        .control-input {
            width: 100px;
            padding: 0 5px;
            border: 1px solid $catalog-filter-border;
            border-radius: 3px;
            font-family: $font-family;
            font-weight: 300;
            background-color: $catalog-filter;

            @media (max-width: 980px) {
                width: 27vw;
                height: 30px;
            }

            &:focus {
                outline: none;
            }
        }

        .ok-button {
            display: none;
            transition: 0.2s;
            height: 30px;
            padding: 0 15px;
            border: 1px solid $catalog-filter-border;
            border-radius: 3px;
            font-weight: 300;
            background-color: $catalog-filter;

            &:active {
                background-color: $active-ok-button;
            }

            @media (max-width: 980px) {
                display: block;
            }
        }

        .control-input::-webkit-outer-spin-button,
        .control-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
}
</style>
