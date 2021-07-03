const axios = require("axios");

const path = {
  URL: "http://localhost:3008/api",
};

const rglAPIController = {
  getAll: async () => {
    try {
      const response = await axios.get(`${path.URL}/rglData`);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  },

  getTableConfig: async () => {
    try {
      const response = await axios.get(`${path.URL}/tableConfig`);
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  },
  updateRglConfig:  async (data) => {
    try {
      const response = await axios.put(`${path.URL}/addrgldata`,{
        data: data, 
      });
      return response;
    } catch (error) {
      console.log("error", error);
    }
 
  },

  updateTableConfig:  async (data) => {
    try {
      const response = await axios.put(`${path.URL}/addtabledata`,{
        data: data, 
      });
      return response;
    } catch (error) {
      console.log("error", error);
    }
 
  },

  


  getAllUser: async () => {
    try {
      const response = await axios.get(`${path.URL}/user`);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  },

  getOneUser: async (id) => {
    try {
      const response = await axios.get(`${path.URL}/user/id/${id}`);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default rglAPIController;
