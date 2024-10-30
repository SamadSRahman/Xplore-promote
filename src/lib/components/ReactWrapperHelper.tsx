// ReactWrapperHelper.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactHeader from './ReactHeader';


export function renderReactHeader(container: HTMLDivElement) {
  ReactDOM.render(<BrowserRouter><ReactHeader /></BrowserRouter>, container);
}

export function unmountReactHeader(container: HTMLDivElement) {
  ReactDOM.unmountComponentAtNode(container);
}
