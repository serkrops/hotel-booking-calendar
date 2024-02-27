import Vue from "vue";
import Vuex from "vuex";
import bookingsData from "@/data/bookings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookings: [],
    filteredBookings: [],
    currentDay: new Date(),
    selectedRoom: null,
    namesOfRooms: [],
    rooms: [],
    dialog: false,
    dialogBooking: null,
  },
  mutations: {
    setDialog: (state, value) => (state.dialog = value),
    setDialogBooking: (state, value) => (state.dialogBooking = value),
    setBookings: (state, bookings) => (state.bookings = bookings),
    setNamesOfRooms: (state, rooms) => (state.namesOfRooms = rooms),
    setRooms: (state, rooms) => (state.rooms = rooms),
    prevWeek: (state) => {
      let date = new Date(state.currentDay);
      date.setDate(date.getDate() - 7);
      state.currentDay = date;
    },
    nextWeek: (state) => {
      let date = new Date(state.currentDay);
      date.setDate(date.getDate() + 7);
      state.currentDay = date;
    },
    setCurrentDay: (state) => (state.currentDay = new Date()),
    selectRoom: (state, room) => (state.selectedRoom = room),
    filterBookings: (state, room) => {
      state.filteredBookings = bookingsData.filter(
        ({ roomDetails }) => roomDetails.name === room
      );
    },
  },
  actions: {
    fetchBookings({ commit }) {
      commit("setBookings", bookingsData);
      const roomNames = new Set(
        bookingsData.map(({ roomDetails }) => roomDetails.name)
      );
      commit("setNamesOfRooms", Array.from(roomNames));

      const roomIds = bookingsData.reduce((acc, { roomDetails }) => {
        const { name: roomName, id: roomId } = roomDetails;
        if (!acc[roomName]) {
          acc[roomName] = new Set();
        }
        acc[roomName].add(roomId);
        return acc;
      }, {});

      for (let room in roomIds) {
        roomIds[room] = Array.from(roomIds[room]).sort();
      }

      commit("setRooms", roomIds);
    },
    selectRoom: ({ commit }, room) => commit("selectRoom", room),
    filterBookings: ({ commit }, room) => commit("filterBookings", room),
  },
  getters: {
    bookings: (state) => state.bookings,
    filteredBookings: (state) => state.filteredBookings,
    currentDay: (state) => state.currentDay,
    selectedRoom: (state) => state.selectedRoom,
  },
});
