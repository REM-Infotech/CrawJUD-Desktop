type optSave = { key: string; value: string };

interface ISafeStoreService {
  save(opt: optSave): Promise<void>;
  load(key: string): Promise<string | undefined>;
}
