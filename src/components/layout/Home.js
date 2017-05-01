import React, { Component } from 'react';
import { Posts, MapNavigation, Login } from '../containers';
import { Searchbar, Footer } from '../view';

class Home extends Component {
    render() {
        return(
            <div>
                <header id="header" style={{padding: 0}}>
                    <div className="inner">
                        <MapNavigation />
                    </div>
                </header>

                <div id="main">
                    <section id="one">
                        <div className="row">
                            <div className="8u 12u$(xsmall)">
                                <Posts />
                            </div>
                            
                             <div className="4u 12u$(xsmall)">
                                 <Login />
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;