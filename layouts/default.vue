<template>
    <div>
        <header>
            <div class="container">
                <span class="title">masters bookstore</span>
                <nav>
                    <NuxtLink class="link">книги</NuxtLink>
                    <NuxtLink class="link">искусство</NuxtLink>
                    <NuxtLink class="link">аксессуары</NuxtLink>
                    <NuxtLink class="link">контакты</NuxtLink>
                </nav>
            </div>
        </header>
        <slot />
    </div>
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
        margin: 0 22px;
        padding: 22px 0;
        border-bottom: 1px $primary solid;

        .title {
            padding: 3px;
            font-size: 24px;
            font-weight: 600;
            color: $primary;
            background-color: $primary-background;
        }

        nav {
            max-width: 435px;
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 18px;

            .link {
                color: $font-color;
            }
        }
    }
}
</style>
