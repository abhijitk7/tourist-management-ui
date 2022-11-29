import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventTypes } from '../models/eventTypes.model';
import { ToastEvent } from '../models/toastEvent.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  /**
   * Show success toast notification.
   * @param title Toast title
   * @param message Toast message
   */
  showSuccessToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Success,
    });
  }

  /**
   * Show info toast notification.
   * @param title Toast title
   * @param message Toast message
   */
  showInfoToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Info,
    });
  }

  /**
   * Show warning toast notification.
   * @param title Toast title
   * @param message Toast message
   */
  showWarningToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Warning,
    });
  }

  /**
   * Show error toast notification.
   * @param title Toast title
   * @param message Toast message
   */
  showErrorToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes.Error,
    });
  }

  showToast(type: EventTypes,heading:string,message:string) {
    switch (type) {
      case EventTypes.Success:
        this.showSuccessToast(heading, message);
        break;
      case EventTypes.Warning:
        this.showWarningToast(heading, message);
        break;
      case EventTypes.Error:
        this.showErrorToast(heading, message);
        break;
      default:
        this.showInfoToast(heading, message);
        break;
    }
  }
}
