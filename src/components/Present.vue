<template>
  <div>
    <v-row>
      <v-col cols="1">
        <button onclick="history.back()">
          <div>
            <span class="subtitle-1 fi fi-rr-angle-left">Назад</span>
          </div>
        </button>
      </v-col>
    </v-row>
    <v-container fluid>
      <div class="d-flex align-center flex-column">
        <div class="title mb-10"><h3>О нас</h3></div>
        <v-row no-gutters>
          <v-col>
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
<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>