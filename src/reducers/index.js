import { 
  CHANGE_PRINCIPAL,
  UPDATE_LOAN_TERMS,
  UPDATE_PAYMENTS,
  CLOSE_PAYMENTS,
  OPEN_PAYMENTS
} from "../constants/action-types";

const initialState = {
    principal: 1000,
    showPayments: false,
    openElement: '',
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
        openElement: '',
        showPayments: false,
        principal: action.payload
      };
    case UPDATE_LOAN_TERMS:
        return {
          ...state,
          openElement: state.openElement !== '' ? state.openElement : '',
          showPayments: state.showPayments !== false ? state.showPayments : false,
          loanterms: [...action.loanterms]
        };
    case UPDATE_PAYMENTS:
        return {
          ...state,
          openElement: action.openElement,
          showPayments: action.showPayments,
          payments: [...action.payments]
        };
    case OPEN_PAYMENTS:
        return {
          ...state,
          showPayments: action.showPayments
        };
    case CLOSE_PAYMENTS:
        return {
          ...state,
          showPayments: action.showPayments
        };
    default:
        return state;
  }
};

export default rootReducer;