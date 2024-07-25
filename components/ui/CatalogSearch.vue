<script setup lang="ts">
// defineProps<{
//     inputWidth: string,
// }>();
</script>

<template>
    <div class="search-input-button-container">
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
.search-input-button-container {
    height: 100%;
    display: flex;

    .search-input {
        width: calc(100% - 30px);
        padding-left: 10px;
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
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $catalog-filter;
        border: 1px solid $catalog-filter-border;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            .loupe-icon {
                filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(174deg)
                    brightness(95%) contrast(102%);
            }
        }

        .loupe-icon {
            height: 20px;
            width: 20px;
            filter: invert(48%) sepia(0%) saturate(0%) hue-rotate(220deg)
                brightness(94%) contrast(93%);
            transition: 0.2s;
        }
    }
}
</style>
