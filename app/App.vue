<script setup lang="ts">
useTheme().loadTheme();

const appName = computed(() => import.meta.env.VITE_APP_NAME);
const offcanvas = useOffcanvas();

document.title = appName.value;

onMounted(() => {
  offcanvas.setup();
});
</script>

<template>
  <BApp>
    <Loading />
    <div class="content-app">
      <Sidebar />
      <Navbar />
      <BContainer fluid class="route">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </BContainer>
    </div>
  </BApp>
</template>

<style lang="css" scoped>
.route {
  position: relative;
  width: calc(100% - 35px);
  height: calc(100% - 60px);
  border-radius: 5px;
}

.content-app {
  position: absolute;
  width: 100dvw;
  height: 100dvh;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.page-enter-active,
.page-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
