import { Injectable } from '@angular/core';
import { Exersize } from './exersize';
import { KeyedCollection } from './utilities/KeyedCollection';
import { LocalStorageService } from './utilities/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExersizeService {

  private LOCAL_STORAGE_KEY_EXERSIZES = 'tul_exersizes';
  private exersizes: KeyedCollection<Exersize>;

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.loadExersizes();
  }

  // public getAllExersizeSessions(forDay: Date): KeyedCollection<ExersizeSession> {

  // }

  public addExersize(exersize: Exersize): void {
    this.exersizes.Add(exersize.name, exersize);
    this.saveExersizes();
  }

  public deleteExersize(name: string): void {
    this.exersizes.Remove(name);
    this.saveExersizes();
  }

  public getAllExersizes(): KeyedCollection<Exersize> {
    return this.exersizes;
  }

  public getExersize(name: string): Exersize {
    return this.exersizes.Item(name);
  }

  private saveExersizes() {
    this.localStorageService.writeObject(this.LOCAL_STORAGE_KEY_EXERSIZES, this.exersizes.Values());
   }

   private loadExersizes() {
    const exersizeList = this.localStorageService.readObject<Array<Exersize>>(this.LOCAL_STORAGE_KEY_EXERSIZES);
    this.exersizes = new KeyedCollection<Exersize>();
    if (!exersizeList) return;
    for (const exersize of exersizeList) {
      this.exersizes.Add(exersize.name, exersize);
    }
   }
}
