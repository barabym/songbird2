import React, { Component } from 'react';

import './Answer.styles.scss';

class Answer extends Component {
  render() {
    const {
      indicatorClassName, ind, name, onClick,
    } = this.props;
    return (
      <li className="answer" onClick={() => { onClick(ind); }} role="presentation">
        <span className={indicatorClassName} />
        {name}
      </li>
    );
  }
}

export default Answer;
