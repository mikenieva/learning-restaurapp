import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import dotenv from 'dotenv'

dotenv.config()

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
, document.getElementById('root'));

