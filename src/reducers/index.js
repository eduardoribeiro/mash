import { ADD_ARTICLE, CHANGE_PRINCIPAL } from "../constants/action-types";

const initialState = {
    principal: 100,
    loanterms: []
  };
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
        return { ...state, loanterms: [...state.articles, action.payload]};
    case CHANGE_PRINCIPAL:
      return Object.assign({}, ...state, {
            ...state,
            principal: action.payload
        });
    default:
        return state;
  }
};

export default rootReducer;