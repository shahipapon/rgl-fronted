/* eslint-disable jsx-a11y/heading-has-content */
import beautify from "beautify";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router-dom";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import atomDark from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark";
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ComponentMapper from "../../components/ComponentMapper";
import rglAPIController from "../../services/api.services";
import dateFormatScipt from './dateFormatScipt';
SyntaxHighlighter.registerLanguage("jsx", jsx);

export default function TableFrontend() {
   const [rglConfig, setRglConfig] = useState([]);
   const [maxRows, setMaxRows] = useState(0);
   const [cp, setcp] = useState("");
   const [showCode, setShowCode] = useState(false);
   const container = useRef(null);
   const history = useHistory();

   useEffect(() => {
      getDesignedLayout();
   }, []);

   async function getDesignedLayout() {
      const response = await rglAPIController.getTableConfig();
      let page = response.data[0].config;
      page = JSON.parse(page);

      let orderByAscX = _.orderBy(page.items, ["y", "x"], ["asc", "asc"]);
      console.log(
         "🚀 ~ file: index.js ~ line 35 ~ getDesignedLayout ~ orderByAscX",
         orderByAscX
      );

      var groupYwithX = _(orderByAscX)
         .groupBy((x) => x.y)
         .map((value, key) => ({
            column: key,
            rows: {
               row: value.map((e) => e.type),
               controllProperty: value.map((e) => e.controllProperty),
            },
         }))
         .value();
      console.log(
         "🚀 ~ file: index.js ~ line 37 ~ getDesignedLayout ~ groupYwithX",
         groupYwithX
      );

      const maxRows = Math.max(
         ...groupYwithX.map(({ rows }) => rows.row.length)
      );
      setMaxRows(maxRows);

      setRglConfig(groupYwithX);
   }

   function renderTableData() {
      return rglConfig.map((column, index) => {
         const fillCount = maxRows - column.rows.row.length;
         const fillArray = new Array(fillCount).fill("---");

         return (
            <tr key={index}>
               {/* Table Cells */}
               <td className="border border-black p-5">{index + 1}</td>
               {column.rows.row.map((row, index) => (
                  <td className="border border-black p-5">
                     {console.log(
                        column.rows.row[index],
                        "--",
                        column.rows.controllProperty[index]
                     )}

                     <ComponentMapper
                        rows={row}
                        controllProperty={column.rows.controllProperty[index]}
                     />
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

   const onCopy = () => {
      console.log("copy");
   };

   const checkOutput = () => {
      console.log("ref: ", container.current?.innerHTML || container.current);
      // console.log(beautify(codeString, {format: 'html'}));

      setcp(container.current.innerHTML);
      setShowCode(!showCode);
   };

   return (
      <>
         <div className="container mx-auto px-20 mt-5 text-center ">
            <div className="inline-flex  text-left pb-4 ">
               <button
                  className="bg-white-500 border border-black  rounded-full  font-bold uppercase text-sm px-8 py-2 mr-2"
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

            <div className="flex flex-wrap content-center" ref={container}>
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
               <h2 id="showDate"></h2>

               <script src="./index.js"></script>
            </div>
            <button
               className="bg-red-500 text-white rounded-full  font-bold uppercase text-sm px-8 py-2 my-2"
               onClick={checkOutput}
            >
               {" "}
               show code
            </button>

            <section>
               <CopyToClipboard
                  onCopy={onCopy}
                  options={{ message: "Whoa!" }}
                  text={beautify(cp, { format: "html" })}
               >
                  <button
                     className="bg-red-500 text-white rounded-full  font-bold uppercase text-sm px-8 py-2"
                     onClick={() => {
                        setcp(container.current.innerHTML);
                        if (
                           window.confirm(
                              `\nCode copied.\n\nYou can directly paste your code in any to html check the output. I have generated a html with tailwind support.(Check 'test copied html here' folder)\n\nAlso you can directly check from w3schools(without css). Delete all inside body section & paste.\nclick "ok" to go  website `
                           )
                        ) {
                           window.open(
                              "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_table_collapse",
                              "_blank" // <- This is what makes it open in a new window.
                           );
                        }
                        // alert(`  <a href=""></a>`)
                     }}
                  >
                     Copy to clipboard
                  </button>
               </CopyToClipboard>
            </section>
            <section>
               <CopyToClipboard
                  onCopy={onCopy}
                  options={{ message: "Whoa!" }}
                  text={dateFormatScipt}
               >
                  <button className="bg-red-500 text-white rounded-full  font-bold uppercase text-sm px-8 py-2 my-2"
                    > copy script only for datepicker
                  </button>
               </CopyToClipboard>
            </section>
         </div>

         <div className="container mx-auto px-20 mt-5  ">
            {showCode && (
               <SyntaxHighlighter language="jsx" style={atomDark}>
                  {beautify(cp, { format: "html" })}
               </SyntaxHighlighter>
            )}
         </div>
      </>
   );
}
