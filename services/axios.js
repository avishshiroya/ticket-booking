import axios from "axios";

export const runApi = async (method, api, body,headers) => {
  try {
    switch (method) {
      case 'get':
        var axiosrun = await axios.get(api,{headers});
        // console.log(axiosrun.data.data);
        break;
        
      case 'post':
        // console.log(method,api,body,{headers});
        var axiosrun = await axios.post(api,body,{headers},{ withCredentials: true });
        // console.log(axiosrun);
        break;
      case 'put':
        var axiosrun =  await axios.put(api,body,{headers},{ withCredentials: true });
        break;
      case 'delete':
        var axiosrun = await axios.delete(api,body,{headers},{ withCredentials: true });
        break;

      default:
        break;
    }
   
    return axiosrun.data;
  } catch (error) {
    const data = {
      status: "error",
      message: error.response.data,
      data: [],
    };
    return data;
  }
};
