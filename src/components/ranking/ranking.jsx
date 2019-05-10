import React, { Component } from 'react';
import RenderRanking from './renderRanking';
import {NavLink, Route}    from 'react-router-dom';

//import http from '../../services/httpService';
import http from 'superagent';
import '../../assets/css/ranking/ranking.css';

class Ranking extends Component {
    state = {
        error: null,
        isLoaded: false,
        isLoading: false,
        hasMore: true,
        selectedType: 'TEST',
        seriesData: [],
        baseUrl: 'https://back.cricwick.net/api',
        page: 1,
        perPage: 5,
        article: [],
        showFull: false,

    }

    componentDidMount = async () => {
        await this.loadSeriesRecords();
    }

    loadSeriesRecords = async () => {
        const { selectedType, baseUrl } = this.state;

        // 1) All Videos :
        //    Base URL =   https://back.cricwick.net/api 
        //    Composed =  /articles?page=1&page_size=6

        let Url = baseUrl
            + '/'
            + 'ranking'
            + '?'
            + 'type='
            + selectedType

        console.log(Url);

        try {
            await http
                .get(Url)
                .then(res => {
                    this.setState(() => {
                        return {
                            isLoaded: true,
                            isLoading: false,
                            seriesData: res.body,
                            hasMore: true
                        }
                    });
                })
        } catch (error) {
            this.setState(() => {
                return {
                    isLoaded: false,
                    error: error
                }
            });
        }


    }
    
    handleClick = async (rankingType) => {

        if (rankingType === 'ODI') {
            await this.setState(() => { return { selectedType: 'odi' } });
            await this.loadSeriesRecords();
        }

        if (rankingType === 'T20') {
            await this.setState(() => { return { selectedType: 't20' } });
            await this.loadSeriesRecords();
        }

        if (rankingType === 'TEST') {
            await this.setState(() => { return { selectedType: 'test' } });
            await this.loadSeriesRecords();
        }

    }

    render() {
        const {match} =  this.props;
            return (
                <div>

                    <div className='card card-block pl-2 pt-3 pb-3 mb-1'>
                        <span className='short-menu-buttons'>
                            <NavLink className='btn btn-default mr-4 btn-sm' to={`${match.url}/test`}       
                                     activeClassName="short-menu-active"
                                     >TEST</NavLink>
                            <NavLink className='btn btn-default mr-4 btn-sm' to={`${match.url}/odi`}       
                                     activeClassName="short-menu-active"
                                     >ODI</NavLink>
                            <NavLink className='btn btn-default mr-4 btn-sm' to={`${match.url}/t20`}       
                                     activeClassName="short-menu-active"
                                     >T20</NavLink>
                        </span>
                    </div>

                    {/* <!-- This  following Code is for  ODI/T20/TEST Ranking  --> */}
                    <div>
                        <Route exact
                            path={`${match.url}`}
                            render={(props) => <RenderRanking {...props} selectedType="test" />}
                        />

                        <Route
                            path={`${match.url}/test`}
                            render={(props) => <RenderRanking {...props} selectedType="test" />}
                        />

                        <Route
                            path={`${match.url}/odi`}
                            render={(props) => <RenderRanking {...props} selectedType="odi" />}
                        />

                        <Route
                            path={`${match.url}/t20`}
                            render={props => <RenderRanking {...props}  selectedType="t20" />}
                        />
                    </div>
                </div>
            );
        }
}

export default Ranking;



/* <span className='short-menu-buttons'>
                            <NavLink className='btn btn-default mr-2 btn-sm' onClick={() => this.handleClick('TEST')}>TEST</NavLink>
                            <NavLink className='btn btn-default mr-2 btn-sm' onClick={() => this.handleClick('ODI')} >ODI</NavLink>
                            <NavLink className='btn btn-default mr-2 btn-sm' onClick={() => this.handleClick('T20')}>T20</NavLink>
                        </span> */