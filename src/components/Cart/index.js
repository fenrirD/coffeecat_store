import LocalStorage from "../../utils/storage/LocalStorage/index.js";
import CustomHook from "../../utils/hook/CustomHook.js";
import api from "../../utils/api/api.js";
import {routeEvent} from "../../router.js";

export const Cart = ($target) => {
    const container = document.createElement('div')
    container.className='CartPage'

    const [products, setProducts] = CustomHook.useState([],Cart, $target)

    const makeObj = (cartProduct, products) => {
        const {productId, optionId, quantity} = cartProduct
        const {productOptions, imageUrl, price, name} = products.find((p)=>p.id===productId)
        const {name:optionName, price:optionPrice} = productOptions.find((op)=> op.id === optionId)

        return {
            ...cartProduct,
            imageUrl,
            price: (price+optionPrice),
            name: `${name} ${optionName}`,
            quantity
        }
    }

    const totalCost = () => products.reduce((acc,{price, quantity})=> acc+=(price*quantity) ,0)


    // api 호출하기 위함.
    const call = () => {
        const products = LocalStorage.getProductsCart();
        const productsPromise = products.map((p)=>api().getProduct(p.productId))
        Promise.all(productsPromise).then((v)=> {
            const a = products.map((p)=>makeObj(p,v))
            setProducts(a)
        })
    }
    const handleOrderClick = () => {
        LocalStorage.resetProductsCart().then((r)=>{
            if(r){
                alert("주문이 완료 되었습니다.")
                routeEvent('/')
            }
        })
    }

    CustomHook.useEffect(()=>{call()},[])
    const render = () => {
        container.innerHTML =
            `
            <div class="CartPage">
                <h1>장바구니</h1>
                <div class="Cart">
                    <ul>
                    ${products.map((product)=>
                        `<li class="Cart__item">
                            <img src="${product.imageUrl}">
                            <div class="Cart__itemDesription">
                            <div>${product.name} ${product.price.toLocaleString()}원 ${product.quantity}개</div>
                                <div>${(product.price * product.quantity).toLocaleString()}원</div>
                            </div>
                        </li>
                        `                                   
                    ).join('')}
                    </ul>
                    <div class="Cart__totalPrice">
                        총 상품가격 ${totalCost().toLocaleString()}원
                    </div>
                    <button class="OrderButton" >주문하기</button>
                </div>
            </div>
            `
        $target.appendChild(container)
        document.querySelector(".OrderButton").addEventListener('click', handleOrderClick)
    }

    render()
}