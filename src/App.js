import {ProductList, ProductDetail} from './components/Product/index.js'
import {Cart} from "./components/Cart/index.js";
import {routeEvent, init} from "./router.js";
import CustomHook from "./utils/hook/CustomHook.js";

function App($target) {

    const router = () => {
        const { pathname } = location
        let component
        console.log('router!!')
        CustomHook.init()
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
        // _target.appendChild(component)
        // window.target.innerHTML = component
        // console.log('render', component)
        // return component
    }

    init(router)

    // console.log(this, VanillaDom())
    router()
}

export default App