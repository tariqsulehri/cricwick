import React, { Component } from 'react';
import request from 'superagent';
import Match from 'mathjs';
import Loading from '../common/loading';
import { Link } from 'react-router-dom';
import RankingContentsIdentifire from './rankingContentsIdentifire';
import SeriesContentsIdentifire from './seriesContentsIdentifire';
import OtherContentsIdentifire from './otherContentsIdentifire';

import '../../assets/css/home/homeCenterPanel.css';
//import axios from 'axios';

class HomeCenterPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            homeContents: [],
            hasMore: true,
            view: 'home',
            webuser: 1,
            page: 1,
            telco: 'mobilink',
            perPage: 5,
            ranking: [],
            series: [],
            match: null,
            baseUrl: 'http://back.cricwick.net/api/v3/view_lists'
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.loadSeriesRecord();

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let offset = (document.documentElement.scrollTop + window.innerHeight);
        let height = document.documentElement.offsetHeight;
        console.log("offset : ", Math.ceil(offset));
        console.log("height : ", height);

        if (Match.ceil(offset) === height) {
            this.setState(() => {
                return { page: this.state.page + 1 }
            });
            this.loadSeriesRecord();
        }
    }

    loadSeriesRecord = () => {
        const { homeContents, hasMore, view, webuser, page, perPage, baseUrl } = this.state;
        //fetch("http://back.cricwick.net/api/v3/view_lists/get_by_name?view=home")
        //Home Series Api  
        const Url = baseUrl + '/'
            + 'get_by_name?view=' + view
            + '&web_user=' + webuser
            + '&page=' + page
            + '&per_page=' + perPage;

        //console.log(Url);
        console.log(hasMore);

        request
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState(() => {
                    return {
                        isLoaded: true,
                        isLoading: false,
                        homeContents: [...homeContents, ...res.body],
                        hasMore: (res.length < perPage)
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


    render() {
        const { error, isLoaded, homeContents } = this.state;

        //let genericHome =  homeContents.filter(x => x.type === 'generic-home');

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (isLoaded) {
            return (
                <div onScroll={this.handleScroll}>
                    {/* Itreate top level contents line Series and Other Data */}
                    {homeContents.map((series, cnt) => (
                        <div key={cnt}>
                            <div className="home-div">
                                {/* Check Either the Current Level of Itration is a ( SERIES) */}
                                {series.type === 'series' &&
                                    <div>
                                        {series.data.map((matches, mat) => (
                                            <div key={mat} >
                                                {/* Render Series Contents Matches/Videos/Articles/Tweets etc */}
                                                {matches.data.map((match, i) => (
                                                    <div key={i}>
                                                        <SeriesContentsIdentifire match={match}
                                                            printSeriesTitle={i}
                                                            seriesTitle={series.title}
                                                            contentType={matches.type}
                                                            series={series.series_obj}
                                                        />
                                                    </div>
                                                ))}
                                                {/* ----------------- End Series Contents ------------- */}
                                            </div>
                                        ))}

                                        {/* Render BUTTONS with equal width dynamicly at end of Series */}
                                        <div className='d-flex justify-content-around mb-2 series-footer-btn-default' >
                                            {/* https://back.cricwick.net/api/v2/view_lists/get_list_items_from_viewable?viewable_type=series&viewable_id=157&page=1&telco=mobilink */}

                                            {/* myString = myString.replace(/\s+/g, '-'); */}

                                            <Link className='btn btn-default'
                                                to={`/series/${series.series_obj.id}/${series.series_obj.short_name.replace(/\s+/g, '-')}`}>
                                                Series Home </Link>
                                            {/* onClick={() => this.handleClick(series.series_obj,'series-home') } >Series Home</button> */}

                                            {series.series_obj.is_videos_enabled ?
                                                <Link className='btn btn-default '
                                                    to={`/series/${series.series_obj.id}/${series.series_obj.short_name.replace(/\s+/g, '-')}/${'videos'}`}>
                                                    Videos</Link> : ''}

                                            {series.series_obj.has_points_table ?
                                                // <button className='btn btn-default my-btn-default' 
                                                //           onClick={() => this.handleClick(series.series_obj,'series-pointtable') }>Point Table</button> : ''}
                                                <Link className='btn btn-default'
                                                    to={`/series/${series.series_obj.id}/${series.series_obj.short_name.replace(/\s+/g, '-')}/${'pointstable'}`}>
                                                    Point Table
                                                </Link>
                                                : ''
                                            }

                                        </div>
                                    </div>
                                }

                                {/* -------------------------------------------------------------------------- */}
                                {/* Check Either the Current Level of Itration Itration is VIDEO */}
                                {series.type === 'video' &&
                                    <div>
                                        <OtherContentsIdentifire contents={series} series={homeContents[0].series_obj}
                                            contentType={series.type}
                                            typeVideo={'video'}
                                        />
                                    </div>
                                }

                                {/* ------------------------------------------------------------------------- */}
                                {/* Check Either the Current Level of Itration Itration is GENERIC-HOME */}
                                {series.type === 'generic-home' &&
                                    <div>
                                        <OtherContentsIdentifire contents={series} series={homeContents[0].series_obj}
                                            contentType={series.type}
                                        />

                                    </div>
                                }
                                {/* ------------------------------------------------------------------------- */}

                                {/* Check Either the Current Level of Itration is RANKING */}
                                {series.type === 'ranking' &&
                                    <div>
                                        <RankingContentsIdentifire contents={series}
                                            contentType={series.type}
                                        />
                                    </div>
                                }
                                {/* ------------------------------------------------------------------------- */}

                            </div>

                        </div>
                    ))}
                    {/* -------------END OF ITRATION--------------------------- */}

                </div>
            )

        } else if (!isLoaded) {
             return (<Loading />);
        }

    }
}

export default HomeCenterPanel;
