export default defineStore("loggerStore", () => {
  const botNamespace = socketio.socket("/bot");
  const route = useRoute();

  watch(route, (newVal) => {
    if (newVal && route.name !== "/" && route.name !== "/login") {
      botNamespace.connect();
    }
  });

  return { botNamespace };
});
