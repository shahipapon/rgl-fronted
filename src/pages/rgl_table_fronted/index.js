import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ComponentMapper from "../../components/ComponentMapper";
import rglAPIController from "../../services/api.services";

export default function TableFrontend() {
  const [rglConfig, setRglConfig] = useState([]);
  const [maxRows, setMaxRows] = useState(0);

  const history = useHistory();

  useEffect(() => {
    getDesignedLayout();
  }, []);

  async function getDesignedLayout() {
    const response = await rglAPIController.getTableConfig();
    let page = response.data[0].config;
    page = JSON.parse(page);

    let orderByAscX = _.orderBy(page.items, ["y", "x"], ["asc", "asc"]);

    var groupYwithX = _(orderByAscX)
      .groupBy((x) => x.y)
      .map((value, key) => ({ column: key, rows: value.map((e) => e.type) }))
      .value();

    const maxRows = Math.max(...groupYwithX.map(({ rows }) => rows.length));
    setMaxRows(maxRows);

    setRglConfig(groupYwithX);
  }

  function renderTableData() {
    return rglConfig.map((column, index) => {
      const fillCount = maxRows - column.rows.length;
      const fillArray = new Array(fillCount).fill("---");

      return (
        <tr key={index}>
          {/* Table Cells */}
          <td className="border border-black p-5">{index + 1}</td>
          {column.rows.map((row) => (
            <td className="border border-black p-5">
              <ComponentMapper rows={row} />
            </td>
          ))}

          {/* Fill empty cells */}
          {fillArray.map((fill) => (
            <td className="border border-black p-5">---</td>
          ))}
        </tr>
      );
    });
  }

  return (
    <div className="container mx-auto px-20 mt-5 text-center ">
      <div className="flex inline-flex  text-left pb-4 ">
        <button
          className="bg-white-500 border border-2 border-black  rounded-full  font-bold uppercase text-sm px-8 py-2 mr-2"
          onClick={() => history.push("/")}
        >
          Design
        </button>
        <button
          className="bg-red-500 text-white rounded-full  font-bold uppercase text-sm px-8 py-2"
          onClick={() => history.push("/tableFrontend")}
        >
          Html
        </button>
      </div>
      <div className="text-xl mt-2">Table Controll(s)</div>
      <div className="flex flex-wrap content-center">
        <table
          id="rgl-table"
          className="border-collapse border border-black h-40 table-auto flex-grow grow-center"
        >
          <thead>
            <tr>
              <th className="border border-green-600 ...">#</th>
              {/* <th className="border border-green-600 ...">header2</th> */}
            </tr>
          </thead>

          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
}
