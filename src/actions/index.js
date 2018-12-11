import { ADD_ARTICLE, CHANGE_PRINCIPAL, UPDATE_LOAN_TERMS } from "../constants/action-types";

export const addArticle = article => ({ 
    type: ADD_ARTICLE, 
    payload: article 
});

export const changePrincipal = principal => ({
    type: CHANGE_PRINCIPAL,
    payload: principal
});

export const updateLoanTerms = loanterms => ({
    type: UPDATE_LOAN_TERMS,
    payload: loanterms
});

function calculateMonthlyRate(p, i, m) {
    if (m < 12) {
      return ((p * i) * (Math.pow(1 + i, (m / 12)))) / (Math.pow(1 + i, (m / 12)) - 1);
    }
    return ((p * i) * (Math.pow(1 + i, (m / 12)))) / (Math.pow(1 + i, (m / 12)) - 1);
};
  
export function calculateInterest(value) {
    const P = Number(value); // principle / initial amount borrowed
    const I = ((6 * 360) / 365) / 100 / 12; // monthly interest rate 6%
    const months = [6, 12, 24];
    let payload = [];
    for (let i = 0; i < months.length; i++) {
        let name = months[i]+' Months';
        let value = calculateMonthlyRate(P, I, months[i]);
        payload.push({
            name,
            value
        });
    }

    return payload;
}
  
  export function demonstrateInterest(value) {
    const P = Number(value); // principle / initial amount borrowed
    const I = ((6 * 360) / 365) / 100 / 12; // monthly interest rate 6%
    const monthlyPayment = I === 0 ? P / 2 / 12 : ((P * I) / (1 - Math.pow(1 / (1 + I), 2 * 12)));
    const monthlyOverpayment = 0;
    const overpayments = [];
    let balance = P;
    let baseline = P;
    let payments = [{ overpayment: 0, balance, baseline }];
    let partial;
  
  
    for (let year = 0; year < 2; year++) {
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
      }
  
      payments.push({
        baseline, interestYearly, balance, partial, overpayment: overpaymentYearly + (+monthlyOverpayment * (partial || 12))
      });
      if (partial) partial = 0;
    }
    return { monthlyPayment: monthlyPayment.toFixed(2), payments };
  }  