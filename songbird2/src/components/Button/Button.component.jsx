import React, { Component } from 'react';

import './Button.styles.scss';

class Button extends Component {
  render() {
    const { onClick, active, text } = this.props;
    return (
      <button className={active ? 'button button-active' : 'button'} onClick={onClick} type="button">
        {text}
      </button>
    );
  }
}

export default Button;
