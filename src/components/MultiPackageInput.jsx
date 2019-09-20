import React from 'react';
import PackageInput from './PackageInput';

export default class MultiPackageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: [ '' ],
    };
  }

  addInput = () => {
    this.setState({
      inputs: [ ...this.state.inputs, '' ],
    });
  }

  removeInput = (deleteIdx) => {
    this.setState({
      inputs: this.state.inputs.filter((_, idx) => idx !== deleteIdx),
    });
  }

  updateInput = (event) => {
    const updateIdx = Number(event.target.name);
    const newValue = event.target.value;

    this.setState({
      inputs: this.state.inputs.map((value, idx) =>
        idx === updateIdx ? newValue : value
      )
    });
  }

  render() {
    return (
      this.state.inputs.map((value, idx) =>
        <>
          <PackageInput name={idx} value={value} onChange={this.updateInput} />
          {
            idx < (this.state.inputs.length - 1) ?
              <button onClick={() => this.removeInput(idx)}>-</button> :
              <button onClick={this.addInput}>+</button>
          }
        </>
      )
    );
  }
}
