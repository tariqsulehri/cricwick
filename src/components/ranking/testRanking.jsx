import React, { Component } from 'react';
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
                    this.setState({
                        isLoaded: true,
                        isLoading: false,
                        seriesData: res.body,
                        hasMore: true
                    });
                })
        } catch (error) {
            this.setState({
                isLoaded: false,
                error: error
            });
        }


    }

    handleClikc = (article) => {
        this.setState({
            showFull: true, article
        });
    }

    hideDetail = () => {
        this.setState({
            showFull: !this.state.showFull
        });
    }

    handleClick = (rankingType) => {

        if (rankingType === 'ODI') {
            this.setState({ selectedType: 'odi' });
            this.loadSeriesRecords();
        }

        if (rankingType === 'T20') {
            this.setState({ selectedType: 't20' });
            this.loadSeriesRecords();
        }

        if (rankingType === 'TEST') {
            this.setState({ selectedType: 'test' });
            this.loadSeriesRecords();
        }

    }

    renderTeamRanking = (data) => {
        return (
            <div>
                <table className='table table-striped table-condensed table-hover table-borderless rank-table'>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Flag</th>
                            <th>Team</th>
                            <th>Matches</th>
                            <th>Points</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ranker, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    <img className='team-flag' src={ranker.team_flag} alt='noImage' />
                                </td>
                                <td>{ranker.team_name}</td>
                                <td>{ranker.match_count}</td>
                                <td>{ranker.points}</td>
                                <td>{ranker.rating}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    renderRanking = (data) => {
        return (
            <div>
                <table className='table table-striped table-condensed table-hover table-borderless rank-table'>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Flag</th>
                            <th>Team</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ranker, i) => (
                            <tr key={i}>
                                <td>
                                <span style={{paddingLeft:8+"px"}}>{i + 1} </span>
                                </td>
                                <td>
                                <img className='playerImage' src={ranker.player_display_picture} alt='noImage' />
                                 <span style={{paddingLeft:4+"px"}}> {ranker.player_name} </span>
                                </td>
                                <td>
                                    <img className='team-flag' src={ranker.team_flag} alt='noImage' />
                                </td>
                                <td>{ranker.team_name}</td>
                                <td><span style={{paddingLeft: 8 + "px"}}>{ranker.rating}</span></td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    render() {

        const { seriesData, selectedType, error, isLoaded } = this.state;
        if (error) {
            return (<div> Error : {error.response}</div>);
        } else if (!isLoaded) {
            return (<div> Loading Data.... </div>);
        } else {
            return (
                <div>

                    <div>
                        <span>
                            <button className='btn mybutton btn-default mr-2 btn-sm' onClick={() => this.handleClick('TEST')}>TEST</button>
                            <button className='btn mybutton btn-default mr-2 btn-sm' onClick={() => this.handleClick('ODI')} >ODI</button>
                            <button className='btn mybutton btn-default mr-2 btn-sm' onClick={() => this.handleClick('T20')}>T20</button>
                        </span>
                    </div>


                    {/* <!-- This  following Code is for  ODI/T20/TEST Ranking  --> */}

                    <div className="card p-3 mb-1">
                        <h6 className="home-ranking-main-title">
                            ICC RANKING -
                                   <span className='home-ranking-main-title-dynamic'>
                                {' '} {selectedType}
                            </span>
                        </h6>
                        <h6 className="home-ranking-main-title-dynamic">TEAMs</h6>
                        {this.renderTeamRanking(seriesData.teams)}
                    </div>

                    <div className="card p-3 mb-1">
                        <h6 className="home-ranking-main-title">
                            <span className='home-ranking-main-title-dynamic'>
                               {"BATSMEN"}
                            </span>
                        </h6>
                        {this.renderRanking(seriesData.batsmen)}
                    </div>

                    <div className="card p-3 mb-1">
                        <h6 className="home-ranking-main-title">
                            <span className='home-ranking-main-title-dynamic'>
                               {"BOWLERs"}
                            </span>
                        </h6>
                        {this.renderRanking(seriesData.bowler)}
                    </div>

                    <div className="card p-3 mb-1">
                        <h6 className="home-ranking-main-title">
                            <span className='home-ranking-main-title-dynamic'>
                               {"ALL ROUNDERs"}
                            </span>
                        </h6>
                        {this.renderRanking(seriesData.all_rounder)}
                    </div>


                </div>
            );
        }
    }
}

export default Ranking;