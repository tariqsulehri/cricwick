import React, { Component } from 'react';
import http from 'superagent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Loading from '../common/loading';
import '../../assets/css/summary/summary.css';

class ScoreCard extends Component {
  constructor(props) {
    super(props);

    const { match_id } = this.props;

    this.state = {
      error: null,
      isLoaded: false,
      isLoading: false,
      hasMore: true,
      seriesData: [],
      match_id: match_id,
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

    const Url = `${baseUrl}/${match_id}`;

    console.log(Url);
    //console.log(hasMore);

    http
      .get(Url)
      .set("Accept", "application/json")
      .then(res => {
        this.setState(() => {
          return {
            isLoaded: true,
            isLoading: false,
            seriesData: res.body
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
  };

  renderBattingScoreCard = inning => (
    inning.batting_scorecard.map((score, i) => (
      <tr key={i}>
        <td style={{ textAlign: 'left' }}>
          <img
            className="team-flag"
            src={score.player.full_display_picture_url}
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
          <th style={{ textAlign: 'left' }}>BOWLERS</th>
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
          < tr key={i}>
            <td style={{ textAlign: 'left' }}>
              <img className='team-flag'
                src={bowler.player.full_display_picture_url}
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
            <th style={{ textAlign: 'left' }}>FALL OF WICKETS </th>
            <th>WKT</th>
            <th>AT SCR</th>
            <th>AT OVR</th>
          </tr>
        </thead>
        <tbody>
          {inning.falls_of_wickets.map((wicket, i) => (
            <tr key={i}>
              <td style={{ textAlign: 'left' }}>
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

  renderBatting =(inning) =>{
    return (
      <div>
        <table className="table table-striped table-condensed table-hover table-borderless rank-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>BATSMEN</th>
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

       
      </div>
    );
  }

  renderExtras = (inning) => (
    <div className='mb-3'>
      <span className='other-labels'>
        {'EXTRAS'}
      </span>
      <span className='other-labels-small'> {"   ( b"} </span><span className='numbers'>{inning.extra_bye} </span>
      <span className='other-labels-small'> {" lb"}    </span> <span className='numbers'>{inning.extra_leg_bye}</span>
      <span className='other-labels-small'> {" nb"}    </span> <span className='numbers'>{inning.no_ball}</span>
      <span className='other-labels-small'> {" wd"}   </span><span className='numbers'>{inning.wide_ball}</span>
      <span className='other-labels-small'>{")"}</span>
      <br />
      <span className='other-labels' style={{ paddingRight: 10 + 'px' }}>
        {'TOTAL'}
      </span>
      <span className='other-labels-small'>{'('}</span>{'('}
      <span className='numbers'> {inning.runs}  </span>
      <span className='other-labels-small'> {"Runs for the Loss of "} </span>

      <span className='numbers'> {inning.wickets} </span>
      <span className='other-labels-small'> {" Wickets, AVG Run rate : "} </span>

      <span className='numbers'> {inning.run_rate} </span>
      <span className='other-labels-small'> {' )'} </span>
    </div>
  );

  renderTeam=(batting_team_id)=>{
    const team1 = this.state.seriesData.team_1.team.name;
    const team2 = this.state.seriesData.team_2.team.name;
    console.log(batting_team_id);
    if (this.state.seriesData.team_1_id === batting_team_id) { return  team1 }
    if (this.state.seriesData.team_2_id === batting_team_id) { return  team2 }
  }

  render() {
    const { error, isLoaded, seriesData } = this.state;
    console.log(seriesData);

    if (error) {
      return <div> Error : {error.message}</div>;
    } else if (!isLoaded) {
      return (<Loading />);
    } else {
      return (
        <div>
          {seriesData.innings.map((inning, i) => (
            <div key={i}>
              <div className="accordion md-accordion" id={`ex${inning.id}`} role="tablist" aria-multiselectable="true">
                <div className='card border-light shadow-sm bg-white rounded p-2 mb-2'>
                  <div className="card-header border-0 bg-white pl-0 pr-0" role="tab" id={`h${inning.id}`}>
                    <a data-toggle="collapse" data-parent={`#ex${inning.id}`} href={`#col${inning.id}`} aria-expanded="true"
                      aria-controls={`col${inning.id}`}>
                      <h4 className="cardsmall-col-heading-black pb-2 mb-0">
                             {this.renderTeam(inning.batting_team_id)}
                              <span style={{float:'right'}}>
                               <FontAwesomeIcon className="faAngleDown" icon={faChevronDown} transform={{ rotate: 180 }}/>
                             </span>
                      </h4>
                    </a>
                  </div>

                  <div id={`col${inning.id}`} className="collapse show" role="tabpanel" aria-labelledby={`h${inning.id}`} data-parent={`#ex${inning.id}`}>
                    <div className="card card-body border-0 p-0">
                       <div>
                        {this.renderBatting(inning)}
                        {this.renderExtras(inning)}
                       </div>
                      <div>
                        {this.renderBowlingScoreCard(inning)}
                      </div>

                      <div>
                        {this.renderFallOfWickets(inning)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}


export default ScoreCard;



