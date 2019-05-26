import { ExersizeSession } from '../ExersizeSession';
export class ExersizeSessionModel {
  constructor(exersizeSession: ExersizeSession) {
    this.exersizeSession = exersizeSession;
  }
  public exersizeSession: ExersizeSession;
  public sessionUm: string;
}
