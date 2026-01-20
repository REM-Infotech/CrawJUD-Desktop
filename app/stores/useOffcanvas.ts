import { Offcanvas } from "bootstrap";

export default defineStore("useOffcanvas", () => {
  const state = ref<Offcanvas>();
  const route = useRoute();
  function setup() {
    state.value = new Offcanvas("#offcanvasCrawJUD");
  }

  function toggle() {
    if (state.value) {
      if (route.name && route.name !== "/" && route.name !== "/login") {
        state.value.toggle();
      }
    }
  }

  function show() {
    if (state.value) {
      if (route.name && route.name !== "/" && route.name !== "/login") {
        state.value.show();
      }
    }
  }

  function hide() {
    if (state.value) {
      if (route.name && route.name !== "/" && route.name !== "/login") {
        state.value.hide();
      }
    }
  }

  return { setup, toggle, show, hide };
});
