<script setup lang="ts">
import MaterialSymbolsCloseRounded from "~icons/material-symbols/close-rounded?width=24px&height=24px";
import MaterialSymbolsMinimizeRounded from "~icons/material-symbols/minimize-rounded?width=24px&height=24px";
import MaterialSymbolsOpenInFullRounded from "~icons/material-symbols/open-in-full-rounded?width=24px&height=24px";

import MaterialSymbolsLightMoonStarsOutlineRounded from "~icons/material-symbols-light/moon-stars-outline-rounded?width=48px&height=48px";
import MaterialSymbolsLightNightSightAuto from "~icons/material-symbols-light/night-sight-auto?width=48px&height=48px";
import MaterialSymbolsLightSunnyOutline from "~icons/material-symbols-light/sunny-outline?width=48px&height=48px";

const route = useRoute();
const isLoaded = computed(() => route.name !== "/");
const offcanvas = useOffcanvas();
const { toggleTheme } = useTheme();

const { current } = storeToRefs(useTheme());

const minimizeApp = async () => {
  await window.windowApi.minimizeWindow();
};

const maximizeApp = async () => {
  await window.windowApi.maximizeWindow();
};

const closeApp = async () => {
  await window.windowApi.closeWindow();
};

const routerName = ref();

watch(
  () => useRoute(),
  (currentRoute) => {
    if (currentRoute && currentRoute.name) {
      routerName.value = currentRoute.name;
    }
  },
);

const classBtn = [
  "d-flex",
  "flex-column",
  "align-items-center",
  "justify-content-center",
];

const iconTheme = () => {
  return {
    light: MaterialSymbolsLightSunnyOutline,
    dark: MaterialSymbolsLightMoonStarsOutlineRounded,
    system: MaterialSymbolsLightNightSightAuto,
  }[current.value];
};
</script>

<template>
  <div class="heading drag-window">
    <Transition name="navbar-anim">
      <BNavbar v-if="isLoaded" toggleable="lg" variant="primary">
        <BNavbarBrand class="no-drag" @click="offcanvas.toggle">
          <div class="d-flex gap-2 align-items-center">
            <CrawJUD :width="35" :height="35" />
            <span class="fw-bold text-body-emphasis"> Menu </span>
          </div>
        </BNavbarBrand>
        <BNavbarNav class="no-drag ms-auto mb-2 mb-lg-0">
          <div class="window-buttons me-5">
            <button class="change-theme" @click="toggleTheme()">
              <Transition name="icon" mode="out-in">
                <component :is="iconTheme()" class="icon-button" />
              </Transition>
            </button>
          </div>
          <div class="d-flex gap-1">
            <BButton
              @click="minimizeApp"
              variant="outline-secondary"
              :class="classBtn"
            >
              <MaterialSymbolsMinimizeRounded class="fw-bold" />
            </BButton>
            <BButton
              @click="maximizeApp"
              variant="outline-warning"
              :class="classBtn"
            >
              <MaterialSymbolsOpenInFullRounded class="fw-bold" />
            </BButton>
            <BButton
              @click="closeApp"
              variant="outline-danger"
              :class="classBtn"
            >
              <MaterialSymbolsCloseRounded class="fw-bold" />
            </BButton>
          </div>
        </BNavbarNav>
      </BNavbar>
    </Transition>
  </div>
</template>

<style lang="css" scoped>
.heading {
  width: 100%;
  height: 55px;
  z-index: 9999;
}

.navbar-anim-enter-active,
.navbar-anim-leave-active {
  transition: all 0.3s ease;
}

.navbar-anim-enter-from,
.navbar-anim-leave-to {
  opacity: 0;
}

.change-theme {
  background-color: transparent;
  border: none;
  margin-right: 30px;
}

.change-theme:hover {
  cursor: pointer;
  box-shadow: var(--bg-box-shadow);
}

.icon-enter-active,
.icon-leave-active {
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0.7) rotate(-20deg);
}
.icon-enter-to,
.icon-leave-from {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
</style>
