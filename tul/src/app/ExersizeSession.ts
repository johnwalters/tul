import { Exersize } from './exersize';
import { WeightUnitOfMeasure } from './WeightUnitOfMeasure';

export class ExersizeSession {
  public exersize: Exersize;
  public weight: number;
  public weightUnitOfMeasure: WeightUnitOfMeasure;
  public TimeUnderLoadSeconds: number;
  public repititions: number;
  public notes: string;

  public toString(): string {
    let val = this.exersize.name;
    val = val + ' w: ' + this.weight + ' ' + WeightUnitOfMeasure[this.weightUnitOfMeasure];
    val = val + ' s: ' + this.TimeUnderLoadSeconds;
    if (this.repititions) {
      val = val + ' r: ' + this.repititions;
    }
    if (this.notes) {
      val = val + ' n: ' + this.notes;
    }
    return val;
  }
}


