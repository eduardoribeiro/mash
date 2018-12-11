import { ADD_ARTICLE, CHANGE_PRINCIPAL, UPDATE_LOAN_TERMS } from "../constants/action-types";

const initialState = {
    principal: 100,
    loanterms: []
  };
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
   /*  case ADD_ARTICLE:
        return { ...state, loanterms: [...state.articles, action.payload]}; */
    case CHANGE_PRINCIPAL:
      return Object.assign({}, ...state, {
            ...state,
            principal: action.payload
        });
    case UPDATE_LOAN_TERMS:
        return Object.assign({}, ...state, {
          ...state,
          loanterms: [...state.loanterms, action.payload]
      });
    default:
        return state;
  }
};

export default rootReducer;