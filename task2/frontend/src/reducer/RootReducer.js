import { LoadState, saveState } from './LocalStoreage'
if (!LoadState()) {
    var istate = {
        user: {},
        login: false,
        token: '',
        items:[]
    }
}
else {
    istate = LoadState();
}
const initState = istate;

const RootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DO_LOGIN': saveState({ ...state, user: action.user, login: true, token: action.token });
            return { ...state, user: action.user, login: true, token: action.token };
        case 'LOGOUT':
            saveState({ ...state, user: '', login: false, token: '' });
            return { ...state, user: '', login: false, token: '' };
        case 'ADD_CART':
            saveState({ ...state, items: action.items });
            return { ...state,items: action.items };
            default : return state;
    }
}

export default RootReducer;