import React, { Component } from 'react';
import http from 'superagent';
import Loading from '../common/loading';
import '../../assets/css/summary/summary.css';

class ScoreCard extends Component {
  constructor(props) {
    super(props);

    const {match_id} =  this.props;

    this.state = {
      error: null,
      isLoaded: false,
      isLoading: false,
      hasMore: true,
      seriesData: [],
      match_id : match_id, 
      over: null,
      selectedType: "summary",
      baseUrl: "https://back.cricwick.net/api"
    };
  }

  componentDidMount() {
    this.loadSeriesRecords();
  }

  loadSeriesRecords = async () => {
    const { baseUrl, match_id } = this.state;

    // https://back.cricwick.net/api/2404

    const Url = `${baseUrl}/${match_id}` ;

    console.log(Url);
    //console.log(hasMore);

    http
      .get(Url)
      .set("Accept", "application/json")
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
        this.setState(()=>{
          return{
            isLoaded: false,
            error
          }
        });
      });
  };

  renderBattingScoreCard = inning => (
    inning.batting_scorecard.map((score, i) => (
      <tr key={i}>
        <td>
            <img
            className="team-flag"
            src={score.player.display_picture_url}
            alt="noImage" />
          
          <span className='batsman-bowler-name'>
              {score.player.name}<br />
          </span> 
          
          <span className='details'>
              {score.batsman.out_details}
          </span> 

        </td>

        <td>{score.batsman.runs_scored}</td>
        <td>{score.batsman.balls_played}</td>
        <td>{score.batsman.boundry_4s_scored}</td>
        <td>{score.batsman.boundry_6s_scored}</td>
        <td>{score.batsman.strike_rate}</td>
      </tr>
    ))
  );


  renderBowlerAverage = (totalScore, totalOver) => {

    if (totalScore === 0 || totalOver === 0) {
        return (<span>{0}</span>)
    }
    else {
        const EC = Number((totalScore / totalOver).toFixed(2));
        return (<span>{EC}</span>)
    }
}


  renderBowlingScoreCard = (inning) => (
    // console.log("inning : ",inning);
    <table className='table table-striped table-condensed table-hover table-borderless rank-table'>
      <thead>
        <tr>
          <th>BOWLERS</th>
          <th>O</th>
          <th>M</th>
          <th>R</th>
          <th>W</th>
          <th>EC</th>
        </tr>
      </thead>
      <tbody>
        {/* Bowler  - 2 Details */}
        {inning.bowling_scorecard.map((bowler, i) => (
          < tr >
            <td>
                <img className='team-flag'
                src={bowler.player.display_picture_url}
                alt='noImage' />
                
                <span className='batsman-bowler-name'>
                     {bowler.player.name}
                </span>

            </td>

            <td>{bowler.bowler.overs_bowled}</td>
            <td>{bowler.bowler.overs_maiden}</td>
            <td>{bowler.bowler.runs_given}</td>
            <td>{bowler.bowler.wickets_taken}</td>

            <td>{this.renderBowlerAverage(
              bowler.bowler.runs_given,
              bowler.bowler.overs_bowled)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  renderFallOfWickets = inning => (
    <div>
      <table className='table table-striped table-condensed table-hover table-borderless rank-table'>
            <thead>
              <tr>
                <th>FALL OF WICKETS </th>
                <th>WKT</th>
                <th>AT SCR</th>
                <th>AT OVR</th>
              </tr>
            </thead>
            <tbody>
                {inning.falls_of_wickets.map((wicket, i) => (
                  <tr key={i}>
                        <td>
                              <img
                                className="team-flag"
                                src={wicket.out_batsman.player.display_picture_url}
                                alt="noImage" />
                              <span className='batsman-bowler-name'>
                                  {wicket.out_batsman.player.name} {'-'}
                              </span>
                              <span className='numbers'>
                                  {wicket.out_batsman.batsman.runs_scored}
                              </span>
                              <span>
                                  {' Runs'}
                              </span>
                              <br />
                              {' '}
                              <span className='details'>
                                  {wicket.out_batsman.batsman.out_details}
                              </span>
                        </td>

                        <td> {wicket.wicket_order} </td> 
                        <td>{wicket.team_score}</td>
                        <td>{wicket.ball}</td>

                  </tr>
                ))}
          </tbody>
      </table>
    </div>
  );

  render() {
    const { error, isLoaded, seriesData } = this.state;

    if (error) {
      return <div> Error : {error.message}</div>;
    } else if (!isLoaded) {
      return (<Loading />);
    } else {
      return (
        <div>
          <div>
             {seriesData.innings.map((inning, i) => (
              <div key={i}>
                <table className="table table-striped table-condensed table-hover table-borderless rank-table">
                  <thead>
                    <tr>
                      <th>BATSMEN</th>
                      <th>R</th>
                      <th>B</th>
                      <th>4s</th>
                      <th>6s</th>
                      <th>SR</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.renderBattingScoreCard(inning)}
                  </tbody>
                </table>

                 <div>
                   <span className='other-labels'>
                     {'EXTRAS'}
                   </span>
                   {"   ( b"}
                   <span className='numbers'>{inning.extra_bye} </span>
                   {" lb"}  <span className='numbers'>{inning.extra_leg_bye}</span>
                   {" nb"} <span className='numbers'>{inning.no_ball}</span>
                   {" wd"} <span className='numbers'>{inning.wide_ball}</span>
                   {")"}
                   <br />

                   
                     <span className='other-labels' style={{ paddingRight: 10 + 'px' }}>
                       {'TOTAL'}
                     </span>
                     {'('}
                     <span className='numbers'> {inning.runs} </span>
                     {"Runs for the Loss of "}

                     <span className='numbers'> {inning.wickets} </span>
                     {" Wickets, AVG Run rate : "}

                     <span className='numbers'> {inning.run_rate} </span>
                     {' )'}
                 </div> <br/>
                
                  <div>
                      {this.renderBowlingScoreCard(inning)}
                  </div>
                
                  <div> 
                      {this.renderFallOfWickets(inning)} 
                  </div>
              </div>
             ))}
          </div>
        </div>
      );
    }
  }
}

export default ScoreCard;