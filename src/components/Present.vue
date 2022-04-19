<template>
  <div class="top">
    <BackArrow></BackArrow>
    <div class="title text-center">О библиотеке</div>
    
    <div class="text-subtitle-2 text-center">
      книги по программированию, графике и дизайну, управлению проектами
    </div>
    <v-container fluid>
      <v-row>
        <v-col class="col-12 col-sm-2">
          <v-img src="../assets/image/polka1.png" contain> </v-img>
        </v-col>
        <v-col class="text-subtitle-1">
          <ul>
            <li>
              <p>
                Мы бесплатная библиотека IT литературы <a target="_blank" href="https://qbit-club.com/#/"> "Клуба программирования
                Кубит"</a>
              </p>
            </li>
            <li>
              <p>
                Мы ходим сделать знания IT технологий доступнее, показать дорогу
                в программирование
              </p>
            </li>

            <li>
              Библиотечный фонд пополняется только за счет дарителей. Помочь в
              пополнении библиотеки можете и вы:
              <ul>
                <li>подарить книгу</li>
                <li>оплатить книгу</li>
                <li>
                  направить деньги в фонд приобретения книг на телефон 7 906 897
                  04 49
                </li>
                <li>или как-то иначе</li>
              </ul>
            </li>
          </ul>
        </v-col>
        <v-col class="col-sm-2 d-none d-sm-flex">
          <v-img src="../assets/image/polka2.png" contain> </v-img>
        </v-col>
      </v-row>
      <v-divider class="ma-4"></v-divider>
      <v-row>
        <v-col class="mb-16 text-center text-subtitle-2 ">
          <span>
            Адрес:
            <a 
            target="_blank"
              href="https://yandex.ru/maps/-/CCUFQGvSTC"
              >г.Глазов ул.Калинина, 2а</a
            >
          </span>
          <br>
          <span >
            Телефон: <a href="tel:+79068970429">79068970429</a>
          
          </span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import BackArrow from "./BackArrow.vue";
export default {
  components: {
    BackArrow,
  },
};
</script>


<style lang="scss" scoped>
p {
  opacity: 0.8;
}

</style>