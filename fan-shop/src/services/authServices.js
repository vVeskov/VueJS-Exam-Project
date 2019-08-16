const login = user => {
    localStorage.setItem('username', user.username);
    localStorage.setItem('authtoken', user.authtoken);
    return user;
}

export const authService = {
    data(){
        return{
            authToken: localStorage.getItem('authtoken'),
            username: localStorage.getItem('username')
        }
    },
    computed: {
        isAuthenticated() {
            let a = this.authToken !== null;
            return a;
        },
        isAdmin() {
            // let userIsAdmin = localStorage.getItem('username');
            let userIsAdmin = this.username;
            if (userIsAdmin == "Admin") {
                return true;
            }
            return false;
        },
    },
    created() {
        this.$root.$on('logged-in', authtoken => this.authToken = authtoken );
        this.$root.$on('isAdmin', username => this.username = username );

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
            ).then(({data}) => login({
                // localStorage.setItem('username', data.user.name)
                // localStorage.setItem('authtoken', data.token)
                
                username: data.user.name,
                authtoken: data.token
            }))
        }
    }
}