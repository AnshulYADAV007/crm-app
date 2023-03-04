export const initialState = {
    term: 'gmail'
}

export const actionTypes = {
    SET_SEARCH_TERM: "SET_SEARCH_TERM"
}

const reducer = (state, action) => {
    return { term: "hello" }
}

export default reducer