import axios from 'axios'

export const request = axios.create({
    baseURL:'https://conduit.productionready.io'
})

export default ({store})=>{
    request.interceptors.request.use(function(config){
        config.headers.Authorization=`Token ${store.state.user&&store.state.user.token}`
        return config
    },function(err){
        return Promise.reject(err)
    })
}

// request.interceptors.request.use(function(config){
//     return config
// },function(err){
//     return Promise.reject(err)
// })
// export default request