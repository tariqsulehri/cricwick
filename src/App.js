import React, { Component }   from 'react';
import NavigationBar          from './components/home/navigationBar';
import HomeLeftPanel          from './components/home/homeLeftPanel';
import HomeLeftDownPanel      from './components/home/homeLeftDownPanel';
import HomeRightPanel         from './components/home/homeRightPanel';
//import HomeCenterPanel1 from './components/home/homeCenterPanel1';
import MatchHeader            from './components/home/matchHeader';
import {Route, Switch}        from 'react-router-dom';
import Feeds                  from './components/home/homeCenterPanel1';
import Series                 from './components/series/series';
import Videos                 from './components/videos/videos';
import Stories                from './components/stories/stories';
import Ranking                from './components/ranking/ranking';
import Login                  from './components/login/login';
import NotFound               from './components/common/notFound';
import Summary                from './components/summary/summary';

import FeaturedSeries         from './components/leftPanel/featuredSeries';
import HomeRightVideoHeighLights from './components/home/homeRightVideoHeighLights';

import './App.css';
import './assets/css/common/shortMenu.css';
import './assets/css/home/navigationBar.css';
import './assets/css/common/videoCards.css';

class App extends Component {
  render() {
     return (
      // <div className="App">
      <div className="App">
        <div className='container-fluid' style={{ marginBottom: 6 + "px", backgroundColor: 'White' }}>
          <div className="row">
            <div className="col-12 pl-0 pr-0">
              <NavigationBar />
            </div>
          </div>
        </div> 

        <div className="container">
          {/* <BasicExample /> */}
          <div id='HomeLiveMatchHeader' className="row">
            <div className="col-12 pl-0 pr-0 mb-3">
              <MatchHeader />
            </div>
          </div>

          <div className="row">
            
            {/* <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 pl-2 pr-0"> */}
            <div id='leftPanel' className="d-md-none d-sm-none d-xs-none d-lg-block col-lg-2 pl-0">
              <div style={{ paddingBottom: 15 + 'px' }}>
                <HomeLeftPanel />
              </div>

              <div >
                <HomeLeftDownPanel />
              </div>
            </div>


            <div id='centents-area' className="col-xs-12 col-sm-12 col-md-12 col-lg-7 p-0">
              <Switch>
                  <Route path={`/series/allseries`} component={Series} />
                  
                  <Route path="/series/:series_id/:title"
                         render={(props)=> <FeaturedSeries viewable_type="series" {...props}/>}
                  />

                  <Route path="/stories"          
                         render={(props)=> <Stories {...props}/>}
                   />        

                   
                  <Route path="/videos"           component={Videos}/>

                  {/* ========================= */}
                  
                  <Route path="/ranking"          component={Ranking} />
                  <Route path="/leftPanel/"       component={FeaturedSeries} />
                  <Route path="/match/:match_id"  component={Summary}/>

                  <Route path="/login/"           component={Login} />

                  

                  <Route path="/" exact component={Feeds} />
                  <Route component={NotFound} />

              </Switch>
            </div>

            <div id='HomeRightPanel' className="d-md-none d-sm-none d-xs-none d-lg-block col-lg-3 pr-0">
                <HomeRightPanel />
                <HomeRightVideoHeighLights/>
            </div>

            </div>
          </div>
        </div>
    );
  }
}

export default App;
