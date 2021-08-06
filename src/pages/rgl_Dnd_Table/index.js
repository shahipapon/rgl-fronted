// import 'react-resizable/css/styles.css';
import _ from "lodash";
import React, { useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { useHistory } from 'react-router-dom';
import { dndImageComponents, dndImageComponentsBase64 } from '../../components/DndImages';
import draggedItem from '../../components/DndImagesProperty';
import rglAPIController from "../../services/api.services";
import "../../styles.css";

const ReactGridLayout = WidthProvider(GridLayout);


export default function TableDnd() {
  const [allStates, setAllStates] = useState("");
  const [dndClickedDataInfo, SetDndClickedDataInfo] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedItemKey, setSelectedItemKey] = useState();
  const history = useHistory();

  useEffect(() => {
    getPreviousRenderedData();
  }, []);

  
  async function getPreviousRenderedData() {
    const response = await rglAPIController.getTableConfig();

    let page = response.data[0].config;
    setAllStates(JSON.parse(page));
  }

  function onItemSelected(item, dragged = false) {
    
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

    const items = [...allStates.items];


    //automatically merge the main layout. no need to use merged anywhere
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
        w: 2,
        h: 2,
        controllProperty: {
          fontStyle:'',
          textColor:'',
          borderStyle: '',
        }
      }),
    };
    console.log("onDrop ~ newGridItem", newGridItem)

    setAllStates(newGridItem);
  }

  async function saveStatesToDB() {
    const response = await rglAPIController.updateTableConfig( JSON.stringify(allStates));
    console.log("🚀 ~ file: index.js ~ line 128 ~ saveStatesToDB ~ response", response)
    response && alert('Done!!! Please go render page to check')
 }
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="  md:grid grid-cols-12  gap-3 pt-2  border-4 shadow-2xl ">
          <h4>label 1</h4>
        </div>

        {/* Left Side  */}
        <div className="  md:grid grid-cols-12  gap-3 pt-2 ">
          <div class=" col-span-2  shadow-lg border border-gray-400 ">
            <div class=" py-2  text-center border-b-2 border-gray-400 shadow-lg ">
              <h4>Dynamic Control</h4>
            </div>

            <div>
              <div
                className="border inline-block "
                onClick={() => setSelectedItem(null)}
              >
                {draggedItem.map((item) => (
                  <div
                    className=" inline-block pb-2"
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
                    <div className="">
                      {/* <span> {item.name} </span> */}
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
          <div className="col-span-8 ">
            <div className="flex inline-flex  text-left pb-4 ">
              <button className="bg-red-500 text-white rounded-full  font-bold uppercase text-sm px-8 py-2"
               onClick={()=>history.push('/')}
               >
                Design
              </button>
              <button className="bg-white-500 border border-2 border-black  rounded-full  font-bold uppercase text-sm px-8 py-2 ml-2"
              onClick={()=>history.push('/tableFrontend')}>
                Html
              </button>
            </div>
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
              preventCollision={true}
              onLayoutChange={onLayoutChange}
              // onLayoutChange={(updateLayout)=>{
              //   console.log(updateLayout)
              // }}
            >
              {_.map(allStates.items, (el) => createElement(el))}
            </ReactGridLayout>
          </div>
          {/* end drag box */}
          
          <div class=" col-span-2  shadow-lg border border-gray-400 p-2 ">
            <div class=" py-2  text-center border-b-2 border-gray-400 shadow-lg ">
              <h4>Control Property</h4>
            </div>

           {/* Control Property */}

            {
              selectedItem === 'item_Date' ? <h1>Sorry!! No Property available for this this item</h1>  :
              (selectedItem === "item_input" ?
                  <>
                    <h4>Set Border Style(Default=solid): </h4>
                        <div 
                        onChange={(e)=>{ 
                          allStates.items.map((obj) => obj.type === selectedItem && (obj.controllProperty.borderStyle =  e.target.value) 
                           );
                        }}>
                          <input type="radio" value="solid" name="borderStyle" /> Solid( __ ) <br/> 
                          <input type="radio" value="dashed" name="borderStyle" /> Dashed( - - ) <br/> 
                          <input type="radio" value="dotted" name="borderStyle" /> Dotted( . . )
                        </div>
                  </>
                 :
                 <>
                  <div className="mt-4" onChange={(e)=>{  
                        allStates.items.map((obj) => obj.type === selectedItem && (obj.controllProperty.textColor = e.target.value)  );
                      }}>
                      <h4>Text Style: </h4>
                        <input type="radio" value="red" name="textStyle" /> Red
                        <input type="radio" value="blue" name="textStyle" /> Blue
                        <input type="radio" value="green" name="textStyle" /> Green
                  </div>

                    
                    <div className="mt-4" onChange={(e)=>{  
                        allStates.items.map((obj) => obj.type === selectedItem && (obj.controllProperty.fontStyle = e.target.value)  );
                      }}>
                        <h4 >Font Style: </h4>
                        <input type="radio" value="bold" name="fontStyle" /> Bold <br/>
                        <input type="radio" value="italic" name="fontStyle" /> Italic  <br/>
                        <input type="radio" value="boldItalic" name="fontStyle" /> BoldItalic <br/>
                    </div>
             </>
        
              )
            }
           
            
           
            

           
          </div>
        </div>

        {/* components properties */}
      </div>

      <div className="  md:grid grid-cols-12">
        <div className="col-span-12 text-center pb-5">
          <button
            className="bg-red-500 text-white rounded-full  font-bold uppercase text-sm px-8 py-2"
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
