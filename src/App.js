import {ProductDetail, ProductList} from './components/Product/index.js'
import {Cart} from "./components/Cart/index.js";
import {init} from "./router.js";
import CustomHook from "./utils/hook/CustomHook.js";

function App($target) {

    const router = () => {
        const { pathname } = location
        $target.innerHTML = ''
        if(pathname === '/') {
            CustomHook.idxInit(ProductList)
            ProductList($target)

        } else if(pathname.indexOf("/products")===0) {
            console.log(pathname)
            const [,,productId] = pathname.split('/')
            CustomHook.idxInit(ProductDetail)
            ProductDetail($target, {productId})

        } else if(pathname === '/cart') {
            CustomHook.idxInit(Cart)
            Cart($target)
        }

    }

    init(router)
    router()
}

export default App