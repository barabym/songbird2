import React, { Component } from 'react';

import './AnswerBlock.styles.scss';

import Answer from '../Answer';

class AnswerBlock extends Component {
  render() {
    const {
      dataForAnswers, correctAnswerIndex, arrIncorrectAnswers, checkAnswer,
    } = this.props;
    return (
      <div className="answer_block">
        <ul>
          {dataForAnswers.map((item, ind) => {
            let indicatorClassName = 'answer--indicator';
            if (correctAnswerIndex === ind) indicatorClassName = 'answer--indicator answer--indicator-true';
            if (arrIncorrectAnswers.includes(ind)) indicatorClassName = 'answer--indicator answer--indicator-false';
            return (
              <Answer
                indicatorClassName={indicatorClassName}
                key={item.id}
                name={item.name}
                ind={ind}
                onClick={checkAnswer}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AnswerBlock;
