const commentReducer = (state=[], action)=> {
    switch(action.type) {
        case 'ADD_COMMENT':
            return state.concat([action.data]);
        case 'EDIT_COMMENT':
            return state.map((item) => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        name: action.data.name,
                        detail: action.data.detail
                    }
                }
                else return item;
            });
        case 'DELETE_COMMENT':
            return state.filter((item)=> item.id !== action.id);
        default:
        return state;
    }
}
export default commentReducer;