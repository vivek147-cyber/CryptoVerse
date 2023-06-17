import React from 'react'

import { Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar,Homepage,Cryptocurrencies,Cryptodetails,News } from './components';
import './App.css'
const App = () => {
    return (
        <div className="app">

            {/* First component is Navbar */}
            <div className="navbar">
                <Navbar />
            </div>

            {/* sceond component is main */}
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route exact path="/" element={ <Homepage />} />
                                
                            <Route exact path="/cryptocurrencies" element={ <Cryptocurrencies />} />
                               
                            <Route exact path="/coin/:uuid" element={ <Cryptodetails />} />
                                
                            <Route exact path="/news" element={ <News />} />
                                
                        </Routes>
                    </div>
                </Layout>
            </div>

        </div>
    )
}

export default App