import axios from "axios";


let API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})


API.interceptors.request.use((req)=>{
    let accessToken = localStorage.getItem("accessToken");
    if(accessToken){
        req.headers.Authorization =  `Bearer ${accessToken}`
    }
    return req;
})

API.interceptors.response.use((response)=> response, async(error)=>{
    let originalRequest= error.config;

    if(error.response.status ==  '403' && !originalRequest._retry){
        originalRequest._retry = true;
        let refreshToken = localStorage.getItem("refreshToken");
        

        let res = API.post("/refresh",{
            refreshToken
        })  
        console.log("ressssssss");
        console.log(res);

        localStorage.setItem("accessToken", res.data.accessToken);
        let accessToken = localStorage.getItem("accessToken"); 
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return API(originalRequest)
    }

    return Promise.reject(error);

})

export default API;
