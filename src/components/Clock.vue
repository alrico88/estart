<template lang="pug">
  p.mb-0(:class="clockClasses") {{dayOfWeek | getDayOfWeek}}, {{day}} {{month | getMonth}} {{year}} - {{hours | fixZeros}}{{showDots ? ':' : ' '}}{{minutes | fixZeros}}
</template>

<script>
import { mapState } from "vuex";
import { daysOfWeek, months } from "@/helpers/strings";

const startDate = new Date();

export default {
  filters: {
    fixZeros(num) {
      return num.toString().length === 1 ? `0${num}` : num;
    },
    getMonth(monthNum) {
      return months[monthNum];
    },
    getDayOfWeek(dayOfWeekAsNum) {
      return daysOfWeek[dayOfWeekAsNum];
    }
  },
  data() {
    return {
      hours: startDate.getHours(),
      minutes: startDate.getMinutes(),
      month: startDate.getMonth(),
      day: startDate.getDay(),
      dayOfWeek: startDate.getDay(),
      year: startDate.getFullYear(),
      showDots: true
    };
  },
  computed: {
    ...mapState(["ui"]),
    clockClasses() {
      const classes = [];

      if (this.ui.shadowed) {
        classes.push("text-shadow");
      }

      return classes;
    }
  },
  mounted() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.hours = now.getHours();
      this.minutes = now.getMinutes();
      this.day = now.getDay();
      this.month = now.getMonth();
      this.dayOfWeek = now.getDay();
      this.year = now.getFullYear();
      this.showDots = !this.showDots;
    }
  }
};
</script>

<style scoped>
p {
  font-size: 2rem;
}

.text-shadow {
  text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.8) !important;
}
</style>
