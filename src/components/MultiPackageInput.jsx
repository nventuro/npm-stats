import React from 'react';
import PackageInput from './PackageInput';

export default class MultiPackageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: [
        { name: '' },
      ],
    };
  }

  addPackage = () => {
    this.setState({
      packages: [ ...this.state.packages, { name: '' } ],
    });
  }

  removePackage = deleteIdx => {
    this.setState({
      packages: this.state.packages.filter((_, idx) => idx !== deleteIdx),
    });
  }

  updatePackageName = updateIdx => event => {
    this.setState({
      packages: this.state.packages.map((pkg, idx) =>
        idx !== updateIdx ? pkg : { ...pkg, name: event.target.value }
      )
    });
  }

  render() {
    return (
      this.state.packages.map((pkg, idx) =>
        <>
          <PackageInput value={pkg.name} onChange={this.updatePackageName(idx)} />
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
