declare module "@/services/botService.mjs" {
  interface BotService {
    /**
     * Envia o start do bot
     * @param form
     * @param bot
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iniciaExecucao(form: Record<string, any>, bot: CrawJudBot): Promise<boolean>;
    download_execucao(event: IpcMainInvokeEvent, id_execucao: string): Promise<void>;
  }
  declare function useBotService(): BotService;
  export default useBotService;
}
