<script setup lang="ts">
import type { SearchedInstanceResult } from '@/types';
import type { Database } from '@@/database.types';

const client = useSupabaseClient<Database>();
const productImage = ref({ publicUrl: '' });

const props = defineProps<{
    searchedInstance: SearchedInstanceResult;
}>();

function fetchImage() {
    if (props.searchedInstance.pictures[0]) {
        const { data } = client.storage
            .from('product_images')
            .getPublicUrl(props.searchedInstance.pictures[0]);
        productImage.value = data;
    }
}

onMounted(() => {
    fetchImage();
});

onBeforeUpdate(() => {
    productImage.value = { publicUrl: '' };
    fetchImage();
});

const formalizedDescription = props.searchedInstance.description.replaceAll(
    '\\',
    '',
);

const searchQuery = inject('searchQuery') as Ref<string>;
const searchRegexp = new RegExp(searchQuery.value, 'i');
const titleSqMatchNumber =
    props.searchedInstance.title.search(searchRegexp);

const startOfHint = ref('');
const sqAtHint = ref('');
const endOfHint = ref('');
const isSqAtTitle = ref(false);
const isSqAtDescription = ref(false);

const { width } = useWindowSize();
let maxStartCharsCount = 60;
if (width.value > 600 && width.value < 1200) {
    maxStartCharsCount = (width.value - 385) / 20;
} else if (width.value < 600) {
    maxStartCharsCount = (width.value - 200) / 20;
}

function splitTextToTernary(
    fullText: string,
    firstLetterMatch: number,
    phrase: string,
) {
    let startOfText = '';
    if (firstLetterMatch > maxStartCharsCount) {
        const startOfTextWords = fullText
            .slice(
                firstLetterMatch - maxStartCharsCount,
                firstLetterMatch,
            )
            .split(' ');
        startOfText = '...' + startOfTextWords
            .splice(-(startOfTextWords.length - 1))
            .join(' ');
    } else {
        startOfText = fullText.slice(0, firstLetterMatch);
    }
    const soughtPhrase = fullText.slice(
        firstLetterMatch,
        firstLetterMatch + phrase.length,
    );
    const endOfPhrase = fullText.slice(firstLetterMatch + phrase.length);

    return {
        startOfText: startOfText,
        soughtPhrase: soughtPhrase,
        endOfText: endOfPhrase,
    };
}

if (titleSqMatchNumber !== -1) {
    isSqAtTitle.value = true;
    ({
        startOfText: startOfHint.value,
        soughtPhrase: sqAtHint.value,
        endOfText: endOfHint.value,
    } = splitTextToTernary(
        props.searchedInstance.title,
        titleSqMatchNumber,
        searchQuery.value,
    ));
} else {
    const descriptionSearchQueryMatchNumber =
        formalizedDescription.search(searchRegexp);
    if (descriptionSearchQueryMatchNumber !== 1) {
        isSqAtDescription.value = true;
        ({
            startOfText: startOfHint.value,
            soughtPhrase: sqAtHint.value,
            endOfText: endOfHint.value,
        } = splitTextToTernary(
            formalizedDescription,
            descriptionSearchQueryMatchNumber,
            searchQuery.value,
        ));
    }
}
</script>

<template>
    <NuxtLink
        :to="{ name: 'product-id', params: { id: searchedInstance.id } }"
        class="popup-hint"
    >
        <div class="img-container">
            <img
                v-if="productImage.publicUrl"
                :src="productImage.publicUrl"
                class="product-image"
            />
        </div>

        <div class="text">
            <span v-if="!isSqAtTitle" class="title">
                {{ searchedInstance.title }}
            </span>

            <span
                v-if="isSqAtTitle || isSqAtDescription"
                :class="{
                    title: isSqAtTitle,
                    description: isSqAtDescription,
                }"
            >
                {{ startOfHint
                }}<span class="search-query-at-text">{{
                    sqAtHint
                }}</span
                >{{ endOfHint }}
            </span>

            <span v-if="!isSqAtDescription" class="description">
                {{ formalizedDescription }}
            </span>

            <span class="price"> {{ searchedInstance.price }} р. </span>
        </div>
    </NuxtLink>
</template>

<style scoped lang="scss">
.popup-hint {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: 0.2s;

    @media (hover: hover) {
        &:hover {
            background-color: $hint-background-light-gray;
        }
    }

    @media (hover: none) {
        &.active {
            background-color: $hint-background-light-gray;
        }
    }

    .img-container {
        width: 72px;
        height: 72px;
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border: 1px $border-light-gray solid;

        .product-image {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    .text {
        max-width: calc(100% - 105px);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 15px;
        font-size: 16px;

        .search-query-at-text {
            color: $primary;
        }

        .title {
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 600;
        }

        .description {
            max-width: 100%;
            max-height: 19px;
            margin-top: 6px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 300;
        }

        .price {
            margin-top: 6px;
            font-weight: 600;
        }
    }
}
</style>
