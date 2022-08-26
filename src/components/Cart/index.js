import LocalStorage from "../../utils/storage/LocalStorage/index.js";
import CustomHook from "../../utils/hook/CustomHook.js";
import api from "../../utils/api/api.js";

export const Cart = ($target) => {
    const container = document.createElement('div')
    container.className='CartPage'


    const [product, setProduct] = CustomHook.useState([],Cart, $target)
    // api 호출하기 위함.
    const call = () => {
        const product = LocalStorage.getProductsCart();
        const productsPromise = product.map((p)=>api().getProduct(p.productId))
        console.log(productsPromise,"??")
        Promise.all(productsPromise).then((v)=> {

            console.log(v,"이건뭐여..", product)
            // 이곳에서 대충 찾아보자 ㅋㅋ
            // product.map((p)=>({...p, v[p.productId].}))
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
                        <li class="Cart__item">
                            <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png">
                            <div class="Cart__itemDesription">
                                <div>커피잔 100개 번들 10,000원 10개</div>
                                <div>100,000원</div>
                            </div>
                        </li>
                        <li class="Cart__item">
                            <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png">
                            <div class="Cart__itemDesription">
                                <div>커피잔 1000개 번들 15,000원 5개</div>
                                <div>75,000원</div>
                            </div>
                        </li>
                    </ul>
                    <div class="Cart__totalPrice">
                        총 상품가격 175,000원
                    </div>
                    <button class="OrderButton">주문하기</button>
                </div>
            </div>
            `
        $target.appendChild(container)
    }

    render()
    // LocalStorage.call()

    /*
    * <div class="CartPage">
        <h1>장바구니</h1>
        <div class="Cart">
            <ul>
                <li class="Cart__item">
                    <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png">
                    <div class="Cart__itemDesription">
                        <div>커피잔 100개 번들 10,000원 10개</div>
                        <div>100,000원</div>
                    </div>
                </li>
                <li class="Cart__item">
                    <img src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png">
                    <div class="Cart__itemDesription">
                        <div>커피잔 1000개 번들 15,000원 5개</div>
                        <div>75,000원</div>
                    </div>
                </li>
            </ul>
            <div class="Cart__totalPrice">
                총 상품가격 175,000원
            </div>
            <button class="OrderButton">주문하기</button>
        </div>
    </div>-->
    *
    * */
    return `<div>장바구니!</div>`
}