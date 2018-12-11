import React from "react";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { loan: state.loan };
};
const ConnectedList = ({ loan }) => (
  <ul className="list-group list-group-flush">
    {loan.map(loanterm => (
      <li className="list-group-item" key={loanterm.name}>
        <h4>{loanterm.name}</h4>
        {loanterm.value}
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;