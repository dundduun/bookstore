<script setup lang="ts">
import PopupHint from '@/components/sections/landing-search/PopupHint.vue';
import type { SearchedProductResult } from '@/types';

defineProps<{
    containerWidth: string;
    searchedData: SearchedProductResult;
}>();

const emit = defineEmits(['hintsAffected']);

const hintsElement = ref();
const { focused: isHintsFocused } = useFocus(hintsElement);

watch(isHintsFocused, (isHintsFocused) => {
    emit('hintsAffected', isHintsFocused);
});
</script>

<template>
    <div
        class="landing-query-popup-hints"
        tabindex="0"
        ref="hintsElement"
        @keydown.esc="isHintsFocused = false"
    >
        <div v-if="searchedData[0]" class="hints-container">
            <PopupHint
                v-for="searchedInstance in searchedData"
                :searched-instance="searchedInstance"
            />
        </div>

        <div v-else class="nothing-found">Ничего не найдено</div>
    </div>
</template>

<style scoped lang="scss">
.landing-query-popup-hints {
    position: absolute;
    z-index: 2;
    width: v-bind(containerWidth);
    margin: 150px 190px 0 0;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
    }

    @media (max-width: 600px) {
        margin: 110px 0 0 0;
    }

    .nothing-found {
        padding: 20px;
        font-size: 20px;
        font-weight: 300;
    }
}
</style>
