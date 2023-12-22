import axios,{AxiosError, AxiosInstance} from "axios"
const  auth : AxiosInstance= axios.create({
    baseURL : "/"
  }) 
  auth.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      if (user) {
        const tokens = user.token;
  
        if (tokens) {
          config.headers["authorization"] = `Bearer ${tokens}`;
        }
      }
      const superUser = JSON.parse(localStorage.getItem("superUser") as string);
      if (superUser) {
        const tokens = superUser.token;
  
        if (tokens) {
          config.headers["superUserauthorization"] = `Bearer ${tokens}`;
        }
      }
      const companyName =localStorage.getItem("companyname") as string
      console.log(companyName);
      
      config.headers["companyname"] = companyName || "brototype";
     
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  
 
  
  
  export default auth