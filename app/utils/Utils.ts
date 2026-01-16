/* eslint-disable @typescript-eslint/no-explicit-any */
class Utils {
  static camelToSnake(name: string): string {
    const s1 = name.replace(/(.)([A-Z][a-z]+)/g, "$1_$2");
    return s1.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
  }
  static camelToWords(name: string): string {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  }

  static isInstance(value: any, type: any): boolean {
    return value instanceof type;
  }

  static formatString(input: string): string {
    if (input == null) return "";

    const normalized = input.normalize?.("NFKD") ?? input;

    let withoutDiacritics: string;
    try {
      withoutDiacritics = normalized.replace(/\p{M}/gu, "");
    } catch {
      withoutDiacritics = normalized.replace(/[\u0300-\u036f]/g, "");
    }

    const sanitized = withoutDiacritics.replace(/[^0-9A-Za-z.\-_]+/g, "_");

    return sanitized.split(/\s+/).filter(Boolean).join(" ");
  }
}

export default Utils;
