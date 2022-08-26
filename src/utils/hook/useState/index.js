let _state = [];
let _idx = 0;
export const useState = (initialState, component, $target, $param) => {

    const currentIdx = _idx;
    const currentState = _state[_idx++] || initialState;
    let currentComponent = component;

    const setState = (state) => {
        // console.log(state, currentIdx)
        _state[currentIdx] = state
        $target.innerHTML = ''
        _idx = 0
        if($param) {
            console.log($param, 'param')
            currentComponent($target, $param)
        }
        else currentComponent($target)
        console.log(currentState, _state)

    }
    // _idx+=1
    console.log('useState call,',currentState, currentIdx)
    return [
        currentState,
        setState
    ]
}
