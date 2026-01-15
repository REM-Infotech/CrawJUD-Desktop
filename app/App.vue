<script setup lang="ts"></script>

<template>
  <BApp>
    <div class="content-app">
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
  margin-top: 75px;
  width: calc(100% - 35px);
  height: calc(100% - 95px);
  padding: 15px;
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
