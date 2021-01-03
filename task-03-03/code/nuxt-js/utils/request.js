import axios from 'axios'

const request = axios.create({
    baseURL:'https://conduit.productionready.io'
})

request.interceptors.request.use(function(config){
    return config
},function(err){
    return Promise.reject(err)
})
export default request