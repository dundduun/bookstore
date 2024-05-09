<template>
    <div class="landing-search">
        <form class="container">
            <input
                class="search-input"
                type="text"
                placeholder="название книги / автор"
                required
            />

            <img class="loupe-icon" src="@/assets/images/loupe.svg" />

            <button class="search-action">искать</button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.landing-search {
    height: 240px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 25px;
    background-color: $primary;

    .container {
        height: 100%;
        width: 100%;
        max-width: 1240px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding: 0 25px;

        @media (max-width: 600px) {
            flex-direction: column;
        }

        input {
            height: 60px;
            width: 970px;
            flex: 0 1 auto;
            padding: 0 0 0 65px;
            border: 2px $background solid;
            font-size: 16px;
            font-family: Gilroy, Arial, sans-serif;
            color: white;
            background-color: inherit;

            &::placeholder {
                color: white;
            }

            &:focus {
                outline: none;
            }

            @media (max-width: 600px) {
                width: 100%;
            }
        }

        .loupe-icon {
            position: absolute;
            margin-right: 1085px;
            height: 25px;
            width: auto;

            @media (max-width: 1230px) {
                left: 50px;
                margin-right: 0;
            }

            @media (max-width: 600px) {
                margin-bottom: 80px;
            }
        }

        .search-action {
            height: 60px;
            width: 170px;
            flex: 0 0 auto;
            font-size: 16px;
            border: 2px $background solid;
            cursor: pointer;
            font-family: Gilroy, Arial, sans-serif;
            color: white;
            background-color: $background;

            @media (max-width: 600px) {
                width: 100%;
            }

            @media (hover: hover) {
                transition:
                    color 0.3s,
                    background-color 0.3s;

                &:hover {
                    color: $background;
                    background-color: $primary;
                }
            }

            @media (hover: none) {
                transition:
                    color 0.1s,
                    background-color 0.1s;

                &:active {
                    color: $background;
                    background-color: $primary;
                }
            }
        }
    }
}
</style>
