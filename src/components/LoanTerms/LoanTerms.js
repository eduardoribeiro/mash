import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_PAYMENTS } from '../../constants/action-types';
import { demonstrateInterest } from '../../actions/index';
import './loanTerms.scss';
import Demonstration from "../Demosntration/demonstration";

class LoanTerm extends Component {

  displayDemonstration(amount, months, installment) {
    console.log('Clicked the '+months+' months button');
    const self = this;
    self.props.dispatch(demonstrateInterest(amount, Number(months), installment));
  }

  DemonstrationLayer(month) {
    if(state.payments && payments.find(x => x[month])[month]){
      return <Demonstration data={payments.find(x => x[month])[month]} />
    }
    return null;
  }

  getPaymentsPerMonth(payments, month) {
    if (payments && payments.length) {
      const result = payments.find(x => x[month]);

      if (result) {
        return result[month];
      }
    }

    return [];
  }

  render(){
    const { principal, loanterms, payments } = this.props;
    return(
      <ul className="list-group list-group-flush">
        {loanterms.map( loanterm => {
          let value = loanterm.installment.toString();
              value = value.split('.');
            let name = loanterm.name.split(' ');
            let object = 'months_'+name[0];
            let valueHTML = parseFloat(loanterm.installment) > 5 ? <div className="value">
                    <span className="money">€ {value[0]},</span><sup className="cents">{value[1]}</sup>
                  </div> : <div className="value"> -- </div>;
            return(
              <li className={'list-group-item ' + (parseFloat(loanterm.installment) <= 5 ? 'hidden' : '')} key={name}>
                <h4 className={`${name[1].toLowerCase()}-${name[0]}`}>{`${name[0]} ${name[1]}`}</h4>
                {valueHTML}
                <button className="btn load-loan" onClick={() => { this.displayDemonstration(principal, name[0], loanterm.installment) }}>
                {/* <button className="btn load-loan"> */}
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className={'demonstration'} key={name}>
                  <Demonstration data={this.getPaymentsPerMonth(payments, object)} />
                </div>
              </li>
            );
        })}
      </ul>
    );
  }
};

/* const LoanTermsList = ({ loanterms }) => (
  <ul className="list-group list-group-flush">
    {loanterms.map(
      loanterm => {
        let value = loanterm.installment.toString();
          value = value.split('.');
        let name = loanterm.name.split(' ');
        let valueHTML = parseFloat(loanterm.installment) > 5 ? <div className="value">
                <span className="money">€ {value[0]},</span><sup className="cents">{value[1]}</sup>
              </div> : <div className="value"> -- </div>;
        return(
          <li className={'list-group-item ' + (parseFloat(loanterm.installment) <= 5 ? 'hidden' : '')} key={name}>
            <h4 className={`${name[1].toLowerCase()}-${name[0]}`}>{`${name[0]} ${name[1]}`}</h4>
            {valueHTML}
            <button className="btn load-loan" onClick={displayDemonstration(name[0], loanterm.installment)}>
              <i className="fas fa-chevron-down"></i>
            </button>
            <div className={'demonstration'} key={name}>
            </div>
          </li>
        );
      }
    )}
  </ul>
); */
const mapStateToProps = state => {
  return { 
    principal: state.principal,
    loanterms: state.loanterms,
    payments: state.payments
  };
};

export default connect(mapStateToProps)(LoanTerm);