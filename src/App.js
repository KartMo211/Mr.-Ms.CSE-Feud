import React, { Component } from "react";
import { useState } from "react";

import "./App.css";

var questions = [
  {
    question: "In which places on our campus does your heart beat the most?",
    choices: [
      { title: "Ruby Park", points: 40 },
      { title: "Examination Hall", points: 31 },
      { title: "OAT", points: 23 },
      { title: "Library", points: 16 },
      { title: "Lower Ground", points: 10 },
      { title: "Canteen", points: 5 },
    ],
  },
  {
    question: "What is the worst thing that can happen to you (academically)?",
    choices: [
      { title: "Professor catching you burning calories", points: 40 },
      { title: "8 A.M Class", points: 5 },
      { title: "Give you a back", points: 31 },
      { title: "Surprise Quiz", points: 23 },
      { title: "Catch you Giving proxy", points: 16 },
      { title: "Extra Class", points: 10 },
    ],
  },
  {
    question: "Where do you get the best foods?",
    choices: [
      { title: "RD", points: 51 },
      { title: "Mezbaan", points: 38 },
      { title: "Dosa Shop", points: 29 },
      { title: "Hostel Canteen", points: 21 },
      { title: "Mess", points: 14 },
      { title: "Barista", points: 6 },
      { title: "Dwarika", points: 6 },
      { title: "SugarnIce", points: 6 },
    ],
  },
  {
    question:
      "If given another chance to start from the first year, what would you do?",
    choices: [
      { title: "More trips", points: 35 },
      { title: "Pull on a 10/10", points: 27 },
      { title: "Study Harder", points: 20 },
      { title: "Dropout", points: 14 },
      { title: "Join Gym/Clubs", points: 9 },
    ],
  },
  {
    question: "What things would you do with your juniors?",
    choices: [
      { title: "Interaction", points: 40 },
      { title: "Guidance", points: 31 },
      { title: "Treat", points: 23 },
      { title: "Celebration/Festivals", points: 16 },
      { title: "Lab manuals/Assignments", points: 10 },
      { title: "Relationships", points: 5 },
    ],
  },
  {
    question:
      "If you had the power to change an institute rule, which one would it be?",
    choices: [
      { title: "Entry time", points: 35 },
      { title: "75% Attendance compulsion", points: 27 },
      { title: "Beverages ++", points: 20 },
      { title: "Campus Wifi Restrictions", points: 14 },
      { title: "Co-Ed Hostel", points: 9 },
    ],
  },
  {
    question: "A thing related to you that you want to increase",
    choices: [
      { title: "Size", points: 40 },
      { title: "CGPA", points: 31 },
      { title: "Stipend/Package", points: 23 },
      { title: "IQ", points: 16 },
      { title: "Aura", points: 10 },
      { title: "Stamina/Strength", points: 5 },
    ],
  },
  {
    question: "Things you would do when your roomate is away",
    choices: [
      { title: "Sleep", points: 40 },
      { title: "Self-care", points: 31 },
      { title: "Study", points: 23 },
      { title: "Using his stuff", points: 16 },
      { title: "Eating his food", points: 10 },
      { title: "Playing videos/music on high volume", points: 5 },
    ],
  },
];

// Create audio objects for sound effects
const correctSound = new Audio(process.env.PUBLIC_URL + "/Correct.mp3");
const wrongSound = new Audio(process.env.PUBLIC_URL + "/Wrong.mp3");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      curPlayer: 0, // Moved curPlayer to state
      Player1Score: 0,
      Player2Score: 0,
      score: 0, // Moved score to state
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    // Add event listener to handle clicks outside options
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    // Clean up event listener when component unmounts
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside(event) {
    // Play wrong sound if clicking outside the choices-container or on the background
    if (
      !event.target.closest(".choice-container") &&
      !event.target.closest("button") &&
      event.target.className !== "App-title" &&
      !event.target.closest(".player-container") &&
      event.target.className !== "question"
    ) {
      wrongSound.currentTime = 0; // Reset sound to beginning
      wrongSound.play();
    }
  }

  handleNext() {
    var currentQIndex = this.state.questionNumber;

    if (currentQIndex !== questions.length - 1) {
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

    // Play correct sound when getting points
    correctSound.currentTime = 0; // Reset sound to beginning
    correctSound.play();

    if (currentPlayer === 0) {
      this.setState({
        Player1Score: this.state.Player1Score + val,
        curPlayer: 1,
        score: val,
      });
    } else {
      this.setState({
        Player2Score: this.state.Player2Score + val,
        curPlayer: 0,
        score: val,
      });
    }
    console.log(this.state);
  }

  handlePrev() {
    var currentQIndex = this.state.questionNumber;

    if (currentQIndex !== 0) {
      currentQIndex--;
      this.setState({
        questionNumber: currentQIndex,
        Player1Score: 0,
        Player2Score: 0,
      });
    }
  }

  render() {
    document.title = "CSE Feud";

    var currentQuestion = questions[this.state.questionNumber];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CSE Feud</h1>
        </header>

        <div className="player-container">
          <h2 className="score">Player 1 Score: {this.state.Player1Score}</h2>
          <h2 className="score">Player 2 Score: {this.state.Player2Score}</h2>
        </div>
        <h1>Question {this.state.questionNumber + 1}</h1>
        <h2 className="question">{currentQuestion.question}</h2>

        <div className="choices-container">
          {currentQuestion.choices.map((choice, i) => {
            return (
              <div key={choice.title} className="choice-container">
                <input type="checkbox" id={i} />
                <label
                  htmlFor={i}
                  className="cover"
                  onClick={() => this.addScore(choice.points)}
                >
                  {i + 1}
                </label>
                <div className="choice">
                  {choice.title} - {choice.points}
                </div>
              </div>
            );
          })}
        </div>

        <div className="buttons">
          <button onClick={this.handlePrev}>Previous</button>
          <button onClick={this.handleNext}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
