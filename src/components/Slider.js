import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const format = value => '€ ' + value;
const values = {
  min: 100,
  max: 2000,
  step: 100
};

const AmountSelect = ({ principal, onChange }) => (
  <div className="slider-wrapper">
    <Slider
      min={values.min}
      max={values.max}
      step={values.step}
      value={principal}
      format={format}
      onChange={onChange}
    />
  </div>
)

export default AmountSelect;