<script setup lang="ts">
import PopupHint from '@/components/sections/LandingSearch/PopupHint.vue';
import type { SearchedProductResult } from '@/types';

defineProps<{
    containerWidth: string;
    searchedData: SearchedProductResult;
}>();

const emit = defineEmits(['hintsAffected']);

const hintsElement = ref();
const { focused: isHintsFocused } = useFocus(hintsElement);

watch(isHintsFocused, () => {
    emit('hintsAffected');
});
</script>

<template>
    <div class="landing-query-popup-hints" tabindex="0" ref="hintsElement">
        <PopupHint
            v-for="searchedInstance in searchedData"
            :searched-instance="searchedInstance"
        />
    </div>
</template>

<style scoped lang="scss">
.landing-query-popup-hints {
    position: absolute;
    z-index: 1;
    width: v-bind(containerWidth);
    margin: 150px 190px 0 0;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
        margin: 110px 0 0 0;
    }
}
</style>
