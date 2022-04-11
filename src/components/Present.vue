<template>
  <div>
  <BackArrow></BackArrow>
    <v-container fluid>
      <div class="d-flex align-center flex-column">
        <div class="title mb-10"><h3>О библиотеке</h3></div>
        <v-row no-gutters>
          <v-col>
            <ol>
              <li>Библиотека Кубита - совместный проект клуба программирования "Кубит" и Золотовыым Дмитрием лично</li>
              <li>В библиотеке Кубита вы можете не тратить деньги на покупку новых книг</li>
              <li>Мы будем находить, собирать и выдавать книги по тематике программирования</li>
              <li>Вы сможете взять любую книгу из имеющихся на 21 день или отдать одну из своих</li>
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