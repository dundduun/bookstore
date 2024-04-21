<template>
    <div>
        <header>
            <div class="container">
                <span class="title">masters bookstore</span>
                <nav>
                    книги
                    искусство
                    аксессуары
                    контакты
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
        margin: 25px;

        .title {
            font-size: 24px;
            font-weight: 600;
            padding: 3px;
            color: $primary;
            background-color: $primary-background;
        }

        nav {
            font-size: 18px;
        }
    }
}
</style>