export default class ScreenerItem {
  logoId: string;
  name: string;
  change: number;
  close: number;
  rvol10d: number;
  high: number;
  low: number;
  atr: number;
  high1M: number;
  low1M: number;
  sma200: number;
  sma50: number;
  volume: number;
  volumeAvg30: number;
  marketCap: number;
  marketCapShort: string;
  // computed
  sma50diff: number;
  sma50diffN: number;
  sma200diff: number;
  sma200diffN: number;
  rpVolt: number;
  tickSize: number;
  rpVoltLabel: string;
  high1MDiff: number;

  constructor(
    logoId: string,
    name: string,
    change: number,
    close: number,
    rvol10d: number,
    high: number,
    low: number,
    atr: number,
    high1M: number,
    low1M: number,
    sma200: number,
    sma50: number,
    volume: number,
    volumeAvg30: number,
    marketCap: number
  ) {
    this.logoId = logoId;
    this.name = name;
    this.change = +change?.toFixed(2);
    this.close = close;
    this.rvol10d = +rvol10d?.toFixed(2);
    this.high = high;
    this.low = low;
    this.atr = +atr?.toFixed(0);
    this.high1M = high1M;
    this.low1M = low1M;
    this.sma200 = sma200;
    this.sma50 = sma50;
    this.volume = volume;
    this.volumeAvg30 = +volumeAvg30?.toFixed(2);
    this.marketCap = marketCap;
    // computed
    let sma50dif = sma50 - close;
    let sma50difN = sma50dif / atr;
    let sma200dif = sma200 - close;
    let sma200difN = sma200dif / atr;

    this.sma50diff = +sma50dif?.toFixed(2);
    this.sma50diffN = +sma50difN?.toFixed(2);
    this.sma200diff = +sma200dif?.toFixed(2);
    this.sma200diffN = +sma200difN?.toFixed(2); //#4ecbcb

    this.marketCapShort = Shorten(marketCap, 2);

    // calculate rupiah volatility
    let tick = GetTickSize(close);
    this.tickSize = tick;
    let rpTick = tick * 100;
    this.rpVolt = this.atr * rpTick;
    this.rpVoltLabel = Shorten(this.rpVolt, 2);

    // Calculate High 1M Diff
    let hiDiff = high1M - close;
    this.high1MDiff = hiDiff / tick;
  }
}

function Shorten(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "Q" },
    { value: 1e18, symbol: "QT" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

function GetTickSize(price: number): number {
  let ticksize = 1;
  if (price <= 200) {
    ticksize = 1;
  } else if (price <= 500) {
    ticksize = 2;
  } else if (price <= 2000) {
    ticksize = 5;
  } else if (price <= 5000) {
    ticksize = 10;
  } else {
    ticksize = 25;
  }

  return ticksize;
}
