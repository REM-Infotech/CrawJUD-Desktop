// ... Tipos de colunas para tabelas

/**
 * Definição de coluna para DataTable.
 */
interface DtColumns<T = unknown> {
  data: keyof T | string;
  title: string;
  type?: string;
}

/**
 * Propriedades de coluna para renderização.
 */
interface ColumnProps<T = unknown> {
  cellData: unknown;
  rowData: Record<string, string | number>;
  rowIndex: number;
  type: T extends { type: infer U } ? U : string;
}
