import React, { Component } from 'react';
import Loading              from '../common/loading';
import http                 from 'superagent'; 

class RenderRanking extends Component {
    constructor(props) {
        super(props);
        this.state = {
               selectedType : this.props.selectedType,
               baseUrl : 'https://back.cricwick.net/api', 
               error: null,
               isLoaded: false,
               isLoading: false,
               hasMore: true,
               seriesData: [],
               page: 1,
               perPage: 5,
        }
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
                                    <img className='ranking-team-flag' src={ranker.team_flag} alt='noImage' />
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
                                <img className='ranking-player-image' src={ranker.player_display_picture} alt='noImage' />
                                 <span style={{paddingLeft:4+"px"}}> {ranker.player_name} </span>
                                </td>
                                <td>
                                    <img className='ranking-team-flag' src={ranker.team_flag} alt='noImage' />
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

        const { seriesData, error, isLoaded, selectedType} = this.state;

        if (error) {
            return (<div> Error : {error.response}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {
        return (
            <div>
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

export default RenderRanking;