import React, { useEffect, useState } from "react";
import rglAPIController from "../services/api.services";

export default function Item2() {
  const [userInfo, setUserInfo] = useState([]);
  const [userInfoSize, setUserInfoSize] = useState();
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await rglAPIController.getAllUser();

    setUserInfo(response.data);
    setUserInfoSize(response.data.length + 1);
  }

  function renderRandomUser() {
    let randomUser = Math.floor(1 + Math.random() * userInfoSize - 1);
    return (
      <div className=" sm:grid grid-cols-8 px-4 py-2 bg-gray-50 shadow-md mb-5">
        <div className="col-span-2">
          <img
            className=" h-16 w-16 object-fill pt-1 rounded-full "
            src={userInfo[randomUser]?.image}
            alt={userInfo[randomUser]?.name}
          />
        </div>
        <div className="col-span-6 pt-2">
          <h4 className=" ">{userInfo[randomUser]?.name}</h4>
          <div className=" pt-1">
            <p className=" ">{userInfo[randomUser]?.mail}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <div className='grid grid-cols-12 p-10 gap-4'> */}

      <div className="col-span-4 md:grid grid-cols-1 gap-6  lg:px-0 md:px-5 px-5 py-5">
        {/* ....................... */}

        <div className="col-span-1 py-4 border border-gray-600 rounded p-4 ">
          {/* .............. */}

          {renderRandomUser()}
          {renderRandomUser()}
          {renderRandomUser()}
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
