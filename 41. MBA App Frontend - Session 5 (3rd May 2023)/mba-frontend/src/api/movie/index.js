import { AxiosInstance } from '../../util/AxiosInstance'
export const getAllMovies = async () => {

    const URL = '/mba/api/movies'

    try {
        const response = await AxiosInstance.get(URL)

        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getMovie = async (id) => {

    const URL = `/mba/api/movies/${id}`;

    try {
        const response = await AxiosInstance.get(URL);
        return response;
    } catch (error) {
        console.log(error);
        throw error;

    }

}