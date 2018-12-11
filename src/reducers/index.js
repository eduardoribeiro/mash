import { ADD_ARTICLE, CHANGE_PRINCIPAL, UPDATE_LOAN_TERMS, UPDATE_PAYMENTS } from "../constants/action-types";

const initialState = {
    principal: 1000,
    loanterms: [],
    payments: []
  };
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
   /*  case ADD_ARTICLE:
        return { ...state, loanterms: [...state.articles, action.payload]}; */
    case CHANGE_PRINCIPAL:
      return {
        ...state,
        principal: action.payload
      };
    case UPDATE_LOAN_TERMS:
        return {
          ...state,
          loanterms: [...action.loanterms]
        };
    case UPDATE_PAYMENTS:
        return {
          ...state,
          payments: [...action.payments]
        };
    default:
        return state;
  }
};

export default rootReducer;