import axios from 'axios';

const GetHeaders = {   
      'Content-Type': 'application/json' 
    };

export default class Http {
    private api;
    constructor(api_url: string) {
        this.api = axios.create({
            baseURL: api_url,
            headers: GetHeaders
        });
        
        this.api.interceptors.request.use(config => config, error => Promise.reject(error));
        
        this.api.interceptors.response.use(response => response, error => {
            if(!error.status) {
                return Promise.reject({status: 500, message: error.message});
            }    
            return Promise.reject(error);
         });
    }

    private HandleResponse = response => Promise.resolve(response);

    private HandleError = error => Promise.reject(error);

    get = endpoint => this.api.get(endpoint).then(res => this.HandleResponse(res))
        .catch(error => this.HandleError(error));
    post = (endpoint, payload) => this.api.post(endpoint, payload).then(res => this.HandleResponse(res))
        .catch(error => this.HandleError(error));
    patch = (endpoint, payload) => this.api.patch(endpoint, payload).then(res => this.HandleResponse(res))
        .catch(error => this.HandleError(error));
    delete = (endpoint, payload) => this.api.delete(endpoint, payload).then(res => this.HandleResponse(res))
        .catch(error => this.HandleError(error));
}



