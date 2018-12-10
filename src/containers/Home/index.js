import React, { Component } from "react";
import { connect } from "react-redux";
import { addArticle } from "../../actions/index";
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
        this.props.changePrincipal({ principal });
        this.setState({ principal: value });
    }

    render(){
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
                            <h2 className="amout">{formatMoney(principal)}</h2>
                            <h3 className="inner-title">Amount required</h3>
                            <Slider
                            min={values.min}
                            max={values.max}
                            step={values.step}
                            value={principal}
                            format={formatMoney}
                            labels={horizontalLabels}
                            onChange={this.handleChange}
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
const mapDispatchToProps = dispatch => {
    return {
        changePrincipal: principal => dispatch(changePrincipal(principal))
    };
};
const Home = connect(null, mapDispatchToProps)(Homepage);
export default Home;

