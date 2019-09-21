import React from 'react';
import PackageInput from './PackageInput';
import MultiPackageInput from './MultiPackageInput';

export default class PackagesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      package: props.package,
      range: props.range,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <>
      <form>
        <MultiPackageInput />
        <label>
          Range:
          <select name='range' value={this.state.range} onChange={this.handleChange} >
            Range:
            <option value='monthly'>Monthly</option>
          </select>
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
      </>
    );
  }
}
