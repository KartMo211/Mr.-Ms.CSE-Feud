import React, { Component } from 'react';
import { useState } from 'react';

import './App.css';

var questions = [
  {
    "question": "Name a bad job for someone who is accident-prone",
    "choices": [{title:"Firefighter", points: 30}, {title:"Surgeon", points: 25}, {title:"Construction Worker", points: 20}, {title:"Waiter", points: 15}, {title:"Pilot", points: 10}, {title:"Mechanic", points: 5}]
  },
  {
    "question": "Name a bad job for someone who is accident-prone",
    "choices": [{title:"asfasdf", points: 30}, {title:"asdfsdf", points: 25}, {title:"Construction asfdsf", points: 20}, {title:"Waite adfsdfar", points: 15}, {title:"Piloasft", points: 10}, {title:"Mechanisadfasc", points: 5}]
  },
  
]

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      questionNumber: 0,
      curPlayer: 0, // Moved curPlayer to state
      Player1Score: 0,
      Player2Score: 0,
      score: 0      // Moved score to state
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);

  }

  handleNext(){
    var currentQIndex = this.state.questionNumber;

    if(currentQIndex !== questions.length - 1){
      currentQIndex++;
      this.setState({ 
        questionNumber: currentQIndex,
        Player1Score: 0,
        Player2Score: 0,
      });
    }
  }

  addScore(val) {
    var currentPlayer = this.state.curPlayer;

    if(currentPlayer === 0){
      this.setState({ 
        Player1Score: this.state.Player1Score + val,
        curPlayer: 1,
        score: val
      });
    }
    else{
      this.setState({ 
        Player2Score: this.state.Player2Score + val,
        curPlayer: 0,
        score: val
      });
    }
    console.log(this.state);

    
    
  }

  handlePrev(){
    var currentQIndex = this.state.questionNumber;

    if(currentQIndex !== 0){
      currentQIndex--;
      this.setState({ 
        questionNumber: currentQIndex,
        Player1Score: 0,
        Player2Score: 0,
      });
    }
  }
  render() {

    document.title='Bethel Family Feud';

    var currentQuestion = questions[this.state.questionNumber];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CSE Feud</h1>
        </header>

        <div className='player-container'>
          <h2 className='score'>Player 1 Score: {this.state.Player1Score}</h2>
          <h2 className='score'>Player 2 Score: {this.state.Player2Score}</h2>
        </div>
        <h1>Question {this.state.questionNumber + 1}</h1>
        <h2 className='question'>{currentQuestion.question}</h2>

        <div className='choices-container'>
          {currentQuestion.choices.map((choice, i) => {
            return (
              <div key = {choice.title} className = 'choice-container'>
                <input type='checkbox' id = {i} />
                <label htmlFor = {i} className = 'cover' onClick = {()=>this.addScore(choice.points)}>{i+1}</label>
                <div className = 'choice'>{choice.title} - {choice.points}</div>
              </div>
            )
          })}
        </div>

        <div className = 'buttons'>
          <button onClick = {this.handlePrev}>Previous</button>
          <button onClick = {this.handleNext}>Next</button>
        </div>
        
      </div>
    );
  }
}

export default App;
