import React, { Component } from 'react';
import http from 'superagent';
import config from '../../config.json';
import LiveMatch from '../common/liveMatch';
import Articles from '../common/articles';
import Loading from '../common/loading';
import MatchBallByBall from './matchBallByBall';
import VideoCardLink from '../common/videoCardLink';

import '../../assets/css/summary/summary.css';
import '../../assets/css/series/series.css';


class MatchSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            over: null,
            selectedType: 'summary',
            baseUrl: config.apiEndPoint,
            telco: config.telco
        };

    }

    componentDidMount() {
        this.loadSeriesRecords();
        // this.state.seriesData['live_series'].map((item,i)=>(
        //       console.log(item)
        // ));
        //console.log( "From Component Did Mount : " , this.state.seriesData);
    }

    loadSeriesRecords = async () => {
        const { baseUrl, telco } = this.state;
        const { match_id } = this.props;

        // Series Summmary URL
        // 

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

        http
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState({
                    isLoaded: true,
                    isLoading: false,
                    seriesData: res.body
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    }

    handleClick = (selectedType) => {

        if (!selectedType) {
            this.setState({ selectedType: 'summary' });
        } else {
            this.setState({ selectedType: selectedType });
        }

    }

    renderLastWicket = (wickets) => {
        let batsMan = ''
        wickets.map((wicket, i) => (
            batsMan = wicket.out_batsman.player.name + ' (' + wicket.out_batsman.batsman.runs_scored + " )"
        ))
        return batsMan;
    }


    renderShortSummaryHeader = (match) => {
        const teamA = { id: match.team_1_id, name: match.teamA.name }
        const teamB = { id: match.team_1_id, name: match.teamA.name };
        let toss = '';

        if (match.toss_won_by_id === teamA.id) {
            toss = teamA.name + " Won the toss and elected to " + match.chose_to;
        } else {
            toss = teamB.name + " Won the toss and elected to " + match.chose_to;
        }

        return (
            <div>{toss}</div>
        );
    }

    renderUpdatedSummary = (match) => {

        const innings =  match.innings.length;
        console.log("Total Innings : ",innings);

        return (
            <div>
                {match.innings.slice(innings-1, 1).map((inning, i) => (
                    <div key={i}>
                        {inning.innings_order === i + 1 &&

                            <table className='table table-striped table-condensed table-hover table-borderless rank-table'>
                                <thead>
                                    <tr>
                                        <th>SCR</th>
                                        <th>OVR</th>
                                        <th>CRR</th>
                                        <th>LAST WICKET</th>
                                        <th>WKT</th>
                                        <th>BYE</th>
                                        <th>LBY</th>
                                        <th>NBl</th>
                                        <th>WDB</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{inning.runs}</td>
                                        <td>{inning.overs}</td>
                                        <td>{inning.run_rate}</td>
                                        <td>{this.renderLastWicket(match.partnership.fall_of_wickets)}</td>
                                        <td>{inning.wickets}</td>
                                        <td>{inning.extra_bye}</td>
                                        <td>{inning.extra_leg_bye}</td>
                                        <td>{inning.no_ball}</td>
                                        <td>{inning.wide_ball}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>
                ))
                }
            </div>
            //=====================
        );
    }

    renderPartnerShip = (objPartnerShip) => {
        return (
            <div>
                <table className='table table-striped table-condensed table-hover table-borderless rank-table'>
                    <thead>
                        <tr>
                            <th style={{textAlign:'left'}}>BATSMEN</th>
                            <th>R</th>
                            <th>B</th>
                            <th>4s</th>
                            <th>6s</th>
                            <th>SR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Batsman  - 1 Details */}
                        {objPartnerShip.batsman_1 !== null &&
                            <tr>
                                <td style={{textAlign:'left'}}>
                                    <img className='team-flag'
                                        src={objPartnerShip.batsman_1.player.display_picture_url}
                                        alt='noImage' />

                                    <span className='batsman-bowler-name'>
                                        {objPartnerShip.batsman_1.player.name}
                                    </span>

                                    <span style={{ color: 'red' }}>
                                        {objPartnerShip.batsman_1.batsman.on_strike === 1 ? '*' : ''}
                                    </span>

                                </td>

                                <td>{objPartnerShip.batsman_1.batsman.runs_scored}</td>
                                <td>{objPartnerShip.batsman_1.batsman.balls_played}</td>
                                <td>{objPartnerShip.batsman_1.batsman.boundry_4s_scored}</td>
                                <td>{objPartnerShip.batsman_1.batsman.boundry_6s_scored}</td>
                                <td>{objPartnerShip.batsman_1.batsman.strike_rate}</td>

                            </tr>
                        }

                        {/* Batsman-2 Details should be displayed if Batsman-2 is not NULL */}
                        {objPartnerShip.batsman_2 !== null &&
                            <tr>
                                <td style={{textAlign:'left'}}>
                                    <img className='team-flag'
                                        src={objPartnerShip.batsman_2.player.display_picture_url}
                                        alt='noImage' />

                                    <span className='batsman-bowler-name'>
                                        {objPartnerShip.batsman_2.player.name}
                                    </span>

                                    <span style={{ color: 'red' }}>
                                        {objPartnerShip.batsman_2.batsman.on_strike === 1 ? '*' : ''}
                                    </span>

                                </td>

                                <td>{objPartnerShip.batsman_2.batsman.runs_scored}</td>
                                <td>{objPartnerShip.batsman_2.batsman.balls_played}</td>
                                <td>{objPartnerShip.batsman_2.batsman.boundry_4s_scored}</td>
                                <td>{objPartnerShip.batsman_2.batsman.boundry_6s_scored}</td>
                                <td>{objPartnerShip.batsman_2.batsman.strike_rate}</td>
                            </tr>
                        }

                    </tbody>
                </table>



            </div>
        );


    }

    renderBowlerAverage = (totalScore, totalOver) => {

        if (totalScore === 0 || totalOver === 0) {
            return (<span>{0}</span>)
        }
        else {
            const EC = Number((totalScore / totalOver).toFixed(2));
            return (<span>{EC}</span>)
        }
    }


    renderBowlers = (objPartnerShip) => {

        if (!objPartnerShip) {
            return ('')
        } else {

            return (
                <div>
                    <table className='table table-striped table-condensed table-hover table-borderless rank-table'>
                        <thead>
                            <tr>
                                <th style={{textAlign:'left'}}>BOWLERS</th>
                                <th>O</th>
                                <th>M</th>
                                <th>R</th>
                                <th>W</th>
                                <th>EC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Bowler  - 2 Details */}
                            {objPartnerShip.bowler &&

                                < tr >
                                    <td style={{textAlign:'left'}}>
                                        <img className='team-flag'
                                            src={objPartnerShip.bowler.player.display_picture_url}
                                            alt='noImage' />

                                        <span className='batsman-bowler-name'>
                                            {objPartnerShip.bowler.player.name}
                                        </span>

                                        <span style={{ color: 'red' }}>
                                            {objPartnerShip.bowler.bowler.on_strike === 1 ? '*' : ''}
                                        </span>
                                    </td>

                                    <td>{objPartnerShip.bowler.bowler.overs_bowled}</td>
                                    <td>{objPartnerShip.bowler.bowler.overs_maiden}</td>
                                    <td>{objPartnerShip.bowler.bowler.runs_given}</td>
                                    <td>{objPartnerShip.bowler.bowler.wickets_taken}</td>

                                    <td>{this.renderBowlerAverage(
                                        objPartnerShip.bowler.bowler.runs_given,
                                        objPartnerShip.bowler.bowler.overs_bowled
                                    )}
                                    </td>
                                </tr>

                            }

                            {/* Bowler  - 2 Details */}
                            {objPartnerShip.last_bowler &&
                                <tr>
                                    <td style={{textAlign:'left'}}>
                                        <img className='team-flag'
                                            src={objPartnerShip.last_bowler.player.display_picture_url}
                                            alt='noImage' />

                                        <span className='batsman-bowler-name'>
                                            {objPartnerShip.last_bowler.player.name}
                                        </span>

                                        <span style={{ color: 'red' }}>
                                            {objPartnerShip.last_bowler.bowler.on_strike === 1 ? '*' : ''}
                                        </span>
                                    </td>

                                    <td>{objPartnerShip.last_bowler.bowler.overs_bowled}</td>
                                    <td>{objPartnerShip.last_bowler.bowler.overs_maiden}</td>
                                    <td>{objPartnerShip.last_bowler.bowler.runs_given}</td>
                                    <td>{objPartnerShip.last_bowler.bowler.wickets_taken}</td>

                                    <td>{this.renderBowlerAverage(
                                        objPartnerShip.last_bowler.bowler.runs_given,
                                        objPartnerShip.last_bowler.bowler.overs_bowled
                                    )}
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
            );
        }
    }

    handleClickOnOver = (over) => {
        this.setState({ over: over });
    }

    selectedOverDetail = () => {
        const { over } = this.state;

        return (
            <div className='card border-light shadow-sm bg-white rounded p-4 mb-1'>
                {over.balls.map((ball, i) => (
                    <div key={i} style={{ width: 100 + "%" }}>
                        <div>
                            <div style={{ float: 'left', width: 20 + '%', paddingBottom: 8 + 'px' }}>
                                <span className='badge mybadbe'>
                                
                                <i className="align-middle">
                                    {this.renderBallScore(ball)}
                                </i>

                                </span> <br />
                                <span className='commentry-text'>
                                    {ball.title}
                                </span> <br />
                            </div>

                            <div style={{ float: 'right', width: 80 + '%', paddingBottom: 8 + 'px' }} >
                                <span className='commentry-text'> {ball.commentary} </span>
                            </div>
                        </div >

                        <br />
                        <br />
                        <hr />

                    </div>
                ))}
            </div>
        )
    }

    renderOversDetail = (overs) => {
        //https://back.cricwick.net/api/v3/innings/5068/get_previous_overs?over_number=1

        return (
            overs.map((over, i) => (
                <div key={i} className='card card-for-scroll p-1' onClick={() => this.handleClickOnOver(over)} style={{ cursor: 'pointer' }} >
                    <div key={i} className='uppercase'> {over.title} </div>
                    {over.balls.map((ball, i) => (
                        <label key={i} className='badge badge-default'>
                             <i style={{paddingTop: 10 + 'px'}}>
                               {this.renderBallScore(ball)}
                             </i> 
                       </label>
                    ))}
                </div>
            ))
        );

    }

    render() {
        const { error, isLoaded, seriesData, over } = this.state;

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {

            return (
                <div>
                    <div className='card border-light shadow-sm bg-white rounded p-2 mb-1'>
                        <LiveMatch match={seriesData.match} />
                    </div>

                    <div className='card border-light shadow-sm bg-white rounded p-2 mb-1'>
                        <h6> {this.renderShortSummaryHeader(seriesData.match)} </h6>
                    </div>

                    <div>
                        {this.renderUpdatedSummary(seriesData.match)}
                    </div>

                    <div>
                        {this.renderPartnerShip(seriesData.match.partnership)}
                    </div>

                    <div>
                        {this.renderBowlers(seriesData.match.partnership)}
                    </div>

                    <div className='scrolling-wrapper mb-1'>
                        <MatchBallByBall overs={seriesData.overs} inning={seriesData.match.innings[seriesData.match.innings.length - 1]} />
                        {/* { this.renderOversDetail(seriesData.overs)} */}
                    </div>

                    <div>
                        {over && this.selectedOverDetail()}
                    </div>

                    <div>
                        {seriesData.timeline_videos.timeline &&
                            seriesData.timeline_videos.timeline.map((video, i) => (
                                <VideoCardLink key={i} video={video.video} left_Col={3} right_Col={9} />
                            ))
                        }
                    </div>

                    <div>
                        {seriesData.tweets &&
                            seriesData.tweets.map((tweet, i) => (
                                <Articles key={i} match={tweet} left_Col={9} right_Col={3} />
                            ))
                        }
                    </div>

                    <div>
                        {seriesData.articles &&
                            seriesData.articles.map((article, i) => (
                                <Articles key={i} match={article} left_Col={9} right_Col={3} />
                            ))
                        }
                    </div>

                </div>
            );
        }
    }
}

export default MatchSummary;