<script setup lang="ts">
import { onMounted } from "vue";

const router = useRouter();

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  router.push({ name: "login" });
});
</script>

<template>
  <BContainer class="index"> </BContainer>
</template>

<style lang="css" scoped></style>
