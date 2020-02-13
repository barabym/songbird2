import React, { Component } from 'react';

import './App.styles.scss';

import baseBirds from '../../service/birdsData';

import Header from '../Header';
import ListMarks from '../ListMarks';
import QuestionBlock from '../QuestionBlock';
import AnswerBlock from '../AnswerBlock';
import DescriptionBlock from '../DescriptionBlock';
import Button from '../Button';
import CongratPage from '../CongratPage';

import getRandom from '../../service/getRandom';

class App extends Component {
  constructor(props) {
    super(props);
    this.secret = null;
    this.state = {
      scoreValue: 0,
      activeStage: 0,
      isNext: false,
      dataForQuestion: { name: '', image: '', audio: '' },
      dataForDescription: [],
      dataForAnswers: [],
      correctAnswerIndex: undefined,
      arrIncorrectAnswers: [],
    };
  }

  componentDidMount() {
    this.startStage(0);
  }

  startStage = (stage) => {
    if (stage) this.clearData();
    this.secret = getRandom(0, 5);
    const defaultData = {
      name: '*******',
      image: 'assets/media/defaultBird.png',
      audio: `${baseBirds[stage][this.secret].audio}`,
    };
    this.setState({ dataForQuestion: defaultData });
    this.setState({ dataForAnswers: baseBirds[stage] });
  }

  clearData = () => {
    this.setState({ isNext: false });
    this.setState({ dataForDescription: [] });
    this.setState({ dataForAnswers: [] });
    this.setState({ correctAnswerIndex: undefined });
    this.setState({ arrIncorrectAnswers: [] });
  }

  goNextStage = () => {
    const { activeStage, isNext } = this.state;
    if (!isNext) return;
    const stage = activeStage + 1;
    if (activeStage === 5) {
      this.stopPlayerQuestionBlock();
      this.stopPlayerDescriptionBlock();
      this.beepSound('assets/media/victory.mp3');
      this.showCongratPage(true);
    } else {
      this.startStage(stage);
      this.setState({ dataForAnswers: baseBirds[stage] });
    }
    this.setState({ activeStage: stage });
  }

  showCongratPage = (mode) => {
    const gamePage = document.querySelector('.app--game_page');
    const congratPage = document.querySelector('.app--congrat_page');
    gamePage.style.display = mode ? 'none' : '';
    congratPage.style.display = mode ? 'block' : 'none';
  }

  newGame = () => {
    this.showCongratPage(false);
    this.setState({ scoreValue: 0 });
    this.setState({ activeStage: 0 });
    this.clearData();
    this.startStage(0);
  }

  checkAnswer = (ind) => {
    const {
      activeStage, isNext, arrIncorrectAnswers, scoreValue,
    } = this.state;
    this.setState({ dataForDescription: baseBirds[activeStage][ind] });
    if (isNext || arrIncorrectAnswers.includes(ind)) return;
    if (ind === this.secret) {
      this.beepSound('assets/media/correct.mp3');
      this.stopPlayerQuestionBlock();
      this.setState({ dataForQuestion: baseBirds[activeStage][ind] });
      this.setState({ scoreValue: scoreValue + 5 - arrIncorrectAnswers.length });
      this.setState({ correctAnswerIndex: this.secret });
      this.setState({ isNext: true });
    } else {
      this.beepSound('assets/media/mistake.mp3');
      const tempArray = arrIncorrectAnswers;
      tempArray.push(ind);
      this.setState({ arrIncorrectAnswers: tempArray });
    }
  }

  beepSound = (path) => {
    const beep = new Audio(path);
    beep.play();
  }

  stopPlayerQuestionBlock = () => {
    const player = document.querySelector('.question_block--player');
    player.pause();
  }

  stopPlayerDescriptionBlock = () => {
    const player = document.querySelector('.media_wrapper--player');
    player.pause();
  }

  render() {
    const {
      scoreValue, activeStage, dataForQuestion, dataForDescription,
      dataForAnswers, correctAnswerIndex, arrIncorrectAnswers, isNext,
    } = this.state;
    return (
      <div className="app">
        <Header
          scoreValue={scoreValue}
        />
        <ListMarks
          activeStage={activeStage}
        />
        <div className="app--game_page">
          <QuestionBlock
            dataForQuestion={dataForQuestion}
          />
          <AnswerBlock
            dataForAnswers={dataForAnswers}
            checkAnswer={this.checkAnswer}
            correctAnswerIndex={correctAnswerIndex}
            arrIncorrectAnswers={arrIncorrectAnswers}
          />
          <DescriptionBlock
            dataForDescription={dataForDescription}
          />
          <Button
            onClick={this.goNextStage}
            active={isNext}
            text="Далее"
          />
        </div>
        <div className="app--congrat_page" style={{ display: 'none' }}>
          <CongratPage
            score={scoreValue}
            newGame={this.newGame}
          />
        </div>
      </div>
    );
  }
}

export default App;
