// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAPIConfig } from '@/lib/axiosConfig';
import ScreenerItem from '@/models/ScreenerItem';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  count: number,
  message: string,
  items: Array<ScreenerItem>
}

// const screenerData = require('data/screener.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var params = {"filter":[{"left":"market_cap_basic","operation":"in_range","right":[4000000000000,9007199254740991]}],"options":{"lang":"en"},"markets":["indonesia"],"symbols":{"query":{"types":[]},"tickers":[]},"columns":["logoid","name","change","close","relative_volume_10d_calc","high","low","ATR","High.1M","Low.1M","SMA200","SMA50","volume","average_volume_30d_calc","market_cap_basic"],"sort":{"sortBy":"market_cap_basic","sortOrder":"desc"},"price_conversion":{"to_symbol":false},"range":[0,1000]};
  var config = getAPIConfig("POST", "https://scanner.tradingview.com/indonesia/scan", params);
  var content = await axios(config).then(
    (response) => response.data
  );
  var rawItems = content.data;

  var screenerItems: Array<ScreenerItem> = [];
  rawItems.forEach((data: any) => {
    var item = data.d;
    console.log(item)
    screenerItems.push(new ScreenerItem(
      item[0],
      item[1],
      item[2],
      item[3],
      item[4],
      item[5],
      item[6],
      item[7],
      item[8],
      item[9],
      item[10],
      item[11],
      item[12],
      item[13],
      item[14]
    ))
  });

  res.status(200).json({ count: screenerItems.length, message: "success", items: screenerItems})
}
