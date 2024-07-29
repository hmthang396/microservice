import { ParseParams, SafeParseReturnType } from 'zod';

export class Validation {
  public static EnvValidation(
    config: Record<string, unknown>,
    safeParse: (data: unknown, params?: Partial<ParseParams>) => SafeParseReturnType<any, any>,
  ) {
    const isValid = safeParse(config);

    if (!isValid.success) {
      throw new Error('Environment error');
    }
    return config;
  }
}
