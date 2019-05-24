import { Injectable } from '@angular/core';
import { LocalStorageCounts } from './localStorageCounts';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  counts: LocalStorageCounts;
  constructor() {
    this.counts = new LocalStorageCounts();
  }

  read(path: string): any {
    // if not in local storage, the string "undefined" is returned (why???)
    const text: string = localStorage.getItem(path);
    if (text === null || typeof text === 'undefined' || text === 'undefined') {
      // this.$log.debug("LocalStorageService::read(" + path + ") - path not found, returned null");
      return null;
    }
    // tslint:disable-next-line:one-line
    else {
      // this.$log.debug("LocalStorageService::read(" + path + ")");
      return text;
    }
  }

  readObject<T>(path): T {
    const text: any = this.read(path);
    let data: T;
    try {
      data = <T>JSON.parse(text);
    } catch (error) {
      // tslint:disable-next-line:max-line-length
      // this.$log.error('LocalStorageService::readObject: can\'t convert string from local storage to object using JSON.parse(). Error: ' + error);
      data = null;
    }

    return data;
  }

  write(path: string, text: string): void {
    localStorage.setItem(path, text);
    this.notifyStorageChange();
    if (!this.counts.isStorageAvailable()) {
      console.error('Cannot write anymore storage. Getting close to limits.');
      // this.appService.sendMessage(new AppMessage(AppService.Constants().storageNotAvailable));
      return;
    }
  }

  writeObject(path: string, data: any): void {
    const text: string = JSON.stringify(data);
    this.write(path, text);
    this.notifyStorageChange();
    if (!this.counts.isStorageAvailable()) {
      console.warn('Storage getting close to limits.');
      // this.appService.sendMessage(new AppMessage(AppService.Constants().storageNotAvailable));
      return;
    }
  }

  remove(path: string): void {
    // this.$log.debug("LocalStorageService::remove(" + path + ")");
    localStorage.removeItem(path);
    this.notifyStorageChange();
  }

  clear(): void {
    // this.$log.debug("LocalStorageService::clear - all items removed from local storage");
    localStorage.clear();
    this.notifyStorageChange();
  }

  notifyStorageChange(): void {
    // this.appService.sendMessage(new AppMessage(AppService.Constants().storageChange));
  }
}
