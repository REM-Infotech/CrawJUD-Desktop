<script setup lang="ts">
const botstore = useBotStore();

const { formBot } = storeToRefs(botstore);
</script>

<template>
  <BModal size="xl" @hide="formBot = false" v-model="formBot">
    <template #default>
      <BForm>
        <BInputGroup>
          <BFormSelect />
        </BInputGroup>
      </BForm>
    </template>
  </BModal>
</template>
