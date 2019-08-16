import axios from "axios";

export default {
    install(Vue, options) {
        Vue.prototype.$http = axios.create({
            baseURL: "http://localhost:5000/",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

