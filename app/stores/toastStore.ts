export default defineStore("useToastStore", () => {
  const toastContent = reactive({ title: "", body: "", timeout: 0 });
  const showToast = ref(false);
  function show(
    options: { title: string; body: string; timeout: number } = {
      title: "",
      body: "",
      timeout: 1000,
    }
  ) {
    showToast.value = true;
    if (options) {
      toastContent.title = options.title;
      toastContent.body = options.body;
      toastContent.timeout = options.timeout;
    }
  }

  return { toastContent, showToast, show };
});
