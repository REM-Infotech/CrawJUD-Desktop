<script setup lang="ts">
import Crawjud from "@/components/crawjud.vue";
import Elaw from "@/components/elaw.vue";
import Esaj from "@/components/esaj.vue";
import Pje from "@/components/pje.vue";
import Projudi from "@/components/projudi.vue";
import FormBot from "@/views/FormBot.vue";

const botStore = useBotStore();
const { listagem, formBot } = storeToRefs(botStore);
const imgSistema: Record<sistemasRobos, Component> = {
  PROJUDI: Projudi,
  ESAJ: Esaj,
  ELAW: Elaw,
  JUSDS: Crawjud,
  PJE: Pje,
  CAIXA: Crawjud,
  TJDFT: Crawjud,
  CSI: Crawjud,
};

onMounted(async () => {
  await botStore.load();
});
</script>

<template>
  <BContainer>
    <FormBot />
    <TransitionGroup tag="div" name="bots" class="row row-bots">
      <div
        class="col-lg-3 col-xl-3 col-md-3 col-sm-3 p-2"
        v-for="(bot, index) in listagem"
        :key="index"
      >
        <div class="card">
          <div class="card-header">
            <span class="text-white fw-bold titulo-robo">
              {{ bot.display_name }}
            </span>
          </div>
          <component :is="imgSistema[bot.sistema]" />
          <div class="card-body">
            <span class="text-white text-desc">
              {{ bot.descricao }}
            </span>
          </div>
          <div class="card-footer d-flex gap-3">
            <BButton @click="formBot = !formBot" class="button-execute">
              Executar
            </BButton>
            <BButton class="button-bot" disabled> Ver Logs </BButton>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </BContainer>
</template>

<style lang="css" scoped>
.row-bots {
  overflow: auto;
  box-shadow: 0;
}

.bots-enter-active,
.bots-leave-active {
  transition: all 0.5s;
}
.bots-enter-from,
.bots-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.card {
  padding: 8px;
}

.text-desc {
  font-size: 1.05rem;
}

.button-execute {
  width: 7.2em;
  height: 2.5em;
  padding: 5px;
  font-weight: bold;
  background-color: rgba(35, 180, 6, 0.568) !important;
}

.button-execute:hover {
  background-color: rgb(63, 94, 17) !important;
}

.button-bot {
  width: 7.2em;
  height: 2.5em;
  padding: 5px;
  font-weight: bold;
}

.card-body {
  min-height: 180px;
}

.box-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-left: 25px;
  margin-right: 25px;
  color: black;
  background-color: var(--color-flirt-100);
  width: 95px;
  height: 105px;
  padding: 5px;
}

.modal-app {
  min-width: 960px !important;
}

.titulo-robo {
  font-size: 0.75em;
  font-weight: bold;
}
</style>
