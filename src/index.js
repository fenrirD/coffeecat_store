import VanillaDom from "./components/VanillaDom/index.js"
import App from "./App.js";

alert(1)
console.log(VanillaDom())
const root = VanillaDom().createRoot(document.querySelector('.App'))

root.render(App)



