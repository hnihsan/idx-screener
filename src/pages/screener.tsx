import React, { useEffect, useRef, useState } from "react";
import styles from "../app/page.module.css";
import { useTable, useSortBy } from "react-table";
import ScreenerItem from "@/models/ScreenerItem";
import { getScreenerItems, getScreenerItems2 } from "@/services/FetchData";
import StockTable from "./partials/StockTable";
import StockTable2 from "./partials/StockTable2";

export default function Screener() {
  const [stocks, setStocks] = useState<Array<ScreenerItem>>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      let items = await getScreenerItems2();
      console.log(items.length);
      setStocks(items);
      setIsFetched(true);
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      {isFetched ? <StockTable items={stocks} /> : <h1>Loading</h1>}
    </main>
  );
}
