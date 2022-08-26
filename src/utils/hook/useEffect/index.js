// useEffect 에서만 idx 를 사용하면 _idx 를 초기화 해주기가 애매하다.

// let _states = []
let _states;
let _idx = 0
export const useEffect = (callback, depArray) => {
    const currentIdx = _idx
    // const oldDepArray = _states[currentIdx]
    const oldDepArray = _states
    // 한번은 바뀜
    let isChange = true

    if(oldDepArray && !oldDepArray.length ) {
        isChange = depArray.some((dep,i)=> !Object.is(dep, oldDepArray[i]))
        console.log(isChange, 'useEffect', oldDepArray, depArray)
    }

    if(isChange) {
        console.log('no!')
        callback()
    }
    _states = depArray
    // _states = depArray

}
