import ScreenerItem from "@/models/ScreenerItem";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TbodyComp } from "./TableComponent/TbodyComp";

interface SubjectProp {
  items: Array<ScreenerItem>;
}

interface TableParam {
  columns: any;
  data: any;
}

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const StockTable2 = ({ items }: SubjectProp) => {
  const [stocks, setStocks] = useState<Array<ScreenerItem>>(items);
  const SortSma50diffN = (direction: string) => {
    if (direction == "asc") {
      var sorted = items.sort((a, b) => a.sma50diffN - b.sma50diffN);
      setStocks(sorted);
      console.log(sorted[0]);
    } else {
      var sorted = items.sort((a, b) => b.sma50diffN - a.sma50diffN);
      setStocks(sorted);
      console.log(sorted[0]);
    }
  };
  return (
    <>
      <div>
        <button onClick={() => SortSma50diffN("asc")}>
          Sort SMA 50 diff ASC
        </button>
        <button onClick={() => SortSma50diffN("desc")}>
          Sort SMA 50 diff DESC
        </button>
      </div>
      <Styles>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Close</th>
              <th>Change</th>
              <th>ATR(N)</th>
              <th>SMA 50</th>
              <th>SMA 50 diff.</th>
              <th>SMA 50 diff. (N)</th>
            </tr>
          </thead>
          <TbodyComp items={stocks} />
        </table>
      </Styles>
    </>
  );
};

export default StockTable2;
