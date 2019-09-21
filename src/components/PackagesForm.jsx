import React from 'react';
import MultiPackageInput from './MultiPackageInput';

export default class PackagesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: props.packages,
      range: props.range,
    };
  }

  //onSubmit = event => {
  //  event.preventDefault();
  //  const { fname, lname, email } = this.state;
  //  axios.post('/', { fname, lname, email })
  //}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <>
      <form>
        <MultiPackageInput packages={this.state.packages} />
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
