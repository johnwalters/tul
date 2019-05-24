import { Exersize } from './exersize';

export class ExersizeSession {
  public exersize: Exersize;
  public date: Date;
  public weight: number;
  public weightUnitOfMeasure: UnitOfMeasure;
  public TimeUnderLoadSeconds: number;
  public repititions: number;
}

export enum UnitOfMeasure {
  pounds,
  kilograms,
  units,
}
