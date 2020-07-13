export default function authHeader() {
    let user = localStorage.getItem('user');


    if (user) {
        return {
            'x-access-token': user.substring(10, user.length - 2)
        }
    } else {
        return {};
    }

}