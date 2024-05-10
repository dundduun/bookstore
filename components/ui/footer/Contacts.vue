<script setup lang="ts">
import Address from '@/components/ui/Address.vue';

const addressData = [
    {
        cityName: 'Санкт-Петербург',
        phoneNumber: '+7 (921) 572-16-94',
        addresses: [
            {
                name: 'Masters Bookstore на Барочной',
                full:
                    'ул. Барочная, 6, стр. 1 (вход с ул. Большая Зеленина), ' +
                    'ЖК Futurist',
                workHours: '10:00–22:00',
            },
            {
                name: 'Masters Bookstore на ВО',
                full:
                    'Большой проспект В.О., 16 / 5-я линия В.О., 14 /' +
                    'Волжский переулок, 7',
                workHours: '11:00–21:00',
            },
        ],
    },
    {
        cityName: 'Москва',
        phoneNumber: '+7 (931) 213-83-73',
        addresses: [
            {
                name: 'Masters Bookstore на Малом Патриаршем',
                full: 'Малый Патриарший, 5, стр. 1',
                workHours: '10:00–22:00',
            },
            {
                name: 'Masters Bookstore в ТЦ «Bosco Vesna»',
                full: 'ул. Новый Арбат, 19',
                workHours: '10:00–22:00',
            },
        ],
    },
];
</script>

<template>
    <div class="contacts">
        <h2 class="title">контакты:</h2>

        <div class="all-addresses">
            <Address
                v-for="(address, index) in addressData"
                :key="index"
                :phone-number="address.phoneNumber"
                :city-name="address.cityName"
                :addresses="address.addresses"
            />
        </div>

        <span class="our-email">bookstore@masters-project.ru</span>

        <div class="links-to-socials">
            <a class="link"
               href="https://api.whatsapp.com/send/?phone=79312138373&text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9+%D0%B4%D0%B5%D0%BD%D1%8C%21+%D0%AF+%D1%85%D0%BE%D1%82%D0%B5%D0%BB+%D0%B1%D1%8B+%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C+%D0%B2%D0%BE%D1%82+%D1%8D%D1%82%D1%83+%D0%BA%D0%BD%D0%B8%D0%B3%D1%83&type=phone_number&app_absent=0"
            >
                <img class="img"
                    src="@/assets/images/white-whatsapp.png"
                    alt="Write to us in whatsapp"
                />
            </a>

            <a class="link" href="https://t.me/mastersbookstore">
                <img class="img"
                    src="@/assets/images/white-telegram.png"
                    alt="Subscribe to us in telegram"
                />
            </a>

            <a class="link" href="https://www.instagram.com/masters_bookstore/">
                <img class="img"
                    src="@/assets/images/white-instagram.png"
                    alt="Subscribe to us in instagram"
                />
            </a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.contacts {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5%;
    color: white;
    font-weight: 300;
    background-color: $background;

    @media (max-width: 900px) {
        width: 100%;
        height: 73%;
    }

    .title {
        margin: 0;
        font-size: 40px;
        font-weight: normal;
        color: $primary;
    }

    .all-   addresses {
        width: 350px;
        max-width: 100%;
    }

    .our-email {
        margin-top: 60px;
    }

    .links-to-socials {
        width: 95px;
        display: flex;
        justify-content: space-between;
        margin-top: 50px;

        .link {

            .img {
                height: 27px;
                width: 27px;
            }
        }
    }
}
</style>
