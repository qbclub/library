<template>
  <div>
    <div class="d-flex align-center flex-column pa-10 secondary">
      <div class="title">
        Lorem Ipsum - это текст-"рыба", часто используемый в печати и
        вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на
        латинице с начала XVI века.
      </div>
    </div>
    <div class="d-flex align-center flex-column secondary">
      <div class="title"><h2>Правила</h2></div>
    </div>

    <v-container>
      <v-row class="align-center justify-center" no-gutters>
        <v-col cols="12" md="6">
          <ol>
            <li>Относитесь к книгам бережно</li>
            <li>Книга выдается на 21 день</li>
            <li>Книга резервируется на 3 дня</li>
            <li>Залоговая стоимость книги 5000 рублей. В случае невозврата книги в течении 60 дней взимается залоговая стоимость</li>
          </ol>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>