import React from "react";
import { connect } from "react-redux";

const DemonstrationList = ({ payments}) => (
  <ul className="list-group list-group-flush">
    <li className="list-group-item">
      <div className="month">Month</div>
      <div className="capital">Capital</div>
      <div className="interest">Interest</div>
      <div className="installment">Installment</div>
    </li>
    {payments.map(
      payment => {
        return(
          <li className={'list-group-item '} key={payment.month}>
            <div className="month">{payment.month}</div>
            <div className="capital">{payment.amount}</div>
            <div className="interest">{payment.interest}</div>
            <div className="installment">{payment.installment}</div>
            <h4 className={`${name[1].toLowerCase()}-${name[0]}`}>{`${name[0]} ${name[1]}`}</h4>
            {valueHTML}
          </li>
        );
      }
    )}
  </ul>
);
const mapStateToProps = state => {
  return { payments: state.payments };
};
const Demonstration = connect(mapStateToProps)(DemonstrationList);
export default Demonstration;