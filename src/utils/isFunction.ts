import { Function } from '@types';

const isFunction = <T extends unknown>(value: T): value is Function<T> =>
  typeof value === 'function';

export default isFunction;
