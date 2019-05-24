export class LocalStorageCounts {
  availableStorageMb = 0;
  usedStorageKb = 0;
  usedStorageMb = 0;
  availableStorageMbPercent = 0;
  usedStorageMbPercent = 0;
  totalStorageMb = 10;
  availableStorageMbThreshold = .5;

  updateCounts(): void {
    let allStrings = '';
        for (const key in window.localStorage) {
            if (window.localStorage.hasOwnProperty(key)) {
                allStrings += window.localStorage[key];
            }
        }
        const storageUsed = allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024))  : 0;
        this.usedStorageKb = storageUsed;
        this.usedStorageMb = this.usedStorageKb / 1000;
        this.availableStorageMb = this.totalStorageMb - this.usedStorageMb;
        this.availableStorageMbPercent = this.availableStorageMb / this.totalStorageMb;
        this.usedStorageMbPercent = (this.usedStorageMb / this.totalStorageMb) * 100;

  }

  isStorageAvailable(): boolean {
    this.updateCounts();
    return this.availableStorageMb > this.availableStorageMbThreshold;

  }
}
