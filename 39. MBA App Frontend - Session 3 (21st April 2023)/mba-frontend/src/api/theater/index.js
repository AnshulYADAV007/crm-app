import { AxiosInstance } from "../../util/AxiosInstance";


export const getAllTheaters = async () => {
    const URL = "/mba/api/theatres"

    try {
        const result = await AxiosInstance.get(URL, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}