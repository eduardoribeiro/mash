import { CHANGE_PRINCIPAL, UPDATE_LOAN_TERMS, UPDATE_PAYMENTS } from "../constants/action-types";

function calculateMonthlyInterest(rate, nper, pv, fv, type) {
  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate == 0) return -(pv + fv)/nper;
  
  var pvif = Math.pow(1 + rate, nper);
  var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

  if (type == 1) {
    pmt /= (1 + rate);
  };

  return pmt;
}


export const changePrincipal = principal => (dispatch, getState) => {
    const currentPrincipal = getState().principal;
    if(principal !== currentPrincipal){
      dispatch({
        type: CHANGE_PRINCIPAL,
        payload: principal
      });

      dispatch(calculateLoan(principal));
    }
};

export const calculateLoan = amount => dispatch => {
  const periods = [3, 6, 12, 24, 36, 48, 60, 72, 88, 120];
  const rate = 6 * 360 / 365 / 12 / 100; // Retrun the calculated interest
  let installment = 0;
  let payload = [];
  for (let i = 0; i < periods.length; i++) {
    installment = calculateMonthlyInterest(rate, periods[i], amount, null, 0);
    installment = Math.abs(Number(installment.toFixed(2)));
    let name = periods[i]+' Months';
    if(parseFloat(installment) >= parseInt(5)){
      payload.push({
        name,
        installment
      });
    }
  };
  dispatch({
    type: UPDATE_LOAN_TERMS,
    loanterms: payload
  });

  // dispatch(demonstrateInterest(P));
}
  
/* export const calculateInterest = value => dispatch => {
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
}; */

export const demonstrateInterest = (amount, months, installment) => dispatch => {
  let demonstration = [];
  let interest;
  let rate;
  let object = months+' Months';
  for (let mes = 1; mes < months+1; mes++) {

    if(mes !== 1){
      amount = amount - (installment - interest);
    }
    /* rate = 6 * 360 / 365 / 12 / 100; */
    interest = amount * 6 / 365 * 30 / 100;
    
    if(mes === months && amount < installment){
      installment = amount + interest;
      installment = installment.toFixed(2);
    }

    demonstration.push({
      month: mes,
      amount: amount,
      interest: Number(interest.toFixed(4)),
      installment
    });
  }

  let payment = [{
    ['months_'+months]: demonstration
  }];

  dispatch({
    type: UPDATE_PAYMENTS,
    payments: payment
  });
}
  /*   
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
*/