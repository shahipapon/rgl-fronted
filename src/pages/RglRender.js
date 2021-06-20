import React, { useEffect, useState } from "react";
import rglAPIController from "../services/api.services";
import ComponentMapper from "./ComponentMapper";

export default function RglRender({ totalRow = 2 }) {
  const [rglConfig, setRglConfig] = useState([]);

  useEffect(() => {
    getDesignedLayout();
  }, []);

  async function getDesignedLayout() {
    const response = await rglAPIController.getAll();
    let page = response.data[0].data;
    page = JSON.parse(page);
    setRglConfig(page.items);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        overflow: "hidden",
      }}
    >
      {rglConfig.map((pageData) => (
        <div
          key={pageData.key}
          style={{
            //   display: 'grid',
            gridColumn: `${pageData.x + 1} / span ${4}`,
            gridRow: `${pageData.y}/ span ${2}`,
          }}
        >
          <ComponentMapper pageData={pageData} />
        </div>
      ))}
    </div>
  );
}
