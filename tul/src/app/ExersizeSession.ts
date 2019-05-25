import { Exersize } from './exersize';

export class ExersizeSession {
  public exersize: Exersize;
  public weight: number;
  public weightUnitOfMeasure: UnitOfMeasure;
  public TimeUnderLoadSeconds: number;
  public repititions: number;
  public notes: string;
}

export enum UnitOfMeasure {
  pounds,
  kilograms,
  units,
}
