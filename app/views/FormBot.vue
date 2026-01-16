<script setup lang="ts">
const botstore = useBotStore();

const { formBot, selectedBot } = storeToRefs(botstore);
</script>

<template>
  <BModal size="xl" @hide="formBot = false" v-model="formBot">
    <template #header>
      <span class="fw-bold fs-4">
        {{ selectedBot?.display_name }}
      </span>
    </template>
    <template #default>
      <BForm>
        <BInputGroup>
          <BFormSelect />
        </BInputGroup>
      </BForm>
    </template>
  </BModal>
</template>
