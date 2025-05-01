import React, { Component } from "react";
import { useState } from "react";

import "./App.css";

var questions = [
  {
    question: "In which places on our campus does your heart beat the most?",
    choices: [
      { title: "Ruby Park", points: 30 },
      { title: "Examination Hall", points: 25 },
      { title: "OAT", points: 20 },
      { title: "Library", points: 15 },
      { title: "Lower Ground", points: 10 },
      { title: "Canteen", points: 5 },
    ],
  },

  {
    question:
      "If given another chance to start from the first year, what would you do?",
    choices: [
      { title: "More trips", points: 30 },
      { title: "Pull on a 10/10", points: 25 },
      { title: "Do not study 1 day before exam", points: 20 },
      { title: "Dropout", points: 15 },
      { title: "Join Gym/Clubs", points: 10 },
    ],
  },
  {
    question: "What things would you do with your juniors?",
    choices: [
      { title: "Interaction", points: 30 },
      { title: "Guidance", points: 25 },
      { title: "Treat", points: 20 },
      { title: "Celebration/Festivals", points: 15 },
      { title: "Lab manuals/Assignments", points: 10 },
      { title: "Relationships", points: 5 },
    ],
  },

  {
    question:
      "If you had the power to change an institute rule, which one would it be?",
    choices: [
      { title: "Entry time", points: 30 },
      { title: "75% Attendance compulsion", points: 25 },
      { title: "Beverages ++", points: 20 },
      { title: "Campus Wifi Restrictions", points: 15 },
      { title: "Co-Ed Hostel", points: 10 },
    ],
  },

  {
    question: "A thing related to you that you want to increase",
    choices: [
      { title: "Size", points: 30 },
      { title: "CGPA", points: 25 },
      { title: "Stipend/Package", points: 20 },
      { title: "IQ", points: 15 },
      { title: "Aura", points: 10 },
      { title: "Stamina/Strength", points: 5 },
    ],
  },
  {
    question: "Where do you get the best foods?",
    choices: [
      { title: "RD", points: 30 },
      { title: "Mezbaan", points: 25 },
      { title: "Dosa Shop", points: 20 },
      { title: "Hostel Canteen", points: 15 },
      { title: "Mess", points: 10 },
      { title: "Barista", points: 5 },
      { title: "Dwarika", points: 5 },
      { title: "SugarnIce", points: 5 },
    ],
  },
  {
    question:
      "Which residential building would you like to stay in for a week?",
    choices: [
      { title: "Our Own Hostel", points: 30 },
      { title: "Aquamarine", points: 25 },
      { title: "Sapphire", points: 20 },
      { title: "Emerald", points: 15 },
      { title: "Topaz", points: 10 },
      { title: "Diamond", points: 5 },
      { title: "Jasper", points: 5 },
      { title: "EDC", points: 5 },
    ],
  },
  {
    question:
      "Give a word starting with the letter 'h' that can describe CK sir",
    choices: [
      { title: "Hilarious", points: 30 },
      { title: "Humble", points: 25 },
      { title: "Honest", points: 20 },
      { title: "Hardworking", points: 15 },
      { title: "Helpful", points: 10 },
    ],
  },

  {
    question: "Things you would do when your roomate is away",
    choices: [
      { title: "Sleep", points: 30 },
      { title: "Self-care", points: 25 },
      { title: "Study", points: 20 },
      { title: "Using his stuff", points: 15 },
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
