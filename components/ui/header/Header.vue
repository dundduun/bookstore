<template>
    <header>
        <div class="container">
            <h1 class="site-title">masters bookstore</h1>
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

        @media (max-width: 980px) {
            flex-direction: column;
        }

        .site-title {
            padding: 5px;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            text-align: center;
            color: $primary;

            @media (max-width: 980px) {
                margin-top: 10px;
            }
        }

        nav {
            max-width: 435px;
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 20px;
            font-size: 18px;
            text-align: center;

            @media (max-width: 980px) {
                flex-direction: column;
                margin-top: 20px;
            }

            .nuxt-link {
                color: $font-color;
            }
        }
    }
}
</style>
