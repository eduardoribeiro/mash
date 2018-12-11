import React from "react";
import { connect } from "react-redux";

const DemonstrationList = ({ payments }) => (
  <ul className="list-group list-group-flush">
    {/* {loanterms.map(
      loanterm => {
        let value = loanterm.value.split('.');
        let name = loanterm.name.split(' ');
        let valueHTML = loanterm.value > 5 ? <div className="value">
                <span className="money">€ {value[0]},</span><sup className="cents">{value[1]}</sup>
              </div> : <div className="value"> -- </div>;
        return(
          <li className={'list-group-item ' + (loanterm.value <= 5 ? 'disabled' : '')} key={name}>
            <h4 className={`${name[1].toLowerCase()}-${name[0]}`}>{`${name[0]} ${name[1]}`}</h4>
            {valueHTML}
          </li>
        );
      }
    )} */}
  </ul>
);
const mapStateToProps = state => {
  return { payments: state.payments };
};
const Demonstration = connect(mapStateToProps)(DemonstrationList);
export default Demonstration;