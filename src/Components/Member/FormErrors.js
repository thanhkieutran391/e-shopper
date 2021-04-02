
import React, { Component } from 'react';

class FormErrors extends Component {
  constructor(props) {
    super(props)
    this.renderErrors = this.renderErrors.bind(this);
  }

  renderErrors() {
    let data = this.props.formErrors

    if (Object.keys(data).length > 0) {
      return (
        Object.keys(data).map((key, index) => {
          return (
            <p index={index}>{data[key]}</p>
          )
        })
      )
    }
  }

  render() {
    return (
      <div className='formErrors'>
        {this.renderErrors()}
      </div>
    )
  }
}


export default FormErrors;
