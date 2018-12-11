import React from "react";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { loan: state.loan };
};
const ConnectedList = ({ loan }) => (
  <ul className="list-group list-group-flush">
    {loan.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;