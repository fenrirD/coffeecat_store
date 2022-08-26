import {routeEvent} from "../../../router.js";

const LocalStorage = (()=>{
    const storage = window.localStorage


    const setProductCart = (products) => {
        const storeValue = getProductsCart() || []
        const v = storeValue.filter((v)=>
            products.findIndex((p)=>p.optionId === v.optionId && p.productId === v.productId)===-1
        ).concat(products)

        // console.log(storeValue, products)
        storage.setItem("products_cart", JSON.stringify(v))
        routeEvent(`/cart`)
    }

    const getProductsCart = () => {
        return JSON.parse(storage.getItem('products_cart'))
    }
    const call = () => {

    }
    return {
        call,
        setProductCart,
        getProductsCart
    }
})()
 export default LocalStorage
