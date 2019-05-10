import React, { Component } from 'react';
import request from 'superagent';
import Loading from '../common/loading';
import Match from 'mathjs';
import { NavLink, Route } from 'react-router-dom';
import Live from './live';

import '../../assets/css/series/series.css';
//import axios                from 'axios';

class Series extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            live_series: [],
            recent_series : [],
            upcoming_series:[],
            selectedType: 'live_series',
            urlPath: 'live',
            baseUrl: 'https://back.cricwick.net/api',
            page: 1,
            telco: 'mobilink',
            perPage: 10,
        };
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
        this.loadSeriesRecords();
        // this.state.seriesData['live_series'].map((item,i)=>(
        //       console.log(item)
        // ));
        //console.log( "From Component Did Mount : " , this.state.seriesData);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    loadSeriesRecords = async () => {
        const { page, perPage, baseUrl, live_series, recent_series, upcoming_series } = this.state;
        // fetch("http://back.cricwick.net/api/v3/view_lists/get_by_name?view=home")
        //Home Series Api  

        const Url = baseUrl + '/v2/series/'
            + '?page=' + page
            + '&per_page=' + perPage;

        //console.log(Url);
        //console.log(hasMore);
        await request
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState(() => {
                    return {
                        isLoaded: true,
                        isLoading: false,
                        live_series    : [...live_series  ,...res.body.live_series], 
                        recent_series  : [...recent_series  ,...res.body.recent_series], 
                        upcoming_series: [...upcoming_series  ,...res.body.upcoming_series],
                        hasMore:  ((res.body.live_series + res.body.recent_series + res.body.upcoming_series) < perPage)
                    }
                });
            })
            .catch(error => {
                this.setState(() => {
                    return {
                        isLoaded: false,
                        error
                    }
                });
            });
    }

    calculateSeriesRecords = () => {

    }

    handleScroll = async () => {
        const { hasMore, page } = this.state;

        let offset = (document.documentElement.scrollTop + window.innerHeight);
        let height = document.documentElement.offsetHeight;

        console.log(height, "  = ", Match.ceil(offset));

        if (Math.ceil(offset) === height) {
            console.log("Inside Scroll");
            if (!hasMore) {
                //console.log("offset : ", Math.ceil(offset));
                await this.setState((prevState) => { return { page: prevState.page + 1 } });
                await this.loadSeriesRecords();
                console.log("HasMore : ", hasMore, " Page:", page);
            }
            else {
                console.log('End of list....');
            }
        }
    }

    render() {
        const { error, isLoaded, live_series, recent_series, upcoming_series } = this.state;
        const { match } = this.props;

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {
            console.log(live_series.length, upcoming_series.length, recent_series.length );
            return (
                <div>
                    <div className='card card-block mb-1 p-3'>

                        <span className='short-menu-buttons'>
                            <NavLink className='btn btn-default'
                                to={`${match.url}/live`}
                                activeClassName="short-menu-active"  >Live</NavLink>
                            <NavLink className='btn btn-default'
                                to={`${match.url}/upcoming`}
                                activeClassName="short-menu-active"  >Upcoming</NavLink>
                            <NavLink className='btn btn-default'
                                to={`${match.url}/recent`}
                                activeClassName="short-menu-active"  >Result</NavLink>
                        </span>
                    </div>

                    <div className="card card-block p-3 mb-1">
                        <Route exact
                            path={`${match.url}/live`}
                            render={
                                (props) => (
                                    live_series.length > 0 &&
                                    <Live {...props} data={live_series} selectedType="live_series" />
                                )
                            }
                        />

                        <Route exact
                            path={`${match.url}/upcoming`}
                            render={(props) => (
                                <div onScroll={this.handleScroll}>
                                         {upcoming_series.length > 0 &&
                                           <Live {...props} data={upcoming_series} selectedType="upcoming_series" />
                                         }
                                </div>
                            )
                            }
                        />

                        <Route exact
                            path={`${match.url}/recent`}
                            render={props => (
                               <div onScroll={this.handleScroll}> 
                                    { recent_series.length > 0 &&
                                      <Live {...props} data={recent_series} selectedType="recent_series" />
                                    }
                               </div>
                            )}
                        />

                    </div>

                    {/* Loading Compoent will show animated Gif   */}
                    {!isLoaded &&
                        <Loading />
                    }

                </div>
            );
        }
    }
}

export default Series;


/* <span  className='short-menu-buttons'>
    <button className='btn btn-default' onClick={() => this.handleClick('live_series'     , 'live')} >Live</button>
    <button className='btn btn-default' onClick={() => this.handleClick('upcoming_series' ,'upcoming')}>Upcomming</button>
    <button className='btn btn-default' onClick={() => this.handleClick('recent_series'   , 'recent')}>Result</button>
</span> */

// <Route
//   path='/dashboard'
//   render={(props) => <Dashboard {...props} isAuthed={true} />}
// />

//  <Route
//   path='/dashboard'
//   component={() => <Dashboard isAuthed={true} />}
// /> 


// <Route
//   path='/dashboard'
//   component={Dashboard}
//   isAuthed={true}
// />