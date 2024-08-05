<script setup lang="ts">
const props = defineProps<{
    minPrice: number;
    maxPrice: number;
}>();

const priceRegulator = ref([props.minPrice, props.maxPrice]);
</script>

<template>
    <div class="price-regulator">
        <span class="title">цена</span>

        <div class="price-slider">
            <ElSlider
                v-model="priceRegulator"
                range
                :show-tooltip="false"
                :min="props.minPrice"
                :max="props.maxPrice"
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
        </div>
    </div>
</template>

<style scoped lang="scss">
.price-regulator {
    .title {
        font-size: 18px;
    }

    .price-slider {
        margin-top: 10px;
        padding: 0 30px 0 10px;
    }

    .control-inputs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 30px 0 10px;

        .control-input {
            width: 100px;
            padding: 0 5px;
            border: 1px solid $catalog-filter-border;
            border-radius: 3px;
            font-family: $font-family;
            font-weight: 300;
            background-color: $catalog-filter;

            &:focus {
                outline: none;
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
