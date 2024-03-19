<template>
  <div class="clockbox">
    <svg id="clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <g id="face">
        <circle class="circle" cx="300" cy="300" r="253.9" />
        <path
          class="hour-marks"
          d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"
        />
        <circle class="mid-circle" cx="300" cy="300" r="10" />
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
</template>

<script>
export default {
  data: () => ({
    tik: null,
  }),

  methods: {
    runTheClock: function () {
      const HOURHAND = document.querySelector("#hour");
      const MINUTEHAND = document.querySelector("#minute");
      const SECONDHAND = document.querySelector("#second");
      var date = new Date();

      let hr = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();

      let hrPosition = (hr * 360) / 12 + (min * (360 / 60)) / 12; // на сколько поворачивается часовая стрелка
      let minPosition = (min * 360) / 60 + (sec * (360 / 60)) / 60; // на сколько поворачивается минутная стрелка
      let secPosition = (sec * 360) / 60; // на сколько поворачивается секундная стрелка

      HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
      MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
      SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
    },
  },
  mounted() {
    this.runTheClock();
    this.tik = setInterval(this.runTheClock, 1000);
  },
  beforeDestroy() {
    clearInterval(this.tik);
  },
};
</script>

<style lang="scss" scoped>
.clockbox,
#clock {
  width: 45%;
  position: absolute;
  top: 0;
  left: 5%;
}

/* Clock styles */
.circle {
  fill: none;
  stroke: #9a4e28;
  stroke-width: 9;
  stroke-miterlimit: 10;
}

.mid-circle {
  fill: #7096b0;;
}

.hour-marks {
  fill: none;
  stroke: #9a4e28;
  stroke-width: 9;
  stroke-miterlimit: 10;
}

.hour-arm {
  fill: none;
  stroke: #7096b0;
  stroke-width: 17;
  stroke-miterlimit: 10;
}

.minute-arm {
  fill: none;
  stroke: #7096b0;
  stroke-width: 11;
  stroke-miterlimit: 10;
}

.second-arm {
  fill: none;
  stroke: #7096b0;
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