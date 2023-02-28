// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAPIConfig } from "@/lib/axiosConfig";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs');

type Data = {
  total: number;
  message: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  var params = {"filter":[{"left":"market_cap_basic","operation":"in_range","right":[1000000000000,9007199254740991]}],"options":{"lang":"en"},"markets":["indonesia"],"symbols":{"query":{"types":[]},"tickers":[]},"columns":["logoid","name","change","close","relative_volume_10d_calc","high","low","ATR","High.1M","Low.1M","SMA20","SMA50","volume","average_volume_30d_calc","market_cap_basic"],"sort":{"sortBy":"market_cap_basic","sortOrder":"desc"},"price_conversion":{"to_symbol":false},"range":[0,1000]};
  var config = getAPIConfig("POST", "https://scanner.tradingview.com/indonesia/scan", params);
  var content = await axios(config).then(
    (response) => response.data
  );
  fs.writeFile('data/screener.json', JSON.stringify(content, null, 2), (err: any)  => {
    if (err) {
      res.status(500).json({ message: err, total: 0 })
    }
    // file written successfully
  });
  res.status(200).json({ total: content.totalCount, message: "Success" })
}


