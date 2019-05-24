export interface IKeyedCollection<T> {
  Add(key: string, value: T);
  ContainsKey(key: string): boolean;
  Count(): number;
  Item(key: string): T;
  Keys(): string[];
  Remove(key: string): T;
  Values(): T[];
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
  private items: { [index: string]: T } = {};
  private count = 0;

  public static fromParsedJson<T>(parsedJson: any): KeyedCollection<T> {
    // parsedJson is the object: any that comes from a stringified keyedCollection
    const kCollection = new  KeyedCollection<T>();
    if (!parsedJson) { return kCollection; }

    const items = parsedJson.items;
    Object.keys(items).forEach(
      key => {
        const item = items[key];
        kCollection.Add(key, item);
      });
    return kCollection;
  }


  public static fromJson<T>(json: string): KeyedCollection<T> {
    const object: any = JSON.parse(json);
    return this.fromParsedJson<T>(object);
  }


  public ContainsKey(key: string): boolean {
    return this.items.hasOwnProperty(key);
  }

  public Count(): number {
    return this.count;
  }

  public Add(key: string, value: T) {
    if (!this.items.hasOwnProperty(key)) {
      this.count++;
    }


    this.items[key] = value;
  }

  public Remove(key: string): T {
    const val = this.items[key];
    delete this.items[key];
    this.count--;
    return val;
  }

  public Item(key: string): T {
    return this.items[key];
  }

  public Keys(): string[] {
    const keySet: string[] = [];

    for (const prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }

    return keySet;
  }

  public Values(): T[] {
    const values: T[] = [];

    for (const prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        values.push(this.items[prop]);
      }
    }

    return values;
  }


}




