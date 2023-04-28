import { AxiosInstance } from '../../util/AxiosInstance'

export const signIn = async (user) => {
    const URL = '/mba/api/auth/signin'

    try {
        const response = await AxiosInstance.post(URL, user);

        const { name, userId, email, userType, userStatus, accessToken } = response.data;
        localStorage.setItem("name", name)
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("userType", userType);
        localStorage.setItem("userStatus", userStatus);
        localStorage.setItem("token", accessToken);

        console.log(localStorage['userType'])
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const signUp = async (user) => {

    const URL = "/mba/api/auth/signup";

    try {
        console.log(user)
        const response = await AxiosInstance.post(URL, user);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const signOut = () => {

    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
}
