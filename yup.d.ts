export {};

declare module 'yup' {
  interface StringSchema {
    ccValidation(message?: string): StringSchema;
  }
}
