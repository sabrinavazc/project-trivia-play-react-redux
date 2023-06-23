import { Component } from 'react';
import style from './Logo.module.css';

export default class Logo extends Component {
  render() {
    return (
      <>
        <div className={ style.logo }>
          <div className={ style.questions }>
            <span className={ style.question1 }>?</span>
            <span className={ style.question2 }>?</span>
            <span className={ style.question3 }>?</span>
          </div>
          <h1 className={ style.h1 }>Trivia</h1>
        </div>
        <div className={ style.triangle } />
      </>
    );
  }
}
