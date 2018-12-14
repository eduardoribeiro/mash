import { 
  CHANGE_PRINCIPAL,
  UPDATE_LOAN_TERMS,
  UPDATE_PAYMENTS,
  CLOSE_PAYMENTS,
  OPEN_PAYMENTS
} from "../constants/action-types";

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
    installment = Math.abs(installment).toFixed(2);
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
};

export const demonstrateInterest = (amount, months, installment) => dispatch => {
  const openElement = 'months_'+months;
  let interest;
  let rate;
  let demonstration = [];
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

  let payments = [{
    [openElement]: demonstration
  }];

  dispatch({
    type: UPDATE_PAYMENTS,
    payments,
    openElement,
    showPayments: true
  });
}

export const openDemonstration = () => dispatch => {
  dispatch({
    type: OPEN_PAYMENTS,
    showPayments: true
  });
}

export const closeDemonstration = () => dispatch => {
  dispatch({
    type: CLOSE_PAYMENTS,
    showPayments: false
  });
};
