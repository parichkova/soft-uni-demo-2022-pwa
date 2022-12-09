export interface Discipline {
  id: string;
  name: string;
  description?: string;
  duration: number;
  imageUrl?: string;
}

export enum BackgroundSyncEventType {
  SyncStart = 'SyncStart',
  SingleSyncStart = 'SingleSyncStart',
  SingleSyncEnd = 'SingleSyncEnd',
  SyncEnd = 'SyncEnd',
}

export interface BackgroundSyncEvent<T = string> {
  type: BackgroundSyncEventType;
  payload?: T;
}
