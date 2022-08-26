const CustomHook = (() => {
    let _states = [];
    let _idx = 0;

    let _statesOfComponent = new Map()
    let _idxOfComponent = new Map()

    // render 에서 초기화 시켜주면?
    // 의미가 없다 실제로 랜더링 될때 마다 idx 값을 초기화 해줘야 한다.
    // 현 구조 상으로는 컴포넌트 내부에서 초기화를 해줘야 할듯..
    const _render = (currentComponent, $target, $param) => {
        _idxOfComponent.set(currentComponent.name, 0)
        $target.innerHTML = ''
        if ($param) {
            console.log($param, 'param')
            currentComponent($target, $param)
        } else currentComponent($target)
    }

    // custom sueState로 초기값, 컴포넌트, 타겟, 파람을 받음
    // 내가 직면한 문제 2번째, 자식 컴포넌트의 상태초기화
    const useState = (initialState, component, $target, $param) => {

        let currentComponent = component;
        if(!_idxOfComponent.has(component.name)) _idxOfComponent.set(currentComponent.name,0 )
        if(!_statesOfComponent.has(component.name)) _statesOfComponent.set(currentComponent.name,[])

        const currentIdx = _idxOfComponent.get(currentComponent.name)
        // const currentStates = [..._statesOfComponent.get(currentComponent.name)].filter((s)=>s)
        const currentStates = _statesOfComponent.get(currentComponent.name)


        const setState = (state) => {
            // console.log(state, currentIdx)
            // _states[currentIdx] = state
            currentStates[currentIdx] = state
            // console.log(currentStates,_states, 'setState')
            // _statesOfComponent.set(currentComponent.name, currentStates)
            _render(currentComponent, $target, $param)
            console.log(currentStates, _states)

        }

        _idxOfComponent.set(currentComponent.name, currentIdx+1)
        const _state = currentStates[currentIdx] || initialState;
        // _idx+=1
        console.log('useState call,', currentStates, currentIdx,component, _state)
        return [
            _state,
            setState,
        ]
    }
    // 변화를 줘야함
    const useEffect = (callback, depArray) => {
        const currentIdx = _idx
        const oldDepArray = _states[currentIdx]
        // const oldDepArray = _states
        // 한번은 바뀜
        let isChange = true

        if(oldDepArray) {
            isChange = depArray.some((dep,i)=> !Object.is(dep, oldDepArray[i]))
            console.log(isChange, 'useEffect', oldDepArray, depArray)
        }

        if(isChange) {
            console.log('no!')
            callback()
        }
        _states[currentIdx] = depArray
        // _states = depArray

    }
    const init = () => {
        console.log('init!')
        _states = []
        _idx = 0
    }
    // 근본적인 해결 방법은 아닌듯..

    const idxInit = (currentComponent) => {
        _idxOfComponent.set(currentComponent.name, 0)
        _statesOfComponent.delete(currentComponent.name)
    }


    return {
        useEffect,
        useState,
        init,
        idxInit
    }

})()
export default CustomHook