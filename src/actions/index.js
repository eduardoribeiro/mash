import { CHANGE_PRINCIPAL, UPDATE_LOAN_TERMS, UPDATE_PAYMENTS } from "../constants/action-types";

export const changePrincipal = principal => (dispatch, getState) => {
    const currentPrincipal = getState().principal;
    if(principal !== currentPrincipal){
      dispatch({
        type: CHANGE_PRINCIPAL,
        payload: principal
      });

      dispatch(calculateInterest(principal));
    }
};
/* 
export const updateLoanTerms = loanterms => (); */

function calculateMonthlyRate(p, i, m) {
  let months = Number(m*12);
  const interestRate = Number(p * i);
  const exponent = Number(1+i);
    /* if (m < 12) {
      return (interestRate * (Math.pow(exponent, months)) / ((Math.pow(exponent, months) - 1)));
    } */
    return (interestRate * (Math.pow(exponent, months)) / ((Math.pow(exponent, months) - 1)));
    //return ((p * i) * (Math.pow(1 + i, months))) / (Math.pow(1 + i, (m / 12)) - 1);
};
  
export const calculateInterest = value => dispatch => {
    const P = Number(value); // principle / initial amount borrowed
    const I = ((6 * 360) / 365) / 100 / 12; // monthly interest rate 6%
    const months = [6, 12, 24];
    let payload = [];
    for (let i = 0; i < months.length; i++) {
        let name = months[i]+' Months';
        let value = calculateMonthlyRate(P, I, months[i]).toFixed(2);
        payload.push({
            name,
            value
        });
    }

    dispatch({
      type: UPDATE_LOAN_TERMS,
      loanterms: payload
    });

    dispatch(demonstrateInterest(P));
}
  export const demonstrateInterest = value => dispatch => {
    const P = Number(value); // principle / initial amount borrowed
    const I = ((6 * 360) / 365) / 100 / 12; // monthly interest rate 6%
    const monthlyPayment = I === 0 ? P / 2 / 12 : ((P * I) / (1 - Math.pow(1 / (1 + I), 2 * 12)));
    const monthlyOverpayment = 0;
    const overpayments = [];
    let balance = P;
    let baseline = P;
    let payments = [{ overpayment: 0, balance, baseline }];
    let partial = [];
  
  
    for (let year = 1; year < 2; year++) {
      let interestYearly = 0;
      let overpaymentYearly = 0;
      for (let month = 1; month <= 12; month++) {
        const overpayment = overpayments.filter((x) => (+x.year === year && +x.month === month))
          .reduce((acc, val) => acc + (+val.amount), 0);
        const interestMonth = balance * I;
        interestYearly += interestMonth;
        overpaymentYearly += overpayment;
        balance -= monthlyPayment + +monthlyOverpayment + overpayment - interestMonth;
        baseline -= monthlyPayment - (baseline * I);
  
        if (balance <= 0) {
          balance = 0;
          if (partial === undefined && month !== 12) {
            partial = month;
          }
        }
        partial.push({
          month: month,
          value: monthlyPayment,
          interest:interestMonth,
          balance,
          baseline
        })
      }
  
      payments.push({
        baseline, interestYearly, balance, partial, overpayment: overpaymentYearly + (+monthlyOverpayment * (partial || 12))
      });
      if (partial) partial = 0;
    }
    dispatch({
      type: UPDATE_PAYMENTS,
      monthlyPayment: monthlyPayment.toFixed(2), 
      payments 
    });
  }  