<script setup lang="ts">
import '@/assets/styles/global.scss';
import SCSSVariables from 'assets/styles/variables.module.scss';

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `Полка | ${titleChunk}`
            : 'Полка - книжный магазин';
    },
});

useSeoMeta({
    description:
        'Книжный магазин редких и эксклюзивных изданий по истории искусства, архитектуре, дизайну, моде и фотографии.',
    author: 'dundduun',
});

const { primary } = SCSSVariables;
</script>

<template>
    <NuxtLoadingIndicator :color="primary" />

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
