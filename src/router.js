export const router = [
    {
        path:"/web",
        component:"a"
    },
    {
        path:"/web",
        component:"a"
    },
    {
        path:"/web",
        component:"a"
    }
]
export const init = (callback) => {
    console.log('hi')
    window.addEventListener("popstate",(evt)=>{
        console.log(evt, 'pop?',callback)
        callback()
    })
}

export const routeEvent = (url) => {
    history.pushState(null, null, url)
    window.dispatchEvent(new Event("popstate"))
}

// export default router;