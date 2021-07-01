import React, { useEffect, useState } from "react";
import rglAPIController from "../services/api.services";

export default function Item1({ pageData }) {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    if (pageData.info && pageData.info) {
      const response = await rglAPIController.getOneUser(pageData.info);
      console.log("user info", response.data);
      setUserInfo(response.data);
    }
  }

  return (
    <>
      {/* <div className="grid grid-cols-12 p-10 gap-4"> */}

      <div className="col-span-4 grid  grid-cols-1 gap-6  px-5 py-5">
        {/* ....................... */}
        <div className="col-span-1 py-5 bg-gray-50 shadow-md border-black border rounded p-10">
          {/* .............. */}

          <div className="grid grid-cols-5 py-4">
            <div className="col-start-3">
              <img
                className="h-24 w-24 object-fill pt-1 rounded-full object-center "
                src={userInfo.image}
                alt={userInfo.name}
              />
            </div>
          </div>
          <div className="col-span-6 pt-2 text-center">
            <h4 className=" ">{userInfo.name}</h4>
            <p className="text-center pt-2">{userInfo.mail}</p>
          </div>

          {/* ................. */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
