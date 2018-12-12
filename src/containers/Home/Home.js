import React, { Component } from "react";
import { connect } from "react-redux";
import { changePrincipal, calculateLoan } from "../../actions/index";
import Slider from 'react-rangeslider';
import Loanterm from '../../components/LoanTerms/LoanTerms';
import Demonstration from '../../components/Demosntration/demonstration';
import 'react-rangeslider/lib/index.css';
import './home.scss';

class Homepage extends Component {
    componentWillMount() {
        this.props.dispatch(calculateLoan(this.props.principal))
    }

    onChangePrincipal() {
        const self = this;
        // let principal = event.target.value;
        return principal => self.props.dispatch(changePrincipal(principal));
    }

    render(){
        const { principal, loanterms } = this.props;
        const values = {
          min: 100,
          max: 2000,
          step: 100
        };
        return (
            <article>
                <div className="home-page">
                    <header>
                        <img className="logo" src="https://www.mash.com/-/media/images/mash/footer-logo.ashx?h=26&la=fi-FI&w=96&hash=9E88816D88508CB49081C001CF44E8F81494BA29" alt=""/>
                    </header>
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
                                    onChange={this.onChangePrincipal()}
                                />
                                {/* <input
                                    type="range"
                                    min={values.min}
                                    max={values.max}
                                    step={values.step}
                                    value={principal}
                                    onChange={this.onChangePrincipal()}
                                /> */}
                            </div>
                            <div className="loan-term">
                                <h3 className="inner-title">The following terms are available</h3>
                                <Loanterm {...loanterms} />
                            </div>
                        </div>
                    </section>
                    {/*
                    <section id="demonstration">
                        <Demonstration {...payments} />
                    </section>
                    */}
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


/* const mapDispatchToProps = dispatch => {
    return {
        changePrincipal: (event) => {
            let principal = event.target.value;
            // dispatch(changePrincipal(principal));
        }
    }
}; */

export default connect(mapStateToProps)(Homepage);
