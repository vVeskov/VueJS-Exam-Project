const login = user => {
    localStorage.setItem('username', user.username);
    localStorage.setItem('authToken', user.authToken);
}

export const authService = {
    computed:{
        isAuthenticated(){
            return  localStorage.getItem('authtoken') !== null
        },
        isAdmin(){
            let userIsAdmin = localStorage.getItem('username');
            if (userIsAdmin == "Admin") {
                return true;
            }
            return false;
        }
    }
}

export const registerUser = {
    methods: {
        register(name, password, email) {
            return this.$http.post(
                "/auth/register", {
                    name,
                    password,
                    email
                })
                .then(res => console.log(res));
        }
    }
}

export const loginUser = {
    methods: {
        login(email, password) {
            return this.$http.post(
                "auth/login", {
                    email,
                    password
                }
            ).then(res => {
                localStorage.setItem('username', res.data.user.name)
                localStorage.setItem('authtoken', res.data.token)
                console.log(res);
            })
        }
    }
}