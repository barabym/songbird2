import React, { Component } from 'react';

import './ListMarks.styles.scss';

class ListMarks extends Component {
  render() {
    const { activeStage } = this.props;
    const listMarks = ['Разминка', 'Насекомоядные птицы', 'Зерноядные птицы', 'Хищные птицы', 'Рыбоядные птицы', 'Домашние птицы'];

    return (
      <ul className="list_marks">
        {listMarks.map((item, ind) => {
          const liClassName = (activeStage === ind) ? 'list_marks--mark list_marks--mark-active' : 'list_marks--mark';
          return (
            <li className={liClassName} key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ListMarks;
