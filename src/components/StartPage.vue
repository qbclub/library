<template>
  <v-container class="startPage d-flex align-center">
    <v-row>
      <v-col
        class="
          col-12 col-sm-6
          d-flex
          justify-center
          flex-column
          align-center
        "
      >
        <p class="text-center text-md-h6 text-uppercase pt-16">
          книги по <br />
          программированию <br />
          графике и дизайну <br />
          управлению проектами
        </p>
        <v-btn text color="accent" to="/books">Вход</v-btn>
      </v-col>
      <v-col class="col-12 col-sm-6 ">
        <div class="backgroundImage"></div>
        <!-- <v-img
          loading="lazy"
          max-width="450"
          src="../assets/image/test.png"
        ></v-img> -->
        <div class="rules pb-8">
          <v-btn text color="accent" to="/present">О библиотеке</v-btn>
          <v-btn text color="accent" to="/rules">Правила</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.startPage {
  height: calc(100vh - 150px);
}
.backgroundImage {
  background: url(../assets/image/startPage.webp);
  height: calc(100vh / 2);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
}
.rules {
  text-align: center;
}
</style>