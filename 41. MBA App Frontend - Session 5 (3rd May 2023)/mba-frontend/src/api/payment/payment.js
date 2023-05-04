import { AxiosInstance } from "../../util/AxiosInstance";

export const makePayment = async (payment) => {
    const URL = '/mba/api/payments'

    try {
        const response = await AxiosInstance.post(URL, payment, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}