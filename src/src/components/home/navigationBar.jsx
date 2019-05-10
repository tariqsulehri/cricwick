import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import Feeds    from  '../home/homeCenterPanel1';
// import Series  from  '../series/series';
// import Videos  from  '../videos/videos';
// import Stories from  '../stories/news';
// import Ranking from  '../ranking/ranking';

import '../../assets/css/home/navigationBar.css';

class NavigationBar extends Component {

    render() {
        return (

            <div className='container'>
                <div className='row'>
                    <nav className="navbar navbar-expand-md" style={{ marginBottom: 6 + "px", backgroundColor: 'White', paddingRight:0+'px', paddingLeft:0+'px'}}>
                        <NavLink to="/">
                            <img style={{ width: 45 + "px", height: 45 + "px", marginRight : 50 + 'px' }}
                                src={require('../../assets/images/jazz_logo.png')}
                                alt=" " />
                        </NavLink>

                        <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarcontent"
                            area-controls="navbarcontent"
                            area-expanded="false"
                            area-label="Toggle Navigation">

                            <span className="navbar-toggler-icon">|||</span>
                        </button>


                        <div className="collapse navbar-collapse" id="navbarcontent" >

                            <ul className="top-navbar navbar-nav">

                            <li className="nav-item">
                                    <NavLink exact className="nav-link"
                                        to="/"
                                        activeClassName=".navigation-active-link"
                                    > Feeds
                                      {/* <span className="sr-only">(current)</span> */}
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link"
                                        to="/series/allseries/live"
                                        activeClassName=".navigation-active-link"
                                        >Series
                                </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link"
                                        to='/videos'
                                        activeClassName=".navigation-active-link"
                                    >Videos
                                </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" 
                                           to='/stories'
                                           activeClassName=".navigation-active-link"
                                    >Stories
                                </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link"
                                        to="/ranking"
                                        activeClassName=".navigation-active-link"
                                        >Rankings
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link"
                                        to="/login"
                                        activeClassName=".navigation-active-link"
                                        >LOGIN
                                </NavLink>
                                </li>

                               

                            </ul>
                        </div>
                    </nav>

                    {/* <Route exact path="/"  component = {Feeds}/>  
                  <Route path="/series"  component = {Series}/> 
                  <Route path="/videos"  component = {Videos}/> 
                  <Route path="/Stories" component = {Stories}/> 
                  <Route path="/ranking" component = {Ranking}/>  */}

                </div>
            </div>


        );
    }
}

export default NavigationBar;




/* <NavLink
  to="/faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  Help
</NavLink> */

// CSS:-
// nav {
//     border-bottom:1px solid grey;
//   }
  
//   nav > ul {
//     padding-left:0;
//   }
  
//   nav > ul > li {
//     display:inline-block;
//    margin-right:10px;
//   }
  
//   nav > ul > li > a.active {
//     color:red;
//   }
  
//   footer {
//     border-top:1px solid grey;
//     text-align:center;
//   }