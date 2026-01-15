<script setup lang="ts">
import { useToast } from "bootstrap-vue-next";
const sistema = computed(() => import.meta.env.VITE_APP_NAME);
const toast = useToast();
const router = useRouter();
const HandleLogin = (e: Event) => {
  e.preventDefault();
  toast.create({
    title: "Sucesso",
    body: "Login efetuado com sucesso!",
    modelValue: 1500,
  });

  router.push({ name: "home" });
};
</script>

<template>
  <div class="card-login-page">
    <BRow align-content="center" no-gutters style="height: 100%">
      <BCol
        sm="5"
        md="5"
        lg="5"
        xl="5"
        xxl="5"
        class="bg-secondary border-col1"
      >
        <form @submit="HandleLogin" class="card-login">
          <div class="card" style="width: 55%">
            <div class="card-header">login {{ sistema }}</div>
            <div class="card-body login-form">
              <BFormGroup class="mb-3 mt-5" label="Login" floating>
                <BFormInput placeholder="Seu login" />
              </BFormGroup>
              <BFormGroup class="mb-5" label="Password" floating>
                <BFormInput placeholder="Sua Senha" />
              </BFormGroup>
            </div>
            <div class="card-footer d-flex flex-column">
              <BButton type="submit" variant="success">
                <span class="fw-bold"> Login </span>
              </BButton>
            </div>
          </div>
        </form>
      </BCol>
      <BCol sm="7" md="7" lg="7" xl="7" xxl="7" class="border-col2">
        <img class="img-login w-100" src="/pexelsmaurizio.jpg" alt="" />
      </BCol>
    </BRow>
  </div>
</template>
<style lang="css" scoped>
.card-login-page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

.img-login {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.card-login {
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login-form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.border-col1 {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.border-col2 {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
