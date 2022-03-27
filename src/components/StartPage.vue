<template>
  <v-containner class="startPage d-flex align-center">
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
        <p class="text-center text-h5 text-uppercase mt-20">
          программирование <br />
          графика и дизайна <br />
          управление проектами
        </p>
        <v-btn text color="accent" to="/books">Вход</v-btn>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <v-img
          loading="lazy"
          max-width="450"
          src="../assets/image/test.png"
        ></v-img>
      </v-col>
    </v-row>
  </v-containner>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.startPage {
  height: calc(100vh - 200px);
}

</style>