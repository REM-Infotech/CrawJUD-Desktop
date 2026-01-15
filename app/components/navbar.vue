<script setup lang="ts">
import { BNavbar } from "bootstrap-vue-next";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isLogged = computed(
  () => route.name && route.name !== "/" && route.name !== "/login"
);
</script>

<template>
  <div class="heading">
    <Transition name="navbar-anim">
      <BNavbar
        v-if="isLogged"
        v-b-color-mode="'dark'"
        toggleable="lg"
        variant="primary"
      >
        <BNavbarBrand href="#navbar-overview">NavBar</BNavbarBrand>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
          <BNavbarNav>
            <BNavItem href="#navbar-overview">Link</BNavItem>
            <BNavItem href="#navbar-overview" disabled>Disabled</BNavItem>
          </BNavbarNav>
          <!-- Right aligned nav items -->
          <BNavbarNav class="ms-auto mb-2 mb-lg-0">
            <BNavItemDropdown text="Lang" right>
              <BDropdownItem>EN</BDropdownItem>
              <BDropdownItem>ES</BDropdownItem>
              <BDropdownItem>RU</BDropdownItem>
              <BDropdownItem>FA</BDropdownItem>
            </BNavItemDropdown>
            <BNavItemDropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <BDropdownItem>Profile</BDropdownItem>
              <BDropdownItem>Sign Out</BDropdownItem>
            </BNavItemDropdown>
          </BNavbarNav>
          <BNavForm class="d-flex">
            <BFormInput class="me-2" placeholder="Search" />
            <BButton type="submit" variant="outline-success">Search</BButton>
          </BNavForm>
        </BCollapse>
      </BNavbar>
    </Transition>
  </div>
</template>

<style lang="css" scoped>
.heading {
  position: fixed;
  width: 100%;
}

.navbar-anim-enter-active,
.navbar-anim-leave-active {
  transition: all 0.3s ease;
}

.navbar-anim-enter-from,
.navbar-anim-leave-to {
  opacity: 0;
}
</style>
