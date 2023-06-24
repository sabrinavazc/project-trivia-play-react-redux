import { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
