<template>
    <header>
        <div class="container">
            <span class="site-title">masters bookstore</span>
            <nav>
                <NuxtLink class="nuxt-link">книги</NuxtLink>
                <NuxtLink class="nuxt-link">искусство</NuxtLink>
                <NuxtLink class="nuxt-link">аксессуары</NuxtLink>
                <NuxtLink class="nuxt-link">контакты</NuxtLink>
            </nav>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
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

        .site-title {
            padding: 5px;
            font-size: 24px;
            font-weight: 600;
            color: $primary;
        }

        nav {
            max-width: 435px;
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 18px;

            .nuxt-link {
                color: $primary-font-color;
            }
        }
    }
}
</style>
