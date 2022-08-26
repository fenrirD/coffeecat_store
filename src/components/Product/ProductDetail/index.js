import api from "../../../utils/api/api.js";
import SelectedOptions from "./SelectedOptions/index.js";
import CustomHook from "../../../utils/hook/CustomHook.js";
import customHook from "../../../utils/hook/CustomHook.js";
import LocalStorage from "../../../utils/storage/LocalStorage/index.js";


const ProductDetail = ($target, {productId}) => {

    const container = document.createElement('div')
    container.className = 'ProductDetailPage'
    console.log(productId)

    const [product, setProduct] = CustomHook.useState(null, ProductDetail, $target, {productId})
    const [selectedOptions, setSelectedOptions] = customHook.useState([], ProductDetail, $target, {productId})
    // const [selectedProduct, setSelectedProduct] = CustomHook.useState([], ProductDetail,$target, {productId})

    console.log(product)
    // let product = null
    const fetchProducts = async (productId)=> {
        const r = await api().getProduct(productId)
        console.log('fetchProducts',r)
        setProduct(r)
    }

    CustomHook.useEffect(()=>{fetchProducts(productId)},[],ProductDetail)
    CustomHook.useEffect(()=> {
        console.log("나는 option이 변경 될 때마다 실행 되야함", selectedOptions)
    },[selectedOptions],ProductDetail)

    const handleOrderClick = () => {
        console.log('handleOrderClick')
        const newProd = selectedOptions.reduce((acc, {productId, optionId, quantity,})=>[...acc,{
            productId,
            optionId,
            quantity
        }],[])
        LocalStorage.setProductCart(newProd)
    }

    const handleInputValue = (e) => {
        console.log('!!',e.target.value , e.target)
        if(e.target.tagName === 'INPUT') {
            const input = e.target
            input.value = input.value > input.max ? input.max : input.value

            const newSelectedProduct = selectedOptions.map((p)=>p.optionId!=input.dataset.optionId ? p: {
                ...p,
                quantity: input.value
            })
            console.log(newSelectedProduct)
            // setTotalPrice(getTotalPrice())
            setSelectedOptions(newSelectedProduct)
        }
    }
    
    const handleSelectChange = (e) =>{
        console.log('handleSelectChange',e)
        if(e.target.tagName === 'SELECT') {
            const selectValue = e.target.value
            console.log('change', product, selectedOptions)
            const {productOptions} = product
            const option = productOptions.find((op)=>op.id==selectValue)
            if(selectedOptions.findIndex((op)=>op.optionId == option.id) === -1){
                setSelectedOptions([
                    ...selectedOptions,
                    {
                        productId: product.id,
                        optionId: option.id,
                        quantity: 0,
                        price: option.price
                    }
                ])
            }
        }
    }

    container.addEventListener('change', handleSelectChange)

    const renderProductDetail = () => {
        return `
        <div class="ProductDetail">
            <img src="${product.imageUrl}">
            <div class="ProductDetail__info">
                <h2>${product.name}</h2>
                <div class="ProductDetail__price">${product.price.toLocaleString()}원~</div>
                <select>
                    <option>선택하세요.</option>
                    ${product.productOptions.map((option)=>{
                        let el = `<option value="${option.id}" _disabled>stock ${product.name} text</option>`
                        let optionEl 
                        let disabled = ''
                        if(!option.stock) {
                            optionEl = `${option.name}`
                            disabled = "disabled"
                        }else if (option.price) {
                            optionEl = `${option.name} (+${option.price.toLocaleString()}원)`
                        }else {
                            optionEl = `${option.name} `
                        }
                        return el.replace('text', optionEl).replace('_disabled',disabled).replace('stock',!disabled?'':'(품절)')
                    }).join("")}
                </select>
                <div class="ProductDetail__selectedOptions"></div>
            </div>
        </div>
        `
    }
    
    const render = () => {
        console.log('render ~Product Detail~')

        if(product) {
            container.innerHTML = `<h1>${product.name} 상품 정보</h1>`
            container.innerHTML += `${renderProductDetail()}`
            $target.appendChild(container)
            // console.log(document.querySelector(".ProductDetail__selectedOptions"))
            // CustomHook.idxInit(SelectedOptions)
            // 설계를 다시한다. 셀렉트 옵션을 내려줌..

            SelectedOptions(document.querySelector(".ProductDetail__selectedOptions"),{selectedOptions, product, handleInputValue, handleOrderClick})

        } else {
            container.innerHTML = `<h1>세부 상품 정보</h1><div>로딩중...</div>`
            $target.appendChild(container)
        }
        CustomHook.resetEffect(ProductDetail)


    }
    // fetchProducts(productId)
    render()
}

export default ProductDetail