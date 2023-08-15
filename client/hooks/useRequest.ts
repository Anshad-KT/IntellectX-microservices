// import auth from '@/api/axios';
// import axios, { AxiosResponse, AxiosError, Method } from 'axios';
// import { useState } from 'react';

// interface RequestOptions {
//     url: string;
//     method: Method;
//     body?: any;
// }

// interface UseRequestResponse {
//     doRequest: () => void;
//     errors: any; // Change this to the appropriate type for errors
// }

// const useRequest = ({ url, method, body }: RequestOptions): UseRequestResponse => {
//     const [errors, setErrors] = useState<any>(null);

//     const doRequest = async () => {
//         try {
//             const response: AxiosResponse = await auth[method](url, body);
//             // Handle successful response if needed
//         } catch (err) {
//             if (axios.isAxiosError(err)) {
//                 const axiosError: AxiosError<any> = err;
//                 if (axiosError.response) {
//                     setErrors(axiosError.response.data.errors);
//                 }
//             }
//         }
//     };

//     return { doRequest, errors };
// };

// export default useRequest;
