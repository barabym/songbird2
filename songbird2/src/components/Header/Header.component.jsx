import React, { Component } from 'react';

import './Header.styles.scss';

class Header extends Component {
  render() {
    const { scoreValue } = this.props;
    return (
      <div className="header">
        <img
          src="assets/media/header--logo.png"
          alt="logo"
        />
        <div>
          {'Score: '}
          <span>
            {scoreValue}
          </span>
        </div>
      </div>
    );
  }
}

export default Header;
