

const VanillaDom = () => {
    let target



    const render = (node) => {
        node(target)
    }

    const createRoot = (_target) =>{
        console.log('call createRoot', _target)
        target = _target
        return {render}
    }
    return {
        createRoot
    }

}

export default VanillaDom