<template>
  <div>
    <template>
      <v-tabs v-model="tab" background-color="transparent" color="black" grow>
        <v-tab color="black"> Правила </v-tab>
        <v-tab color="black"> Условия </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card color="secondary">
            <span color="black"><ol>
                <li>Относитесь к книгам бережно</li>
                <li>Книга выдается на 21 день</li>
                <li>Книга резервируется на 3 дня</li>
                <li>
                  Залоговая стоимость книги 5000 рублей. В случае невозврата
                  книги в течении 60 дней взимается залоговая стоимость
                </li>
              </ol></span>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="secondary">
            <span 
              >Lorem Ipsum - это текст-"рыба", часто используемый в печати и
              вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов
              на латинице с начала XVI века.</span
            >
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
}
.text{
  color: blackl;
}
</style>
