const SelectedOptions = ($target, {selectedOptions, product, handleInputValue, handleOrderClick}) => {
    const container = document.createElement("div")

    const getTotalPrice = () => {
        const {productOptions} = product
        return selectedOptions.reduce((acc,cur)=> acc+cur.quantity* (product.price+cur.price),0)
    }

    const render = () => {
        console.log('render~ SelectedOptions', selectedOptions, product)
        const {productOptions} = product
        container.innerHTML = `
            <h3>선택된 상품</h3>
            <ul>
                ${selectedOptions.map((prod) => {
                    const option = productOptions.find((op)=>op.id === prod.optionId)
                    return `<li>${option.name} ${(product.price+option.price).toLocaleString()}원 <div><input type="number" value="${parseInt(prod.quantity)}"  max="${option.stock}" data-price="${product.price+option.price}" data-option-id="${option.id}"/>개</div></li>`
                }).join('')}
            </ul>
            <div class="ProductDetail__totalPrice">${getTotalPrice().toLocaleString()}원</div>
            <button class="OrderButton" onclick="${handleOrderClick}">주문하기</button>
        `
        console.log(container)
        $target.appendChild(container)
        container.addEventListener('keyup',handleInputValue)
        container.getElementsByClassName("OrderButton").item(0).addEventListener('click',handleOrderClick)


    }

    render()

}

export default SelectedOptions