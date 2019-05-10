import React, { Component } from 'react';
import '../../assets/css/home/homeRankingICC.css';

class RankingContentsIdentifire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchType: 'odi',
            matchTypeToDisplay: 'ODI',

        };
    }

    handleClick = (rankingType) => {

        if (rankingType === 'odi') {
            this.setState(()=> { return{ matchType: 'odi', matchTypeToDisplay: 'ODI' }});
        }

        if (rankingType === 't20') {
            this.setState(()=> { return{ matchType: 't20', matchTypeToDisplay: 'T20' }});
        }

        if (rankingType === 'test_') {
            this.setState(()=> { return{ matchType: 'test_', matchTypeToDisplay: 'TEST' }});
        }

    }

    renderRanking = (data) => {
        return (
            <div>
                {data.map((player, i) => (
                    <div key={i}>
                        <div key={i} className="card border-light shadow-sm bg-white rounded mycard p-2 text-center">
                                <img
                                    className="playerImage"
                                    src={player.player_display_picture}
                                    alt="noImage"
                                />

                            <div className="card-body p-1">
                                <span>Rating</span><br/>
                                <h6 className="player-rating-number">{player.rating} </h6>{" "}
                                <h6 className='home-ranking-player-name'> {i + 1} {" - "} {player.player_name} </h6>
                                {player.team_name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    render() {

        const { contents } = this.props;
        const { matchType, matchTypeToDisplay } = this.state;

        //console.log(contents);

        if (!contents.data) return "";

        return (
            <div>

                {/* <!-- This  following Code is for  ODI/T20/TEST Ranking  --> */}
              
                    <div className="card border-light shadow-sm bg-white rounded mb-2 p-2 mb-1">
                        <div className='d-flex justify-content-around'>
                            <div className='short-menu-buttons pl-2' style={{width:100+'%'}}>
                                <button className='btn  btn-default pr-8' onClick={() => this.handleClick('odi')} >ODI</button>
                                <button className='btn  btn-default pr-8' onClick={() => this.handleClick('t20')}>T20</button>
                                <button className='btn  btn-default pr-8' onClick={() => this.handleClick('test_')}>TEST</button>
                            </div>
                        </div>
                        <hr/>
                        <h6 className="home-ranking-main-title">
                            ICC RANKING -
                                   <span className='home-ranking-main-title-dynamic'>
                                {' '} {matchTypeToDisplay}
                            </span>
                        </h6>
                    
                    <span className="home-ranking-sub-title">
                    ALL ROUNDERS</span>
                    
                        <div className="card-columns">
                            {this.renderRanking(contents.data[matchType].all_rounder)}
                        </div>

                        <h6 className="home-ranking-sub-title">BOWLERS</h6>
                        <div className="card-columns">
                            {this.renderRanking(contents.data[matchType].bowler)}
                        </div>

                        <h6 className="home-ranking-sub-title">BATSMEN</h6>
                        <div className="card-columns">
                            {this.renderRanking(contents.data[matchType].batsmen)}
                        </div>
                    </div>
            </div>
        );
    }
}

export default RankingContentsIdentifire;