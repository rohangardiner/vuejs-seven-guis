import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Count from "@/views/Count.vue";
import Temp from "@/views/Temp.vue";
import Flights from "@/views/Flights.vue";
import Timer from "@/views/Timer.vue";
import CRUD from "@/views/CRUD.vue";
import Circle from "@/views/Circle.vue";
import Cells from "@/views/Cells.vue";

const routes = [
  { path: "/", name: "Home", component: Home, },
  { path: "/count", name: "Counter", component: Count, },
  { path: "/temp", name: "Temperature Converter", component: Temp, },
  { path: "/flights", name: "Flight Booker", component: Flights, },
  { path: "/timer", name: "Timer", component: Timer, },
  { path: "/crud", name: "CRUD", component: CRUD, },
  { path: "/circle", name: "Circle Drawer", component: Circle, },
  { path: "/cells", name: "Cells", component: Cells, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;