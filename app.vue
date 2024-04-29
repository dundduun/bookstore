<script setup lang="ts">
import '@/assets/styles/gilroy-font.scss';
import type { Database } from '@@/database.types';
const client = useSupabaseClient<Database>();

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

const data = ref('');
const { data: data1 } = await client.from('product').select('*');
data.value = data1![0].title;
</script>

<template>
    <div class="body">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
    overflow-x: hidden;
}

div.body {
    font-family: Gilroy;
    font-weight: normal;
}
</style>
