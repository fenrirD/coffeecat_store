import {products, productDetail} from '../data/index.js'

const getProductsTime = () => {
    return new Promise(resolve =>
    setTimeout(()=> resolve(products),2000))
}

const getProductTime = (productId) => {
    console.log('getProduct', productId, productId-1)
    return new Promise(resolve =>
        setTimeout(()=> resolve(productDetail[parseInt(productId)-1]),2000))
}

const api = () => {

    const getProducts = async () => {

        console.log(products)
        const response = await getProductsTime()
        console.log(response)
        // const response = await fetch('https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products',{
        //     mode: "cors"
        // })
        // console.log('response',response)
        // const data = await response.json()
        // console.log('data',data)
        return response
    }

    const getProduct = async (productId) => {


        const response = await getProductTime(productId)
        console.log(response)
        // const response = await fetch('https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products',{
        //     mode: "cors"
        // })
        // console.log('response',response)
        // const data = await response.json()
        // console.log('data',data)
        return response
    }

    return {
        getProducts,
        getProduct

    }
}

export default api