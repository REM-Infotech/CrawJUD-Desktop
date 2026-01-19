export default defineStore(
  "userInfo",
  () => {
    const userInfoRef = ref<UserInfo>({} as UserInfo);
    const userInfo = computed<UserInfo>(() => userInfoRef.value);
    return { userInfo, userInfoRef };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
