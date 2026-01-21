export default defineStore(
  "useToastStore",
  () => {
    const toastContent = reactive<ToastContent>({
      title: "",
      body: "",
      timeout: 0,
      slots: {},
    });

    const showToast = ref(false);
    function show(
      options: ToastContent = {
        title: "",
        body: "",
        timeout: 1000,
      },
    ) {
      showToast.value = true;
      if (options) {
        toastContent.title = options.title;
        toastContent.body = options.body;
        toastContent.timeout = options.timeout;
        if (options.slots) {
          toastContent.slots = options.slots;
        }
      }
    }

    return { toastContent, showToast, show };
  },
  {
    persist: false,
  },
);
