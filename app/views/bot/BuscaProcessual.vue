<script setup lang="ts">
const botstore = useBotStore();
const { formBot, credenciais } = storeToRefs(botstore);
</script>

<template>
  <BContainer>
    <CredenciaisInput />
    <div class="row">
      <BCol cols="12">
        <BFormGroup label="Nome da parte" class="mb-3">
          <BFormInput type="text" v-model="formBot.nome_parte" />
        </BFormGroup>
      </BCol>
      <BCol cols="12">
        <BFormGroup label="CPF-CNPJ Parte" class="mb-3">
          <BFormInput type="text" v-model="formBot.documento_parte" />
        </BFormGroup>
      </BCol>
      <BCol cols="6">
        <BFormGroup label="Data Inicial" class="mb-3">
          <BFormInput type="date" v-model="formBot.data_inicio" />
        </BFormGroup>
      </BCol>
      <BCol cols="6">
        <BFormGroup label="Data Final" class="mb-3">
          <BFormInput type="date" v-model="formBot.data_fim" />
        </BFormGroup>
      </BCol>
    </div>
  </BContainer>
</template>
