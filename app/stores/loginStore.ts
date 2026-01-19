export default defineStore(
  "loginStore",
  () => {
    const FormLogin = reactive({
      username: "",
      password: "",
    });
    return { FormLogin };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
