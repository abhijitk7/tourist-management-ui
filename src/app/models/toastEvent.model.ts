import { EventTypes } from "./eventTypes.model"

export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}
