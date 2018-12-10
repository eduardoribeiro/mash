import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../../actions/index";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class Homepage extends Component{
    constructor() {
        super();
        /* this.state = {
            principal: 100
        }; */
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        dispatch(changePrincipal(value));
       /*  this.props.changePrincipal({ principal });
        this.setState({ principal: value }); */
    }

    render(state, actions){
        const { principal } = this.props;
        const values = {
          min: 100,
          max: 2000,
          step: 100
        };
        const horizontalLabels = {
          100: '100€',
          1000: '1000€',
          2000: '2000€'
        };
    
        const formatMoney = (value) => `${value} €`;
        return (
            <article>
                <div className="home-page">
                    <section className="centered">
                        <h2>Need a loan?</h2>
                        <p>Simple estimate your loan interests and total amount due</p>
                    </section>
                    <section className="calculator">
                        <div className="calculator-interface">
                        <h2>Simulate your loan</h2>
                        <div className="loan-amount">
                            <h2 className="amout">{`€ ${state.principal}`}</h2>
                            <h3 className="inner-title">Amount required</h3>
                            <Slider
                                min={values.min}
                                max={values.max}
                                step={values.step}
                                value={state.principal}
                                format={`€ ${state.principal}`}
                                labels={horizontalLabels}
                                onChange={actions.changePrincipal()}
                            />
                        </div>
                        <div className="loan-term">
                            <h3 className="inner-title">The following terms are available</h3>
                            {/* <LoanTerms amount={principal} /> */}
                        </div>
                        </div>
                    </section>
                </div>
            </article>   
        );
    }
};
const mapStateToProps = (state) => {
    return {
        state: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changePrincipal: principal => dispatch(changePrincipal(principal))
    };
};

export default connect(null, mapStateToProps, mapDispatchToProps)(Homepage);
