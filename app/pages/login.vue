<script setup lang="ts">
import { isAxiosError, type AxiosResponse } from "axios";

const FormLogin = reactive({
  username: "",
  password: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});
const router = useRouter();
const toast = useToast();
const load = useLoad();

class authService {
  static async authUser(e: SubmitEvent) {
    e.preventDefault();
    load.show();

    if (!FormLogin.username || !FormLogin.password) {
      const message = !FormLogin.username
        ? "Informe um usuário"
        : "Informe a senha!";
      load.hide();
      toast.create({
        title: "Erro",
        body: message,
      });
      return;
    }

    try {
      const response = await api.post("/auth/login", FormLogin);
      if (response.status === 200) {
        toast.create({
          title: "Sucesso!",
          body: "Login efetuado com sucesso!",
          value: 1000,
        });
        useRouter().push({ name: "/robot/listagem" });
      }
    } catch (err) {
      let message = "Erro ao realizar login";
      if (isAxiosError(err) && err.response) {
        message = (err.response as AxiosResponse<AuthenticationPayload>).data
          .message;
      }

      toast.create({
        title: "Erro",
        body: message,
      });
    }
    load.hide();

    router.push({ name: "/robot/listagem" });
  }
}
</script>

<template>
  <BContainer class="login-container">
    <div class="card card-login">
      <div class="card-header">
        <h2 class="mb-3">Login</h2>
      </div>
      <div class="card-body">
        <form @submit="(e) => authService.authUser(e)" for="username">
          <BFormGroup class="mb-3">
            <BFormInput
              size="lg"
              placeholder="Login"
              type="text"
              id="username"
              v-model="FormLogin.username"
            />
          </BFormGroup>

          <div class="mb-3">
            <InputPassword
              size="lg"
              id="password"
              placeholder="Senha"
              v-model="FormLogin.password"
            />
          </div>
          <div class="card-footer">
            <BButton type="submit" class="btn mt-auto btn-primary w-100">
              Login
            </BButton>
          </div>
        </form>
      </div>
    </div>
  </BContainer>
</template>

<style lang="css" scoped>
.login-container {
  margin-top: 7.5em;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-login {
  width: 480px;
  min-height: 330px;
  padding: 15px;
  background-color: var(--color-flirt-950);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

@media (prefers-color-scheme: light) {
  .card-login {
    background-color: var(--color-flirt-200);
  }
  .text-warning {
    color: rgb(78, 52, 4) !important;
  }
}
</style>
