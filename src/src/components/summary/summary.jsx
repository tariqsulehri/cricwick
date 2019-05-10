import React, { Component } from 'react';
import {NavLink, Route,  Switch}    from 'react-router-dom';
import http                 from 'superagent';
import MatchSummary         from './matchSummary';
import MatchVideos          from './matchVideos';
import MatchBallByBall      from './matchBallByBall';
import MatchSquads          from './matchSquads'; 
import ScoreCard            from './scoreCard';
import Loading              from '../common/loading';

class Summary extends Component {
  
    constructor(props) {
        super(props)
        const {match} =  this.props;
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            over: null,
            match_id: match.params.match_id,  
            selectedType: match.params.selectedType,
            baseUrl: 'https://back.cricwick.net/api',
        };

    }

     componentDidMount(){
         console.log("Component Did Mount From :  Summary");
         this.loadSeriesRecords();       
     }

     componentWillReceiveProps=()=>{
        console.log("Component Will Recevie Props :  Summary");
     }

    loadSeriesRecords = async () => {
        const { baseUrl, telco, match_id } = this.state;
        // Series Summmary URL
        const Url = baseUrl + '/'
            + 'v3'
            + '/'
            + 'matches'
            + '/'
            + match_id
            + '/'
            + 'summary'
            + '?telco=' + telco

        console.log(Url);
        //console.log(hasMore);

          await http
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
               this.setState(()=>{
                   return {
                       isLoaded: true,
                       isLoading: false,
                       seriesData: res.body
                   }
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    }

  
    render() {
        const {match_id, seriesData , error, isLoading } = this.state;
        const {match} =  this.props;
        
        if (error) {
          return <div> Error : {error.message} </div>;
        } else if (isLoading) {
             return (<Loading />)
        } else if(seriesData.length !== 0 )  {    
          console.log("Tariq Summary Match Data : ",seriesData);  
          return ( 
                <div id='match_summary'>
                    <div className='card card-block pl-2 pt-3 pb-3 mb-1'>
                        {/* <h6 className='menu-buttons-title-heading'>{seriesData.match.series.title}</h6> */}
                         <span className='short-menu-buttons'>
                            <NavLink exact className='btn btn-default' 
                                  to={`${match.url}`}
                                  activeClassName="short-menu-active"    >Summary      </NavLink>
                            <NavLink className='btn btn-default' 
                                    to={`${match.url}/scorecard`}   
                                    activeClassName="short-menu-active"  >Scorecard    </NavLink>
                            <NavLink className='btn btn-default' 
                                    to={`${match.url}/videos`}      
                                    activeClassName="short-menu-active"  >Videos       </NavLink>
                            <NavLink className='btn btn-default' 
                                    to={`${match.url}/ballbyball`}  
                                    activeClassName="short-menu-active"  >Ball by Ball </NavLink>
                            <NavLink className='btn btn-default' 
                                    to={`${match.url}/squads`}      
                                    activeClassName="short-menu-active"  >Squads      </NavLink>
                        </span>

                    </div>

                  <div>
                      <Switch>
                          <Route exact
                              path={`${match.url}`}
                              render={(props) => <MatchSummary {...props} match_id={match_id} selectedType="summary" />}
                          />

                          <Route
                              path={`${match.url}/scorecard`}
                              render={(props) => <ScoreCard {...props} match_id={match_id} selectedType="scorecard" />}
                          />
                          <Route
                              path={`${match.url}/videos`}
                              render={(props) => <MatchVideos {...props} match_id={match_id} selectedType="videos" />}
                          />
                          <Route
                              path={`${match.url}/ballbyball`}
                              render={(props) => <MatchBallByBall {...props} inning={seriesData.match.innings[seriesData.match.innings.length - 1]} selectedType="ballbyball" />}
                          />
                          <Route
                              path={`${match.url}/squads`}
                              render={(props) => <MatchSquads {...props} match={seriesData.match} selectedType="squads" />}
                          />
                      </Switch>
                  </div>  

                  </div>
            );
        } else {
           return(<div></div>)
        }
    }
}

export default Summary;

// <span className='short-menu-buttons'>
//     <button className='btn btn-default' onClick={() => this.handleClick('summary')} >Summary</button>
//     <button className='btn btn-default' onClick={() => this.handleClick('score-card')}>Scorecard</button>
//     <button className='btn btn-default' onClick={() => this.handleClick('videos')}>Videos</button>
//     <button className='btn btn-default' onClick={() => this.handleClick('ball_by_ball')}>Ball by Ball</button>
//     <button className='btn btn-default' onClick={() => this.handleClick('squads')}>Squads</button>
// </span>


// {selectedType === 'summary' &&
// <div>
//     <MatchSummary match={match} />
// </div>
// }
  
// {selectedType === 'score-card' &&
// <div className='card p-3 mb-1'>
//     <ScoreCard match={match}/>
// </div>
// }

// {selectedType === 'videos' &&
// <div className='card p-3 mb-1'>
//     <MatchVideos match_id={match.id}/>
// </div>
// }

// {selectedType === 'ball_by_ball' &&
// <div className='card p-3 mb-1'>
//     <MatchBallByBall match={match} inning={match.innings[match.innings.length-1]}/>
// </div>
// }       

// {selectedType === 'squads' &&
// <div className='card p-3 mb-1'>
//      <MatchSquads match={match}/>
// </div>
// }      