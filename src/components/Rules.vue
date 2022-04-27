<template>
  <div>
    <BackArrow></BackArrow>
    <div class="title text-center">Правила</div>
    
    <v-container fluid>
      <v-row>
        <v-col class="col-sm-2">
          <v-img src="../assets/image/polka1.png" contain> </v-img>
        </v-col>
        <v-col class="text-subtitle-1">
          <p>
            Для того чтобы <b>взять книгу</b> , ее надо зарезервировать в
            приложении.
          </p>
          <p>Книга ждёт вас <b>3 дня</b> , затем резерв книги снимается.</p>
          <p>
            <b>Получить</b> книгу можно в клубе "Кубит", предварительно
            согласовав время и пройдя регистрацию.
          </p>
          <p>
            У вас есть <b>21 день</b> на изучение полученной книги, после чего
            она должна быть возвращена.
          </p>
          <p class="pb-10">
            Мы надеемся на <b>бережное отношение</b> к книгам, но если книга
            была вами утеряна или пришла в негодность, ее полную
            <b>стоимость</b> необходимо будет <b>возместить</b> .
          </p>
        </v-col>
         <v-col class="col-sm-2 d-none d-sm-flex">
          <v-img src="../assets/image/polka2.png" contain> </v-img>
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
p{
  opacity: 0.8;
}
</style>
