<script setup lang="ts">
import '@/assets/styles/gilroy-font.scss';
import type { Database } from './database.types';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://jbovtfmcskxgtxmagpsm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impib3Z0Zm1jc2t4Z3R4bWFncHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTIwNzUsImV4cCI6MjAyOTcyODA3NX0.KhnRq6v5LMGNSnPW2hIZsUXO6kqUimxhxS-GwgT45Jo')
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

const data = ref('')
const { data: data1 } = await client.from('product').select('*');
data.value = data1![0].title;
</script>

<template>
    <div class="body">
        <NuxtLayout> </NuxtLayout>
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
