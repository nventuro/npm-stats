import React from 'react';

export default class PackagesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      package: '@openzeppelin/contracts',
      range: 'Monthly',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form>
        <label>
          Package:
          <input type='text' name='package' value={this.state.package} onChange={this.handleChange} />
        </label>
        <br />
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
    )
  }
}
