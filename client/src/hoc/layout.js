import React from 'react';

import Header from '../components/Header_footer/Header'
import Footer from '../components/Header_footer/Footer'

const Layout = (props) => {
    return (
        <div className="App">
            <Header />
                <div className="main_content">
                    {props.children}
                </div>
            <Footer />
        </div>
    );
};

export default Layout;