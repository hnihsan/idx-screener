import ScreenerItem from "@/models/ScreenerItem";
import React from "react";
import styled from "styled-components";
import { useSortBy, useTable } from "react-table";
import { Button } from "antd";

interface SubjectProp {
  items: Array<ScreenerItem>;
  OnEntry: (obj: any) => void;
}

interface TableParam {
  columns: any;
  data: any;
  OnEntryFn: (obj: any) => void;
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
function Table({ columns, data, OnEntryFn }: TableParam) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any, index: number) => (
            <tr key={"h_group_" + index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, colidx: number) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  key={"col_idx_" + colidx}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
              {/* <th>Action</th> */}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr key={"stock_row_" + i} {...row.getRowProps()}>
                {row.cells.map((cell: any, j: number) => {
                  if (cell.column.id == "name") {
                    return (
                      <td
                        key={"stock_col_" + cell.column.id}
                        {...cell.getCellProps()}
                      >
                        <a
                          href={
                            "https://www.tradingview.com/chart/VSjoHr2O/?symbol=IDX%3A" +
                            cell.value
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {cell.render("Cell")}
                        </a>
                      </td>
                    );
                  } else if (cell.column.id == "marketCap") {
                    return (
                      <td
                        key={"stock_col_" + cell.column.id}
                        {...cell.getCellProps()}
                      >
                        {row.original.marketCapShort}
                      </td>
                    );
                  } else if (cell.column.id == "rpVolt") {
                    return (
                      <td
                        key={"stock_col_" + cell.column.id}
                        {...cell.getCellProps()}
                      >
                        <span>
                          T<b>{row.original.tickSize}</b>|A
                          <b>{row.original.atr}</b>|
                        </span>
                        <b>{row.original.rpVoltLabel}</b>
                      </td>
                    );
                  } else if (cell.column.id == "sma200diffN") {
                    return (
                      <td
                        key={"stock_col_" + cell.column.id}
                        {...cell.getCellProps()}
                        style={{ backgroundColor: "#4ecbcb" }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ); //high1MDiff
                  } else if (cell.column.id == "high1MDiff") {
                    return (
                      <td
                        key={"stock_col_" + cell.column.id}
                        {...cell.getCellProps()}
                      >
                        {row.original.high1MDiff.toFixed(0)} Tick
                      </td>
                    );
                  } else if (cell.column.id == "change") {
                    return (
                      <td
                        key={"stock_col_" + cell.column.id}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}%
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={"stock_col_" + cell.column.id}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  }
                })}
                {/* <td>
                  <Button
                    type="primary"
                    onClick={() => OnEntryFn(row.original)}
                    //onClick={() => console.log(row)}
                  >
                    Entry
                  </Button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing results of {rows.length} rows</div>
    </>
  );
}

const StockTable = ({ items, OnEntry }: SubjectProp) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Stock Items",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Close",
            accessor: "close",
          },
          {
            Header: "R. Volume",
            accessor: "rvol10d",
          },
          {
            Header: "Change",
            accessor: "change",
          },
          {
            Header: "ATR(N)",
            accessor: "atr",
          },
          {
            Header: "SMA 50 Diff. (N)",
            accessor: "sma50diffN",
          },
          {
            Header: "SMA 200 Diff. (N)",
            accessor: "sma200diffN",
          },
          {
            Header: "Hi Last 20 Diff. (Tick)",
            accessor: "high1MDiff",
          },
          {
            Header: "Rp. Vlty",
            accessor: "rpVolt",
          },
          {
            Header: "Market Cap.",
            accessor: "marketCap",
          },
        ],
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={items} OnEntryFn={OnEntry} />;
    </Styles>
  );
};

export default StockTable;
