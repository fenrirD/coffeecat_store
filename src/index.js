import VanillaDom from "./components/VanillaDom/index.js"
import App from "./App.js";


const root = VanillaDom().createRoot(document.querySelector('.App'))

root.render(App)



