<template>
  <v-container class="startPage d-flex align-center ">
    <v-row>
      <v-col
        class="
          col-12 col-sm-6
          mt-16
          d-flex
          justify-center
          flex-column
          align-center
        "
      >
        <p class="text-center text-subtitle-2 text-sm-h5 text-uppercase pt-10">
          программирование <br />
          графика и дизайн <br />
          управление проектами
        </p>
        <v-btn text color="accent" to="/books">Вход</v-btn>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <div class="backgroundImage"></div>
        <!-- <v-img
          loading="lazy"
          max-width="450"
          src="../assets/image/test.png"
        ></v-img> -->
        <div class="rules"><v-btn text color="accent" to="/rules">Правила пользования библиотекой</v-btn></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.startPage {
  height: calc(100vh - 300px);
}
.backgroundImage {
  background: url(../assets/image/test.png);
  height: calc(100vh / 2.5);
  background-position: center;
  background-repeat: no-repeat;
  background-size:contain;
  position: relative;
}
.rules{
  text-align: center;
}
</style>