<script setup lang="ts">
import '@/assets/styles/global.scss';
import '@/assets/styles/gilroy-font.scss';

useHead({
    title: 'Masters Bookstore - книжный магазин',
    meta: [
        { name: 'author', content: 'dundduun' },
        {
            name: 'description',
            content:
                'Книжный магазин редких и эксклюзивных изданий по истории искусства, архитектуре, дизайну, моде и фотографии.',
        },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
});
</script>

<template>
    <div class="body">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
