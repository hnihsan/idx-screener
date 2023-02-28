export class NewPosition {
  stock: string;
  entry: number;
  lot: number;
  ticksize: number;
  atr: number;

  constructor(obj: any) {
    this.stock = obj.stock;
    this.entry = obj.entry;
    this.lot = obj.lot;
    this.ticksize = obj.ticksize;
    this.atr = obj.atr;
  }
}

export class Position {
  stock: string;
  entry: number;
  lot: number;
  ticksize: number;
  atr: number;
  stoploss: number;
  np1: number;
  np2: number;
  np3: number;
  np4: number;

  constructor(obj: any) {
    this.stock = obj.stock;
    this.entry = obj.entry;
    this.lot = obj.lot;
    this.ticksize = +obj.ticksize.toFixed(0);
    this.atr = +obj.atr.toFixed(2);
    // calculation
    let roundedNx = Math.round(this.atr / this.ticksize);
    let rounded_halfNx = Math.round(roundedNx / 2);

    let roundedN = this.ticksize * roundedNx;
    let rounded_halfN = this.ticksize * rounded_halfNx;

    this.stoploss = this.entry - roundedN * 2;
    this.np1 = this.entry + 1 * rounded_halfN;
    this.np2 = this.entry + 2 * rounded_halfN;
    this.np3 = this.entry + 3 * rounded_halfN;
    this.np4 = this.entry + 4 * rounded_halfN;
  }
}
