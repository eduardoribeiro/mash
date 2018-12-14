import React from "react";
import { connect } from "react-redux";
import './demonstration.scss';

const DemonstrationList = ({ payments, month }) => {
  const result = payments.find(x => x[month]);

  if (result) {
    const paymentPlan = result[month];
  
  return (
    <ul className="list-group list-group-flush demonstration-layer">
      <li className="list-group-item">
        <div className="payment-column header month">Month</div>
        <div className="payment-column header capital">Capital</div>
        <div className="payment-column header interest">Interest</div>
        <div className="payment-column header installment">Installment</div>
      </li>
      {paymentPlan.map(
        payment => {
          return (
            <li className={'list-group-item '} key={`payment-${payment.month}-${payment.amount}-${payment.interest}`}>
              <div className="payment-column month">{payment.month}</div>
              <div className="payment-column capital">{`€ ${typeof payment.amount === 'string' || payment.amount instanceof String ? Number(payment.amount).toFixed(2) : payment.amount.toFixed(2) }`}</div>
              <div className="payment-column interest">{`${typeof payment.interest === 'string' || payment.interest instanceof String ? Number(payment.interest).toFixed(4) : payment.interest.toFixed(2)}%`}</div>
              <div className="payment-column installment">{`€ ${typeof payment.installment === 'string' || payment.installment instanceof String ? Number(payment.installment).toFixed(2) : payment.installment.toFixed(2)}`}</div>
            </li>
        )}
      )}
    </ul>
  )} else {
    return null;
  }
};
const mapStateToProps = state => {
  return { payments: state.payments };
};
const Demonstration = connect(mapStateToProps)(DemonstrationList);
export default Demonstration;