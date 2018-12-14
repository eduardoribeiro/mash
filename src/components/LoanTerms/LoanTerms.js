import React, { Component } from "react";
import { connect } from "react-redux";
import { demonstrateInterest, openDemonstration, closeDemonstration } from '../../actions/index';
import './loanTerms.scss';
import Demonstration from "../Demosntration/demonstration";

class LoanTerm extends Component {

  displayDemonstration(amount, months, installment) {
    const self = this;
    const { showPayments, openElement } = this.props;
    if(!showPayments && openElement !== 'months_'+months || showPayments && openElement !== 'months_'+months ){
      self.props.dispatch(demonstrateInterest(amount, Number(months), installment));
    } else if(!showPayments && openElement === 'months_'+months){ 
      self.props.dispatch(openDemonstration());
    } else {
      self.props.dispatch(closeDemonstration());
    }
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
    const { principal, loanterms, payments, showPayments, openElement } = this.props;
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
                <div className="loanterm-item">
                  <h4 className={`${name[1].toLowerCase()}-${name[0]}`}>{`${name[0]} ${name[1]}`}</h4>
                  {valueHTML}
                  <button className="btn load-loan" onClick={() => { this.displayDemonstration(principal, name[0], loanterm.installment) }}>
                    {showPayments && openElement === object ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                  </button>
                </div>
                {
                  showPayments && openElement === object
                  ? <div className={'demonstration'} key={openElement}>
                      <Demonstration data={payments} month={object} />
                    </div>
                  : null
                }
              </li>
            );
        })}
      </ul>
    );
  }
};

const mapStateToProps = state => {
  return { 
    principal: state.principal,
    loanterms: state.loanterms,
    showPayments: state.showPayments,
    openElement: state.openElement,
    payments: state.payments
  };
};

export default connect(mapStateToProps)(LoanTerm);