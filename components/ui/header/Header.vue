<script setup lang="ts">
const isAuthorized = ref(false);

onMounted(() => {
    if (localStorage.getItem('bookshelf-token')) {
        isAuthorized.value = true;
    }
});
</script>

<template>
    <header class="header">
        <div class="container">
            <NuxtLink class="site-title" to="/">полка</NuxtLink>
            <nav v-if="!isAuthorized" class="nav">
                <NuxtLink class="nuxt-link" to="/books">книги</NuxtLink>
                <NuxtLink class="nuxt-link" to="/registration">регистрация</NuxtLink>
                <NuxtLink class="nuxt-link" to="/auth" >авторизация</NuxtLink>
            </nav>

            <div class="nav authorized" v-if="isAuthorized">
                <NuxtLink class="nuxt-link" to="/books">книги</NuxtLink>
                <NuxtLink class="nuxt-link" to="/logout">выход</NuxtLink>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.header {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;

    .container {
        max-width: 1206px;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
        margin: 0 22px;
        padding: 22px 0;
        border-bottom: 1px $primary solid;

        @media (max-width: 980px) {
            flex-direction: column;
        }

        .site-title {
            @include kill-link-decoration;
            padding: 5px;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            text-align: center;
            color: $primary;

            @media (max-width: 980px) {
                margin-top: 10px;
            }
        }

        .nav {
            max-width: 435px;
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 20px;
            font-size: 18px;
            padding-right: 5px;
            text-align: center;

            @media (max-width: 980px) {
                flex-direction: column;
                margin-top: 20px;
            }

            .nuxt-link {
                @include kill-link-decoration;
                color: $font-color;
                cursor: pointer;
            }
        }

        .authorized {
            max-width: 200px;
        }
    }
}
</style>
