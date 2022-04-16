<template>
  <div>
    <BackArrow></BackArrow>
       <div>
        <v-img
        loading="lazy"
        max-width="50"
        :aspect-ratio="10 / 14"
        src=../assets/image/3330314.png
        contain
       ></v-img>
      </div>
    <v-container fluid>
      <div class="d-flex align-center flex-column">
        <div class="title mb-10">Правила</div>
        <v-row no-gutters>
          <v-col class="body-1">
            <ol>
              <li>Читатели имеют право получать консультационную помощь в поиске и выборе источников информации</li>
              <li>Читатели обязаны бережно относится к книгам</li>
              <li>Читатели обязаны возвращать книги в установленные сроки</li>
              <li>Читатели обязаны не делать в книгах пометки, подчеркивания; не вырывать и не загибать страниц</li>
              <li>Читатели, ответственные за утрату или повреждение изданий, обязаны заменить их такими же изданиями или их копиями</li>
              <li>В случае невозврата книги ваш аккаун будет заблокирован</li>
            </ol>
          </v-col>
        </v-row>
      </div>
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
.title {
  text-align: center;
}
.text {
  color: blackl;
}
</style>
