import ScreenerItem from "@/models/ScreenerItem";
import React from "react";

interface TbodyData {
  items: Array<ScreenerItem>;
}

export const TbodyComp = ({ items }: TbodyData) => {
  return (
    <tbody>
      {items.map((cell, idx) => {
        return (
          <tr key={idx}>
            <td>
              <a
                href={
                  "https://www.tradingview.com/chart/VSjoHr2O/?symbol=IDX%3A" +
                  cell.name
                }
              >
                {cell.name}
              </a>
            </td>
            <td>{cell.close}</td>
            <td>{cell.change}</td>
            <td>{cell.atr}</td>
            <td>{cell.sma50}</td>
            <td>{cell.sma50diff}</td>
            <td>{cell.sma50diffN}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
