<template>
    <div class="catalog-filter">
        <input class="search-input" placeholder="Поиск" type="text" />
        <button class="search-button">
            <img
                src="@/assets/images/loupe.svg"
                alt="Искать"
                class="loupe-icon"
            />
        </button>
    </div>
</template>

<style scoped lang="scss">
.catalog-filter {
    width: 230px;
    height: 30px;
    display: flex;

    .search-input {
        padding: 0 0 0 10px;
        border: 1px solid $catalog-filter-border;
        border-right: none;
        border-radius: 3px 0 0 3px;
        font-size: 16px;
        font-family: $font-family;
        font-weight: 300;
        background-color: $catalog-filter;

        &:focus {
            outline: none;
        }
    }

    .search-button {
        display: flex;
        align-items: center;
        background-color: $catalog-filter;
        border: 1px solid $catalog-filter-border;
        border-radius: 0 3px 3px 0;

        .loupe-icon {
            height: 20px;
            width: 20px;
            filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(304deg) brightness(97%) contrast(103%);
        }
    }
}
</style>
