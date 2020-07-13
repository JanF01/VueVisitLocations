import AuthService from "../services/auth.service";



const user = localStorage.getItem("user");
const InitialState = user ? {
    status: {
        loggedIn: true,
    },
    user,
} : {
    status: {
        loggedIn: false,
    },
    user: null,
};

export const auth = {
    namespaced: true,
    state: InitialState,
    actions: {
        login({
            commit
        }, user) {
            AuthService.login(user).then(
                (user) => {
                    if (user != undefined) {
                        commit("loginSuccess", user);
                        return Promise.resolve(user);
                    } else {
                        commit("loginFailure");
                    }
                },
                (error) => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );

        },
        logout({
            commit
        }) {
            commit("logout");
            AuthService.logout();
        },
        register({
            commit
        }, user) {
            AuthService.register(user).then(
                (user) => {
                    commit("registerSuccess");
                    return Promise.resolve(user);
                },
                (error) => {
                    commit("registerFailure");
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
    },
};