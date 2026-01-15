<script setup lang="ts">
import Branding from "@/assets/img/Branding.png";

const mouted = ref(false);
const router = useRouter();
onMounted(async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      mouted.value = true;
      resolve(undefined);
    }, 150)
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  router.push({ name: "/login" });
});
</script>

<template>
  <div class="branding">
    <Transition name="brand">
      <img v-if="mouted" :src="Branding" alt="" class="crawjud-automatizacao" />
    </Transition>
  </div>
</template>

<style lang="css" scoped>
.branding {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.crawjud-automatizacao {
  width: 640px;
  padding: 15px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.267);
}

.brand-enter-active,
.brand-leave-active {
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.brand-enter-from,
.brand-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
