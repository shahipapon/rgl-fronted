// import 'react-resizable/css/styles.css';
import _ from "lodash";
import React, { useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { dndImageComponents, dndImageComponentsBase64 } from '../../components/DndImages';
import draggedItem from '../../components/DndImagesProperty';
import rglAPIController from "../../services/api.services";
import "../../styles.css";

const axios = require("axios");
const ReactGridLayout = WidthProvider(GridLayout);


export default function TableDnd() {
  const [allStates, setAllStates] = useState("");
  const [dndClickedDataInfo, SetDndClickedDataInfo] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedItemKey, setSelectedItemKey] = useState();
  const [userName, SetUserName] = useState([]);

  useEffect(() => {
    getPreviousRenderedData();
    
  }, []);

  

  async function getPreviousRenderedData (){
    const response = await rglAPIController.getAll();
    let page = response.data[0].data;
    setAllStates(JSON.parse(page))

  }

 async function getUser(){
    const response = await rglAPIController.getAllUser();
    SetUserName({
      values: response.data
    });
  }
  function onItemSelected(item, dragged = false) {
  console.log("🚀 ~ file: index.js ~ line 43 ~ onItemSelected ~ item", item)
    
    const newGridItem = {
      // ...allStates.items,
      type: item.type,
      image: item.image,
      name: item.name,
      objKey: new Date().getTime(),
      info: "",
    };
    //   setAllStates(newGridItem)
    setSelectedItem(item.type);

    dragged
      ? SetDndClickedDataInfo(newGridItem)
      : SetDndClickedDataInfo(newGridItem);
    // SetDndClickedDataInfo(item)
  }

  function onLayoutChange(updateLayout) {
  console.log("🚀 ~ file: index.js ~ line 72 ~ onLayoutChange ~ updateLayout", updateLayout)
  let gfg = _.orderBy(updateLayout, ['y', 'x'], 
  ['asc', 'asc']);
  console.log("🚀 gfg", gfg)


  var result = _(updateLayout)
            .groupBy(x => x.y)
            .map((value, key) => ({y: key, x: value}))
            .value();
            console.log("group res", result)


    const items = [...allStates.items];

    const merged = _(items) // start sequence
      .keyBy("i") // create a dictionary of the 1st array
      .merge(_.keyBy(updateLayout, "i")) // create a dictionary of the 2nd array, and merge it to the 1st
      .values() // turn the combined dictionary to array
      .value();

  }

  function createElement(layoutItem) {
    return (
      <div
        data-grid={{ ...layoutItem }}
        key={layoutItem.key}
        onClick={() => {
          setSelectedItem(layoutItem.type);
          setSelectedItemKey(layoutItem.objKey);
        }}
      >
        <div selected={layoutItem.key} >
          <button
            className="remove absolute -top-1.5 right-0 cursor-pointr"
            onClick={() => {
              setAllStates({
                items: _.reject(allStates.items, {
                  i: layoutItem.key.toString(),
                }),
              });
            }}
          >
            X
          </button>
          <div >
          <img
          // className="bg-red-600	"
            // style={{ width: "90%", height: "90%" }}
            src={dndImageComponentsBase64[layoutItem.image]}
            alt={layoutItem.type}
          />
          </div>
        </div>
      </div>
    );
  }
  function onDrop(layout, layoutItem, _event) {
   
    const itemKey = new Date().getTime();
    const newGridItem = {
      items: allStates.items.concat({
        i: itemKey.toString(),
        key: itemKey,
        type: dndClickedDataInfo.type,
        image: dndClickedDataInfo?.image,
        name: dndClickedDataInfo?.name,
        objKey: dndClickedDataInfo.objKey,
        resizeHandles: [],

        x: layoutItem.x,
        y: Infinity, // puts it at the bottom
        w: 4,
        h: 4,
      }),
    };
    console.log("onDrop ~ newGridItem", newGridItem)

    setAllStates(newGridItem);
  }

  function saveStatesToDB() {
    axios
      .put("http://localhost:3008/api/addrgldata", {
        data: JSON.stringify(allStates),
      })
      .then((res) => {
        console.log('res',res);
        
      })
      .catch((err) => {
        // console.error(err);
        alert('Something Wrong')
      });
    // console.log('allStates: ',allStates)
      alert('Done!!! Please go render page to check')
 }
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="  md:grid grid-cols-12  gap-3 pt-2 lg:px-0 md:px-5  border-4 shadow-2xl ">
          <div class=" col-span-12  shadow-lg border-2 border-gray-400 ">
            <div class=" py-2  text-center border-b shadow-lg ">
              <h4>label 1</h4>
            </div>
          </div>
          {/* ......... */}
        </div>
        <div className="  md:grid grid-cols-12  gap-3 pt-2 lg:px-0 md:px-5  border-4 shadow-2xl ">
          <div className="col-span-12 text-center shadow-lg border-2 border-gray-400">
            <div className="flex inline-flex  text-left py-4 ">
              <button
                class="bg-red-500 text-white rounded-full active:bg-purple-600 font-bold uppercase text-sm px-8 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Design
              </button>{" "}
              <button
                class="bg-red-500 text-white rounded-full active:bg-purple-600 font-bold uppercase text-sm px-8 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Html
              </button>
            </div>
          </div>
        </div>

        {/* Left Side  */}
        <div className="  md:grid grid-cols-12  gap-3 pt-2 lg:px-0 md:px-5  ">
          <div class=" col-span-3  shadow-lg border border-gray-400 ">
            <div class=" py-2  text-center border-b shadow-lg ">
              <h4>Dynamic Control</h4>
            </div>

            <div>
              <div  className="border inline-block my-4 "  onClick={() => setSelectedItem(null)} >
                {draggedItem.map((item) => (
                  <div
                    className=" inline-block pr-10 mx-2 pb-2"
                    key={item.name}
                    draggable={true}
                    unselectable="on"
                    title={item.name}
                    // this is a hack for firefox
                    // Firefox requires some kind of initialization
                    // which we can do by adding this attribute
                    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", "");
                      onItemSelected(item, true);
                    }}
                    //   onDragEnd={(e) => onItemSelected(item, true)}
                    data-layout={item.layout}
                    onClick={() => onItemSelected(item)}
                  >
                    <div className="py-2 px-6">
                      <span> {item.name} </span>
                      <img
                        className="object-cover object-center "
                        src={dndImageComponents[item.image]}
                        alt={item.name}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* end left side */}

          {/* Drag Box */}
          <div className="col-span-6 border shadow-lg">
            <ReactGridLayout
              className="layout border-4 border-indigo-600 bg-gray-300 overflow-y-auto  	"
              style={{ minHeight: "90vh" }}
              cols={12}
              rowHeight={20}
              onDrop={onDrop}
              useCSSTransforms={true}
              isResizable={false}
              isDroppable={true}
              containerPadding={[20, 0]}
              preventCollision={false}
              onLayoutChange={onLayoutChange}
              // onLayoutChange={(updateLayout)=>{
              //   console.log(updateLayout)
              // }}
            >
              {_.map(allStates.items, (el) => createElement(el))}
            </ReactGridLayout>
          </div>
          {/* end drag box */}
        </div>

        {/* components properties */}

        {/* <div className="p-2 inline-block">
          {selectedItem === "item1" ? (
            <label>
              Select Name For This Component:
              <select
                className="pl-2 m-2"
                // value={userName}
                onChange={(e) => {
                  allStates.items.map((obj) =>
                    obj.objKey === selectedItemKey
                      ? (obj.info = e.target.value)
                      : ""
                  );
                  console.log(e.target.value);
                }}
              >
                {Object.keys(userName).length >= 1
                  ? userName.values.map((v) => (
                      <option key={v?.id} value={v?.id}>
                        {v?.name}
                      </option>
                    ))
                  : ""}
              </select>
            </label>
          ) : (
            <label>No Properties available for this {selectedItem}</label>
          )}
        </div> */}

        {/* components properties */}
      </div>

      <div className="  md:grid grid-cols-12  gap-3 lg:px-0 md:px-5  ">
        <div class=" col-span-3   "></div>
        <div className="col-span-6  text-center ">
          <button
            className="bg-red-500 text-white rounded-full active:bg-purple-600 font-bold uppercase text-sm px-8 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={saveStatesToDB}
          >   
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
