<template>
  <div>
    <div
      v-for="booking in filteredBookings"
      :key="booking.id"
      class="booking-wrapper"    
    >
      <div
        v-if="
          booking.roomDetails.id === id &&
          getBookingDates(booking.start, booking.end).some((date) =>
            isSameDay(date, getDayOfWeek(day))
          )
        "
        :class="{
          'booking-start': isSameDay(booking.start, getDayOfWeek(day)),
          'booking-end': isSameDay(booking.end, getDayOfWeek(day)),
          booked: getBookingDates(booking.start, booking.end).some((date) =>
            isSameDay(date, getDayOfWeek(day))
          ),
        }"
        @click="openDialog(booking)"
      >
        <span
          v-if="
            isSameDay(booking.start, getDayOfWeek(day)) &&
            new Date(getDayOfWeek(day)).getDay() === 0
          "
          class="booking-name-title"
        >
          {{ booking.name }}
        </span>
        <span
          v-if="
            !isSameDay(booking.start, getDayOfWeek(day)) &&
            new Date(getDayOfWeek(day)).getDay() === 1
          "
          class="booking-name-title"
        >
          {{ booking.name }}
        </span>
        <span
          v-if="
            !isSameDay(booking.end, getDayOfWeek(day)) &&
            isNextDay(booking.start, getDayOfWeek(day)) &&
            new Date(getDayOfWeek(day)).getDay() !== 1
          "
          class="booking-name-title"
        >
          {{ booking.name }}
        </span>
        <span
          v-if="
            isSameDay(booking.start, getDayOfWeek(day)) &&
            isNextDay(booking.end, getDayOfWeek(day + 2))
          "
          class="booking-name-title"
          :class="{
            'booking-name-small':
              isSameDay(booking.start, getDayOfWeek(day)) &&
              isNextDay(booking.end, getDayOfWeek(day + 2)) &&
              new Date(getDayOfWeek(day)).getDay() !== 0,
          }"
        >
          {{ booking.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "BookingCell",
  props: {
    id: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    getDayOfWeek: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState(["filteredBookings"]),
  },
  methods: {
    ...mapMutations(["setDialog", "setDialogBooking"]),
    getBookingDates(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const dates = [];
      while (startDate <= endDate) {
        dates.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
      return dates;
    },
    isSameDay(date1, date2) {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    },
    isNextDay(date1, date2) {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      d1.setDate(d1.getDate() + 1);
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    },
    openDialog(booking) {
      this.setDialog(true);
      this.setDialogBooking(booking);
    },
  },
};
</script>

<style lang="scss" scoped>

.booked,
.booking-start,
.booking-end {
  background-color: lightblue;
  position: absolute;
}

.booked {
  top: 20%;
  height: 80%;
  width: 101%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.booking-start {
  border-radius: 1rem 0 0 1rem;
  width: 45.3%;
  left: 55.5%;
}

.booking-end {
  border-radius: 0 1rem 1rem 0;
  width: 45%;
  left: 0;
}

.booking-name-title,
.booking-name-small {
  position: absolute;
  display: block;
  text-align: center;
  font-weight: bold;
}

.booking-name-small {
  left: 50%;
  z-index: 1;
}
</style>
