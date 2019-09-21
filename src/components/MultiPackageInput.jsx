import React from 'react';
import PackageInput from './PackageInput';

export default class MultiPackageInput extends React.Component {
  constructor(props) {
    super(props);

    let packages;
    if (props.packages === undefined) {
      packages = [ '' ];
    } else if (!Array.isArray(props.packages)) {
      packages = [ props.packages ];
    } else {
      packages = props.packages;
    }

    this.state = {
      packages,
    };
  }

  addPackage = () => {
    this.setState({
      packages: [ ...this.state.packages, '' ],
    });
  }

  removePackage = deleteIdx => {
    this.setState({
      packages: this.state.packages.filter((_, idx) => idx !== deleteIdx),
    });
  }

  updatePackage = updateIdx => event => {
    this.setState({
      packages: this.state.packages.map((pkg, idx) =>
        idx !== updateIdx ? pkg : event.target.value
      )
    });
  }

  render() {
    return (
      this.state.packages.map((pkg, idx) =>
        <>
          <PackageInput value={pkg} onChange={this.updatePackage(idx)} />
          {
            idx < (this.state.packages.length - 1) ?
              <button type='button' onClick={() => this.removePackage(idx)}>-</button> :
              <button type='button' onClick={this.addPackage}>+</button>
          }
        </>
      )
    );
  }
}
