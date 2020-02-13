import React, { Component } from 'react';

import './DescriptionBlock.styles.scss';

class DescriptionBlock extends Component {
  render() {
    const { dataForDescription } = this.props;

    if (dataForDescription.name) {
      return (
        <div className="description_block">
          <div className="media_wrapper">
            <img
              className="media_wrapper--img"
              src={dataForDescription.image}
              alt="imagine bird"
            />
            <div className="media_wrapper--info">
              <p className="media_wrapper--name">
                {dataForDescription.name}
              </p>
              <p className="media_wrapper--species">
                {dataForDescription.species}
              </p>
              <audio className="media_wrapper--player" src={dataForDescription.audio} controls>
                Your browser does not support the audio element.
                <track kind="captions" />
              </audio>
            </div>
          </div>
          <div className="text_wrapper">
            {dataForDescription.description}
          </div>
        </div>
      );
    }
    return (
      <div className="description_block">
        <p className="description_block--invite">Послушайте плеер.</p>
        <p className="description_block--invite">Выберите птицу из списка.</p>
      </div>
    );
  }
}
export default DescriptionBlock;
