import React, { Component } from 'react';
import {AllQuestions} from './questions.js';


class CircleOfFifths extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLastAnswerCorrect: false,
      questionsAvailable: JSON.parse(JSON.stringify(AllQuestions)),
      answer: null,
      value: '',
      questionId: this.selectAQuestionId(AllQuestions.length),
      previousAnswer: '',
      previousQuestion: ''
    };

  }

  selectAQuestionId(amountLeft) {
    amountLeft = Math.max(amountLeft - 1, 0);
    return Math.floor((Math.random() * amountLeft));
  }

  submitAnswer(event) {
    event.preventDefault();
    if(this.state.value !== '' && this.state.questionsAvailable.length > 0) {
      this.setState({answer: this.state.value, value: '', isLastAnswerCorrect: this.evaluateAnswer(this.state.value)});
    }
  }

  nextQuestion(removeQuestion) {
    let questions = JSON.parse(JSON.stringify(this.state.questionsAvailable));
    if(removeQuestion) {
      questions.splice(this.state.questionId, 1);
    }
    let previousAnswer = this.state.questionsAvailable[this.state.questionId].answer[0];
    let previousQuestion = this.state.questionsAvailable[this.state.questionId].question;
    this.setState(
      {
        questionsAvailable: questions, 
        questionId: this.selectAQuestionId(questions.length), 
        previousAnswer, 
        previousQuestion 
      }
    );
  }

  setValue(event) {
    let v = event.target.value.toLowerCase().trim().replace(/[^abcdefgs#♭']/g, '');
    if(v.charAt(1) === 'f') {
      v = v.charAt(0) + '♭';
    } else if(v.charAt(1) === 's') {
      v = v.charAt(0) + '#';
    }

    this.setState({value: v});
  }

  evaluateAnswer(answer) {
    let question = this.state.questionsAvailable[this.state.questionId];
    for(let i = 0; i < question.answer.length; i++) {
      if(question.answer[i] === answer) {
        this.nextQuestion(true);
        return true;
      }
    }
    this.nextQuestion(false);
    return false;
  }

  renderResponse() {
    if(this.state.isLastAnswerCorrect && this.state.answer != null) {
      return (
        <div>
          Correct!
        </div>
      );  
    } else if(this.state.answer != null) {
      return (
        <div>
          Wrong! <br />
          <span className="correctAnswer">
            Question: {this.state.previousQuestion} <br/> Answer: <strong>{this.state.previousAnswer}</strong>
          </span>
        </div>
      );
    }
  }

  showQuestion() {
    if (this.state.questionsAvailable.length > 0) {
      let question = this.state.questionsAvailable[this.state.questionId].question;
      return (
        <div>
          {question}
        </div>
      )
    } else {
      return (
        <h1>You did it!</h1>
      );
    }
  }

  render() {
    return (
      <div className="CircleOfFifths">
        <form onSubmit={this.submitAnswer.bind(this)}>
          {this.renderResponse()}
          {this.showQuestion()}
          <input type="text" maxLength="2" value={this.state.value} onChange={this.setValue.bind(this)}/>
        </form>
        <div className="questionsLeft">
          Questions Left: {this.state.questionsAvailable.length}
        </div>
      </div>
    );
  }
}

export default CircleOfFifths;
