import {routeEvent} from "../../../router.js";
import api from "../../../utils/api/api.js";
import CustomHook from "../../../utils/hook/CustomHook.js"
function handleProductClick(productId){
    routeEvent(`/products/${productId}`)
}

const ProductList = (_target) => {
    const container = document.createElement('div')
    container.className = 'ProductListPage'

    const [products, setState] = CustomHook.useState([],ProductList, _target)
    const [counter, setCounter] = CustomHook.useState(0,ProductList, _target)


    console.log(products, setState,"counter:", counter)

    const fetchProducts = async ()=> {
        const r = await api().getProducts()
        setState(r)
        setCounter(counter+1)

    }
    CustomHook.useEffect(()=>{fetchProducts()},[])



    window.customEvent = {
        handleProductClick
    }

    const renderProducts = () => {
        console.log('render~', products)
        return `
        <ul>
<!--        <ul onclick="clicks()">-->
            ${products.map(product=>{
                    return `<li class="Product" id="${product.id}" data-product-id="${product.id}" onclick="window.customEvent.handleProductClick(${product.id})">
                                            <img src="${product.imageUrl}">
                                            <div class="Product__info">
                                                <div>${product.name}</div>
                                                <div>${product.price.toLocaleString()}원~</div>
                                            </div>
                                        </li>`
                }).join('')}
        </ul>`
    }

    const render = () => {
        container.innerHTML =
            `
            <h1>상품 목록 페이지</h1>
            ${products.length ? renderProducts() : `<div>로딩중</div>`}
        `
        _target.appendChild(container)
        console.log(_target)
    }


    render()

}

export default ProductList