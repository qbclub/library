<template>
  <div>
    <BackArrow></BackArrow>
    <v-container fluid>
      <div class="d-flex align-center flex-column">
        <div class="title mb-10">Правила</div>
        <v-row no-gutters>
          <v-col class="body-1">
            <ol>
              <li>Относитесь к книгам бережно</li>
              <li>Книга выдается на ровно 21 день</li>
              <li>Книга резервируется на 3 дня</li>
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
</style>