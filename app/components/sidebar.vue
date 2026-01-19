<script setup lang="ts">
import CrawJUD2 from "@/assets/img/crawjud2.ico";

import RiCalendarScheduleLine from "~icons/ri/calendar-schedule-line?width=24px&height=24px";
import RiRobot3Line from "~icons/ri/robot-3-line?width=24px&height=24px";
import RiUser3Line from "~icons/ri/user-3-line?width=32px&height=32px";

const router = useRouter();
const toast = useToast();
const offcanvas = useOffcanvas();

const { userInfo } = storeToRefs(userStore());

onMounted(() => {});

const handleLogout = async () => {
  offcanvas.toggle();
  try {
    await api.post("/auth/logout");
  } catch {}

  toast.create({
    title: "Sucesso",
    body: "Logout efetuado!",
    modelValue: 2500,
  });

  router.push({ name: "/login" });
};
</script>

<template>
  <div
    class="offcanvas offcanvas-start offcanvas-md"
    tabindex="-1"
    id="offcanvasCrawJUD"
    aria-labelledby="offcanvasCrawjudLabel"
  >
    <div
      class="d-flex flex-column flex-shrink-0 p-3 text-body-emphasis bg-body-secondary"
      style="width: 280px; height: 100%"
    >
      <a
        href="#"
        @click="
          (e: Event) => {
            e.preventDefault();
            offcanvas.hide();
          }
        "
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-body-emphasis text-decoration-none"
      >
        <img :src="CrawJUD2" class="me-2" alt="" style="width: 40px" />
        <span class="fs-2">CrawJUD</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <RouterLink
            class="nav-link text-body-emphasis text-decoration-none"
            :to="{ name: '/robot/listagem' }"
            aria-current="page"
            active-class="active"
          >
            <div class="d-flex align-items-center gap-2">
              <span class="pe-none">
                <RiRobot3Line />
              </span>
              <span>Robôs</span>
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            class="nav-link text-body-emphasis text-decoration-none"
            :to="{ name: '/execucoes' }"
            aria-current="page"
            active-class="active"
          >
            <div class="d-flex align-items-center gap-2">
              <span class="pe-none">
                <RiCalendarScheduleLine />
              </span>
              <span>Execuções</span>
            </div>
          </RouterLink>
        </li>
      </ul>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="rounded-circle me-2">
            <RiUser3Line />
          </span>
          <strong>{{ userInfo?.name }}</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a @click="handleLogout" class="dropdown-item" href="#">Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
#offcanvasCrawJUD {
  z-index: 9999;
}
</style>
