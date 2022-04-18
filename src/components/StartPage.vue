<template>
  <v-container class="startPage d-flex align-center">
    <v-row>
      <v-col
        class="col-12 col-sm-6 d-flex justify-center flex-column align-center"
      >
        <p class="text-center text-md-h6 text-uppercase pt-16">
          книги по <br />
          программированию <br />
          графике и дизайну <br />
          управлению проектами
        </p>
        <v-btn text color="accent" to="/books">Вход</v-btn>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <div>
          <div class="clockbox">
            <svg
              id="clock"
              xmlns="http://www.w3.org/2000/svg"
              width="600"
              height="600"
              viewBox="0 0 600 600"
            >
              <g id="face">
                <rect
                  x="25"
                  y="25"
                  width="550"
                  height="550"
                  fill="none"
                  stroke="black"
                  stroke-width="7"
                />
                <path
                  class="hour-marks"
                  d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"
                />
                <circle class="mid-circle" cx="300" cy="300" r="16.2" />
              </g>
              <g id="hour">
                <path class="hour-arm" d="M300.5 298V142" />
                <circle class="sizing-box" cx="300" cy="300" r="253.9" />
              </g>
              <g id="minute">
                <path class="minute-arm" d="M300.5 298V67" />
                <circle class="sizing-box" cx="300" cy="300" r="253.9" />
              </g>
              <g id="second">
                <path class="second-arm" d="M300.5 350V55" />
                <circle class="sizing-box" cx="300" cy="300" r="253.9" />
              </g>
            </svg>
          </div>
          <!-- .clockbox -->
        </div>
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
const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

function runTheClock() {
  var date = new Date();

  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  console.log("Hour: " + hr + " Minute: " + min + " Second " + sec);

  let hrPosition = hr * 360 / 12 + (min * (360 / 60) / 12); // на сколько поворачивается часовая стрелка
  let minPosition = min * 360 / 60 + (sec * (360 / 60) / 60) ; // на сколько поворачивается минутная стрелка
  let secPosition= sec * 360 / 60; // на сколько поворачивается секундная стрелка

  HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
  MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
  SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
}

var interval = setInterval(runTheClock, 1000);

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
.main {
    display: flex;
    padding: 2em;
    height: 90vh;
    justify-content: center;
    align-items: middle;
}

.clockbox,
#clock {
    width: 100%;
    background-color: #FDEDDB;
}

/* Clock styles */
.circle {
    fill: none;
    stroke: #000000;
    stroke-width: 9;
    stroke-miterlimit: 10;
}

.mid-circle {
    fill: rgb(0, 0, 0);
}
.hour-marks {
    fill: none;
    stroke: #000;
    stroke-width: 9;
    stroke-miterlimit: 10;
}

.hour-arm {
    fill: none;
    stroke: rgb(0, 0, 0);
    stroke-width: 17;
    stroke-miterlimit: 10;
}

.minute-arm {
    fill: none;
    stroke: rgb(0, 0, 0);
    stroke-width: 11;
    stroke-miterlimit: 10;
}

.second-arm {
    fill: none;
    stroke: rgb(0, 0, 0);
    stroke-width: 4;
    stroke-miterlimit: 10;
}

/* Transparent box ensuring arms center properly. */
.sizing-box {
    fill: none;
}

/* Make all arms rotate around the same center point. */
/* Optional: Use transition for animation. */
#hour,
#minute,
#second {
    transform-origin: 300px 300px;
    /* transition: transform .5s ease-in-out; */
}
</style>