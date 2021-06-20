// import 'react-resizable/css/styles.css';
import _ from "lodash";
import React, { useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import CardImageMulti from "../../images/CardImageMulti.png";
import CardImageSingle from "../../images/CardImageSingle.png";
import rglAPIController from "../../services/api.services";
import "../../styles.css";


const axios = require("axios");
const ReactGridLayout = WidthProvider(GridLayout);

const dndImageComponents = { CardImageSingle, CardImageMulti };
const dndImageComponentsBase64 = {
  CardImageMulti: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABXCAIAAAB9bncAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QYTCDIdx9REUAAAFE5JREFUeNrtXHl0XFd5/+723iySRrtGqyVLsrxJVrzEgThWFiC0CSEkJWkpBXqgG4fT9lAOLUsp5/QUOATKoS2UQIEeEkiaOKkhe5zFieR4iy3LjizJ1mbJWkfLaNY37917v/4x1mpLGgOyVezfHzozmnffe/N73733+77f9w1BRLiO1ECv9g38f8J1si4DfO4brbW+PikXxyxZiCiVRgByte9p1WJ2GmqtEfE6U0tglixEhOs745K4Qgt80mznuikXuywLDliF4Jd1NKIGBIDkVyKEpsQ1IrhMQ2uNhAIiaq0RBGcIoKQESikBKZVhGIDadiRN7bRXHpd3W8IwDNMwTNMwTWEaJIUVDoGazP7B9//z/PBE4+uvToQiCUcRlBPB4NTUFOEClGMlpMs0giPn/mfPU+GEZpSsTgu7DMsihIx2nZJSW5EpGR1zZxYWrN/JGOLy7oYe6O14as+ePH+et+34W83t1aUFR48cJy53bf222EhX+2D0y1/+3LN7fjGo/Sanq5KolMlCrblpjPScOfrQ+/O9WJmnOcj287HuzX91y19+G5UNZFELJZTGY5H1W2/OorGn978pt6/v6el2uzPqt25BZgR62lrau0rW1ToJx+XLJX1DLzUe+fCduxzHZmzVTcYUyEJkjNka9JHv1BaqnMw0X5o+O+CcDaGnvzURixuGgagX9c9QM5G2YcOGDVUVWcVVkWgop3hd1ZoyAgoRN2/afMP2waBtpJlid8Nt9FjrLTfeoLVencsWmdmApJRK6YvXbETNDePE09878Og/U+4SJtu61hea6HXd/s0dH/wUOglC2bJXMQSzpTL47JFJ73fGB04kbG4YjIDW2pE6ldXwymN5yyKEaA2h/lOOVI6dcDnKDgFqklVcaVCwUvL40bIdSsBKqDnPAIEQSkApTSklhNiWhUAYZ4sxlXyu5OoRmco0BAKw7RPfrE7rcoc6tJlhZxntR8dHzzRvvPG2VP1YRKURACilqDVhzBScANiO8rgN23aEIQgIREzYTpLHaXYIpSQ5RBiCAtiOxOkQFgEoIVrrJIkrPXlTIIsQrRyXO/2AvTbTPG/kpgXHCdXu8TNvxuVnOWOpsOUyjeQLpRQzhGNFm08dl+jdXr/uyJHmuq3bB8919gyMVVTVFOdnLRibHJKIhU+1diUcqN9ab4q5j3LWtG3bgZW0u1QsS2kluVusL18njz4DDvoSsZxC2D8xbkVj6V5DK8WEoZW69GgEwXHfs3uHJiLc7b3j9oZTRw9lFlcERwbHo6KzpdHJqq4o6vzFL54Mx6Jmxtuf+JMHml5+zl9Tj1ND54bGDW/6HbftbjlyMKukPBYYOdM/ceOO+ta3m7rHZWmO6Oif2llf3fjGASJE8doNt75rq207KzdP2Ve/+tXkqwuB9PwrEUKpEFwYDCAOaWdffzQS4YPhzCNnR1XhzdVbb/WmpwPn0VBICOOSXBEmnNjY6/sP2kpZ0fBYMDrS136w+TQobTDe199vuljbOx3MNEpK1qjE1LG3W/LWlPV3tk1MxiwrZsXCY1Oxod7Th1ramSbCm7ll89qfPfpUw66b9r95oCDHu/e5fZnp6dF4bHQkULXxBg/XuGJ5k8XJQiSM2fFwz76HT762x2PQ7jceaXrrQPsEPzua8LK4PdxaGXx2ROY0/fzrlEBh9RYl5UVPlRCgSsaDU1ZRWXFRoT9w/lz3+ZHSirWFuTmaQElxQWA8WFFR1tfTMzIy5M4pfc8t2w837o8qY0ttXV5+dnFh0WhfT89goLS8orSgMB4eC0zFDeKMBmMerocno1WVlSXFxfkFeV63u7isws3Jyvm0y7gOhJC+F7+x7wdf3ly7oWZ91VBvN2rbYAg8zSFCjrUd6ozv+tg/brrvn5SUS1wmeRVEFELEY1EmTM6oRgQl47bOzPAcO9h4LhB+3+/9vrACDz/833UNd926Y2PcShBCheCxaJQbJmdUKyfhaK/bmJyKZKR5Ypbjy/AmEnbyIa30Rrk0WQiEcs56j79qvfO/eeHD0UgEEKXSjGJOpqcLa7J2faa8bnfCkQRSzRtSxlArnAnGCUilXYYAANtxtEbDNOj81Xp2CCGUEKU1Z0wpTSlRSl0xZ2JZpxRRozANAFCBdhhpVqF+Sgj1lem8epFXgwBOIkEoTT3DOt9dSvoJs9s/ISSZq6GUzux1s0MuHA6ISAhceHOlMJ8sjYwxnHGu4QIDqBUBAoLDnE8AAByJgIQyWLWx728Vs64DIUQradv2osllSwPiLIuEXGvi0CxZlFJKibZlaunKJGv6at//FQW5ONW7ynO7VxHkOjWp49padH5DLIwNk/Pwat/VKsU8shyprs/KJTBfkdbX1u52uZinSOM14lz+ulgg31/Ve/mdU6R/zSy41ioZ+WmNlM6LBLXWlDGCSBgXjKxo9u5KkYWICMzkBIiypcbLUKsQwWWaACAVmgbRCHSaDanBpCClRMrt2NTglFVS7JfOKuUrNbIQKWOc0Re/s3e8d/iPvvsXFLhty5SEHQRDkMZXXoiwrJvq1h5tbt2yecPRwwcdpLlFFbWVBQcON+949+78TM9Tj/10AIr+7s8ftLVmbFl5bbWSRSi1orHO450jr5wYPX3mh8q+7WO3r926AZdP4SKhIhEdPdV6FoRboHXsrf1nznYIkOG4Gh8LvPZ83/hYyJ1fXleALWcHy2tLAWbtbrVhebJQa8M0Tr/d8dIXn6FSJHxVQ3tPTw1O/s0TX6CEwTKbAiEElMbi8mp/dlpj0/6QDcU+X2lhoVSagFLSMj256yvLTBLbfsOmc1OR5KirTcsiX2ZZRVor7XIZJ19t3vNnP+ceZnCTxl1WufX5Z7/EgKe2g6LjSCCEgp4KRTMyMhAVAEEgblOMBgIZvmyP2yAAtiOTyb+rTculsbxlUUoU4Cv/9UI77mVaGMCzcEcWLVRSMwGgU7EDYhhJ7YcUFHikVDPXVRr9fr+UyradZHZ0KaamxdfVSxYiECA7/+DdweZxKoXQhrZIPBTXShGDaNAkBbb0dGxg2woACKGM0WRdm5WwKSEAwBhNSvkXRCacSdMTRCSUMsaSQwCSaWUy8xeuiKyf0vZPACp31hT61rrRY7EpwjVDgYA65fCIcyGEEIITQkxDaGlPTk5GozHKhNs0GGOmIbQGl2kAojAEJYRybgghOAcA0xDKSUwGg7FYPHlHhhBJ4QcRDEMIIejKl8ClQBYBjaCUpG4YU/0Dqs0mcUygchxD8FSWLEppKDgxOhoYnwgCquHRMamc0y2HXtj3FteRhx7614mI9fzTj3//P/79qedeMwwxOjgQSzjRUHBkNDA+OQWoRkbHHcc+c+rEs8+9TAUHaQ2NBKRjjY4FDU6Hh4fHAoGY5XC2soVwKRWGUAJZ/hyRLspg81pebxPr7YFD3/3oQx//+qfK6tZqRy+xzCNQUNEnHvnJcDBOhXn3ffefOfRKWGRnC8nNnMbX9oUd3XKo6XTnOdOd1t3e8ksV7+s5480tgvB431CAuTz33Hd/64GXYq5cv4trYBzgiSce8/grY+N9k3HIynB1t3XYhBSsqfn4Rx+gKJeorFtZshCRCRYaD/3yW0+cDbQFnAk1JaMq5nB57kTfVxq+cPeX7n3wcx9JJBxyae8IKaVWOOzxFdRXZFDEppdfmBgfsfm4zssBbiW4Co0P9w3kc0OYgoUiicGBwTXrNwx0d/oyi+r9hZTAmy89Pz4+7PBJXlicQNrb23UuEPrAzsLXu9pKS/yHT7S9a9sOW9rByVAwIvO9RK5Y6mQZ1yHpN7S8dvxb93xj/bqasIrEnbhBzWwj21HOibMnt923/UuPfmVxsgAI1TLW23OeCU4JjUfD3b3nCkrLc7zuYDRWv6Wu60xHWprnub17Biei77n7gfqK9C9+/otl29/74F23RaNhwUUsEuru7StcU56bnhGcGHG412fI7sFgWX5a92CwvnZ9PBqjjCqFJWsqTL6CuctlyEpu545t//1HPl3QVpaNeQ7aAACSjIfH9xsvfu2xb+9qaLAsmy5RAkqIwdkcHXIW05VZYMWi48FwUZE/Fpo8291fXr0+02ssGHJJyXuGGQLgSLmia3wqZZJoGuLEiebxxrHRVwMT/ROUEm9emm+jr+hDRXU7byApOA+z3hOiRpxRnmccK0qZ4DRh25QJwYhUSsoLunxSoJ4ZApCUoi8wRed4DFe31mEeXwBgWXZiKgEEXD6XaQoAcBz523qW0zU8qDUSuhoDxFmylJRyEbIg6VUiMM4IIwCgldZSA4HVWVa8Qpgj31OqbNuKJhCX2k6S3K7KdNOKY17UqpSSMkX5/lrE6g3xVyGuoRXnN8d1si4DCxrKV7sYdXWxoKFcLVEYinNaTcm0kHW17/+KYpasS9bBJ5FkiXPO58Q0Umkp5TVF2TzLumTeVmttmgYBiEZj3QMD4UiYAElPTy8sKkrzehAgkbCvEdd06RQNAhCXafT19z//wktvHzs2ORnUWqHWXq+nyO+vr9/ScOutJcXFtiNhydJurXUqpepaa0LoqrXUJWJDRKAGJy8+u+fxp1/MNqEwJ7MsPzMYjU9FrcBUNBCKW47O9GU8cO+dt7//XtuWhFyaL0QwDa60JpSi0ho14oU4SSmVZCcp6wvOtNaOvHKl7ZeFRS0LEZjBoke/8fTjr+f71nzto7cItxsYSVbe2pY9Goy8+k5fY8fYr578yY68Xs+2v1W2ffGXRKAGs376k0fuvPverraWjVtv9JoGpxiNxSghHq8XpeMocJui4+TR/UdOfeD+Pyz0uexV2Z+5CFmokJu8f+/YqcdDWPuBdfnC67bjDgFIJvk4JSX5mR9/b1YseqR1wCu6fwwFG6H4feAkgCxU3gnBM+8cC8VUXkGWq/XokZNdVSW5hw8dJy5X/bad8dGujuHYpz/9mZqadU8+9auRyWhRlgdBpSIarQayEKggiQh0/NDlcrmYzPN5gQvDxYASbdsAQIWBWhPBPabhYo5pGLrjYZLfAIQvkBIJpfFoZPONDek69Mz+Jr1zw9mzZzjfWlu3Cbkx2HHi5JnusurNjp1wKMnOzBgbGYW1eVddIkyZLNTABRl52wkP+rPd63OnFLJwZ3sgMMGEKKqsBkL7W08pxynIy8r2mB5hU2GocC9MnICCneCoed8TNROe6qrqzTVrM/zlsVj4lobSdeXllGiNuHHDxtr68yHl9me5Tx49nllcVb+xQmlNVkx0+G2TBQAESLgH0AGVfkNeZvOZ3vQddXFfjiF4f9cIF8KbtyEUjkxaiVBoJM9MAx0EHYJIL/h3Lqx+QA3Mc+P2ekfqW2+/Y/bfMw3lNdUAkLCd2h031+0ApbRclQsWLO06EAJSYWV25qQyXOkZmTl+x3bSaFzajicv35ubr6ZGvd7hSm/GTJJzkVgJrYRDKVgJOX3mWTJmtuNEwp7xii9pWau4odyVC8AJtbPSQw3Z21xqInp+zE2gyJ9nRcJj509xxn1eg/lzPE6/JgkADmbu4vqhVpokm78ppQt6wBgXBqfJHykwDQ4AjuOo6UCVUoqoCWGGIZLFI9NZ+aTDQa9uQzkBDejbQLgXQBp0XMaGMoo2ZZiuSCQ6MRkkGjMyMz1eN5FOmtNnsjEABJGBvhrQcLHGiTBT+adNQ+g5uQ6lgVFwrMihoyfXrKstzPa8c7JFc/e6mmqXuGBBWmtKBUr7dEtLRGFdXZ1LzGbo59YR2o6zouVKlyKLUFAOZFRh5mYYP+JJDxF8MzSWZaUV+gwqKEHQhOBYyDKtoIs3utMlOjb63wVppSAX/tQKIhgCXnt+b5jl3LJt3cEjLfV1Gw8fPOBomldSWVdV8ObB47c0NHSdPNw2GFqfTfc1HoqEI7vu/GBpBp7uPC8M966G3T1tx12ZRXJy9FhXf/3W+qGu1iPtAxsrC5vf6d717u2HDjRK5NkFpbft3qmdFWzAX8zPQqCA1Z8kY4cBqNun7LE3pyK7/RvXRRG0Rl9mZn9bZ47dmJ6TICCAMKz65CVPRKiwoiMdXeepGDsCVsvRps6eTg+nEUtGI6HXX+gKBuN5FRtuvOmmZxpb2sZoYVkZseL97zQPe3giIRFIU9MBDA+c7HprXZmfuzJMgF/+6oWb7/pQ0/59BSWlP/7+jwrLi+Nxe2g4ULNpU1m2J6H0CrG12G5IwbGhYKeu/iTv+B51u3LW75waze863Ypen0YYHRpgZnZeZRWMndPxoNz4OcjdcimPlBACqKGkvNqfndZ04I2o4uV5ecUF+VJpAkhATkbAn8GPNbUVFpZwK9DeOxCNRG/efUea0JowYbrOd7e1d/YX+MuzcnODoanXmw7m+wvbW9tysjP7+ofWbdrkL8xHgGgkqnVKZa6/NpaLDRntOvbIZ59srd121788uNs6/QYfbkdAmVvtrrvjr3/2xnD7c9/68JaS+j92HLm4+aNSGoAwCuFI1OtNmxaQiGmKiYkJl8s9OTFZVFocnRh+5dU3sktrbr2pPh63gJBkD3osGqbcNA2upIxZji/dExibyMryhcLRnJzshGUlt0jK2IrulMs1lAPRnD92cODfnjv89Qe2b68p2/NyYzQh//Se236078TP3+r6hw/tun97AZFO8myLXuaCY0E4Y0rJmSO1RiG41poxats24wangIhzf58NMdmMrLXG5JanlOKcK6UYo878I1eSq1RqHUALw7Rse2gy3hsI7W3uZ5TeU1+cleaqLcmmjNp2clFf8qEiwpxi0WkbvKDOz63h01oTSul0t/hcFuYW+c1rKJ8++ZWV7y80lC98PkojZ5RfVPrhSKU0stWotK8IFjaUO45zMVkEwAFAQEDQSUdxOpOX/OgawbyGckJASSeVSlG17BG/i1jYUH5dClsC1+X7y8BqTButWlwn6zJwnazLwHWyLgPXyboMUNu+dpzK3xT/B/afesfkPMYgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA2LTE5VDA4OjUwOjA4KzAwOjAwxA799AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNi0xOVQwODo1MDowOCswMDowMLVTRUgAAAAZdEVYdFNvZnR3YXJlAGdub21lLXNjcmVlbnNob3TvA78+AAAAAElFTkSuQmCC",
  CardImageSingle:
    "data:image/png;base64,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",
};

export default function Rgl() {
  const [allStates, setAllStates] = useState("");
  const [dndClickedDataInfo, SetDndClickedDataInfo] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedItemKey, setSelectedItemKey] = useState();
  const [userName, SetUserName] = useState([]);

  useEffect(() => {
    getPreviousRenderedData();
    getUser();
    
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

    setAllStates(newGridItem);
  }

  async function saveStatesToDB() {
   

    const response = await rglAPIController.updateRglConfig( JSON.stringify(allStates));
    
   
    response && alert('Done!!! Please go render page to check')
 }
  return (
    <>
  
      <div className="container mx-auto px-20">
      
        <div
          className=""
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
        >
          Dragged Components:
        </div>
        {/* Drag MEnu  */}
        <div>
          <div
            className="border inline-block my-4 bg-gray-300"
            onClick={() => setSelectedItem(null)}
          >
            <>
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
                  <div style={{}}>
                    <span style={{ paddingBottom: "10px" }}>{item.name}</span>
                    <img src={dndImageComponents[item.image]} alt={item.name} />
                  </div>
                </div>
              ))}
            </>
          </div>

          {/* components properties */}

          <div className="p-2 inline-block">
            {selectedItem === "item1" ? (
              <label>
                Select Name For This Component:
                <select
                  className="pl-2 m-2"
                  // value={userName}
                  onChange={(e) => {
                    allStates.items.map((obj) => obj.objKey === selectedItemKey  ? (obj.info = e.target.value) : ""  );
                    console.log(e.target.value);
                  }}
                >
                 {Object.keys(userName).length >= 1
                    ? userName.values.map((v) => ( <option key={v?.id} value={v?.id}> {v?.name}  </option>  ))  : ""}
                </select>
              </label>
            ) : (
              <label>No Properties available for this {selectedItem}</label>
            )}
          </div>

          {/* components properties */}
        </div>
        {/* Drag MEnu end  */}

        <ReactGridLayout
          className="layout border-4 border-indigo-600 bg-gray-300 overflow-y-auto  	"
          style={{minHeight:"90vh"}}
   
          cols={12}
          rowHeight={20}
          onDrop={onDrop}
          useCSSTransforms={true}
          isResizable={true}
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
        <div className="text-center m-2">
        
        <button 
        className="bg-green-500 hover:bg-green-700 px-8 py-2  rounded-lg transition delay-150 " 
        onClick={saveStatesToDB}>Save</button>
        </div>
      </div>
    </>
  );
}

const draggedItem = [
  {
    key: "",
    objKey: 1,
    name: "Single Item",
    type: "item1",
    image: "CardImageSingle",
    info: "",
    layout: {
      resizeHandles: [],
      w: 4,
      h: 2,
      x: 0,
      y: Infinity,
      // minW: 0,
      // maxW: 12,
    },
  },
  {
    key: "",
    objKey: 2,
    name: "List  Item",
    type: "item2",
    image: "CardImageMulti",
    layout: {
      resizeHandles: [],
      w: 4,
      h: 2,
      x: 1,
      y: Infinity,
      // minW: 3,
      // maxW: 12,
    },
  },
];
