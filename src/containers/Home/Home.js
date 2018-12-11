import React, { Component } from "react";
import { connect } from "react-redux";
import { changePrincipal } from "../../actions/index";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
/* import 'home.scss'; */

class Homepage extends Component{

    render(){
        const { principal, changePrincipal } = this.props;
        const values = {
          min: 100,
          max: 2000,
          step: 100
        };
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
                            <h2 className="amout">{`€ ${principal}`}</h2>
                            <h3 className="inner-title">Amount required</h3>
                            <Slider
                                min={values.min}
                                max={values.max}
                                step={values.step}
                                value={principal}
                                onChange={changePrincipal}
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

const mapStateToProps = state => {
    return {
        principal: state.principal
    }
}


const mapDispatchToProps = dispatch => {
    return {
        changePrincipal: (value) => {
            dispatch(changePrincipal(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
