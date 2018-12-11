import React from "react";
import { connect } from "react-redux";
import './loanTerms.scss';

const LoanTermsList = ({ loanterms }) => (
  <ul className="list-group list-group-flush">
    {loanterms.map(
      loanterm => {
        let value = loanterm.value.split('.');
        let name = loanterm.name;
        return(
          <li className="list-group-item" key={name}>
            <h4>{name}</h4>
            <span className="money">€ {value[0]},</span><sup className="cents">{value[1]}</sup>
          </li>
        );
      }
    )}
  </ul>
);
const mapStateToProps = state => {
  return { loanterms: state.loanterms };
};
const Loanterm = connect(mapStateToProps)(LoanTermsList);
export default Loanterm;