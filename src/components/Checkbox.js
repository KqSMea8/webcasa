import React, { Component } from 'react';
import PropTypes from "prop-types";
import suino from './../static/produtos/tipos/pig-icon.png';
import bovino from './../static/produtos/tipos/cow-icon.png';
import frango from './../static/produtos/tipos/chicken-icon.png';



class Checkbox extends Component {
  
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { label, classes } = this.props;
    const { isChecked } = this.state;

    return (
      <div className={classes}>
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          <span className="checkmark">
            <img alt={`tipo-${label}`} src={label === 'Frango' ? frango : label === 'Bovino' ? bovino : suino}/>
          </span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;