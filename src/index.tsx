import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/index.css';
import Root from 'views/Root/Root';
import * as serviceWorker from 'service-workers/serviceWorker';
import * as serviceWorkerRegistration from 'service-workers/serviceWorkerRegistration';
import reportWebVitals from 'reportWebVitals';

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
