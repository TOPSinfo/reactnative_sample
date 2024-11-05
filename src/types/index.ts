export * from './Card';
export * from './Screen';
export * from './Account';
export * from './Parking';
export * from './Session';
export * from './Vehicle';
export * from './Notification';
export * from './OauthToken';
export * from './ApiError';

export type Function<T> = T extends (...args: any[]) => any ? T : never;
