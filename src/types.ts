export enum PageActionType {
  OTHER_ACTION_QUEUE = 'OTHER_ACTION_QUEUE',
  SEND_REQUEST = 'SEND_REQUEST',
  SET_DATA = 'SET_DATA',
  FETCH_DATA = 'FETCH_DATA',
  VALIDATE_FORM = 'VALIDATE_FORM',
  GO = 'GO',
  EXEC_INTERFACE = 'EXEC_INTERFACE',
  EXEC_CODE = 'EXEC_CODE',
  CONTROL_MODAL = 'CONTROL_MODAL',
  GUARD = 'GUARD',
  CONTROL_EVENTS = 'CONTROL_EVENTS',
  NOTIFICATION = 'NOTIFICATION',
}

export interface PageActionPayload {
  params?: any;
  context?: any;
  contextIndex?: number;
  contextPathname?: string;
}

export interface PageAction {
  type: PageActionType;
  params?: any;
  parallel?: boolean;
  pageId?: string;
}

export interface PageActionOtherActionQueue extends PageAction {
  type: PageActionType.OTHER_ACTION_QUEUE;
  actionId: string;
}

export interface PageActionFetchData extends PageAction {
  dataCode: string;
}

export interface PageActionValidateForm extends PageAction {
  type: PageActionType.VALIDATE_FORM;
  pathname?: string;
  filter?: string;
}

export interface PageActionGo extends PageAction {
  type: PageActionType.GO;
  url: string;
  open: boolean;
  usePushState?: boolean;
}

export interface PageActionSendRequest extends PageAction {
  url: string;
  method: 'POST' | 'GET';
  format: 'form' | 'json';
  isRawRes?: boolean;
}

export interface PageActionExecInterface extends PageAction {
  type: PageActionType.EXEC_INTERFACE;
  interfaceId: string;
}

export interface PageActionControlModal extends PageAction {
  type: PageActionType.CONTROL_MODAL;
  open?: boolean;
  modalId: string;
}

export interface PageActionExecCode extends PageAction {
  type: PageActionType.EXEC_CODE;
  code: string;
}

export interface PageActionGuard extends PageAction {
  type: PageActionType.GUARD;
  code: string;
  confirm?: string;
}

export interface PageActionControlEvent extends PageAction {
  type: PageActionType.CONTROL_EVENTS;
  start?: boolean;
  eventId: string;
}

export interface PageActionNotification extends PageAction {
  type: PageActionType.NOTIFICATION;
  message?: string;
}

export enum PageActionQueueType {
  GLOBAL = 'GLOBAL',
  LOCAL = 'LOCAL',
}

export interface PageActionQueue {
  id: string;
  type: PageActionQueueType;
  name: string;
  code?: string;
  confirm?: string;
  success?: string;
  actions: Array<PageAction>;
  ts?: number;
}

export const crossPagePageActions = [PageActionType.SET_DATA];
