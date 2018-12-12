import React from "react";
import { connect } from "react-redux";
import './loanTerms.scss';
import iconDown from '../../assets/chevron-sign-down.svg';
import iconUp from '../../assets/up-chevron-button.svg';

const LoanTermsList = ({ loanterms }) => (
  <ul className="list-group list-group-flush">
    {loanterms.map(
      loanterm => {
        let value = loanterm.installment.toString();
          console.log(loanterm.installment);
          value = value.split('.');
        let name = loanterm.name.split(' ');
        let valueHTML = parseFloat(loanterm.installment) > 5 ? <div className="value">
                <span className="money">€ {value[0]},</span><sup className="cents">{value[1]}</sup>
              </div> : <div className="value"> -- </div>;
        return(
          <li className={'list-group-item ' + (parseFloat(loanterm.installment) <= 5 ? 'hidden' : '')} key={name}>
            <h4 className={`${name[1].toLowerCase()}-${name[0]}`}>{`${name[0]} ${name[1]}`}</h4>
            {valueHTML}
            <button class="btn">
              <img src={iconDown} alt="See more" />
            </button>
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