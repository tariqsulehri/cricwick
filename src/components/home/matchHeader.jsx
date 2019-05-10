import React, { Component } from "react";
import Moment from 'moment';
import { Link } from 'react-router-dom';
//import HeaderLiveMatch from  './headerLiveMatch';
import '../../assets/css/home/matchHeader.css';


class MatchHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            liveMatches: [],
            selectedClassName: '',
            isLastInning : '',
        };
    }

    componentDidMount() {

        fetch("http://back.cricwick.net/api/v2/main/live_matches")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(()=>{
                        return{
                            isLoaded: true,
                            liveMatches: result
                        }
                    });
                },

                // Handling Erro
                (error) => {
                    this.setState(()=>{
                        return{
                            isLoaded: true,
                            error
                        }
                    });
                }
            )
    }


    headerTextMatchStatusClass = (status) => {
        const isClass = status === 'Live' ? 'header-match-status-live' : 'header-match-status-normal-black';
        return isClass;
    }

    renderMatchTeamATag(match) {

        // innings_order = 1, 2, 3, 4
        // batting_team_id":  702,703 
        // fielding_team_id": 703,702
        // inning.wickets, inning.run, inning.overs  

        let scoreString = '';
        const teamA = match.team_1_id;

        //console.log( "A " ,teamA);
        //console.log( "Innings " , match);
        // header-text-teama-score-active
        // header-text-teama-score

        if (!match.innings) {
            //console.log("Team=>(A) not yet Played...");
            return '';
        }

        const maxInning = match.innings.length;

        const innings = match.innings.filter(x => x.batting_team_id === teamA)


        innings.map((inning, inningCNT) => {

            if (match.format === 'T20' || match.format === 'ODI') {

                scoreString += (inningCNT > 0 ? " & " : '')
                    + inning.runs
                    + (inning.wickets < 10 ? "/" + inning.wickets : '')
                    + (inning.declared ? 'd' : '')
                    + (maxInning === inning.innings_order ? " (" + inning.overs + ")" : '')

            } else {
                scoreString += (inningCNT > 0 ? " & " : '')
                    + inning.runs
                    + (inning.wickets < 10 ? "/" + inning.wickets : '')
                    + (inning.declared ? 'd' : '')
                    + (maxInning === inning.innings_order ? " (" + inning.overs + ")" : '')
            }
            
            // if(maxInning === inning.innings_order){
            //     scoreString += <span className='header-match-last-inning'> ${scoreString} </span>
            // }else{
            //     scoreString += <span> {scoreString} </span>
            // }
            
             console.log(scoreString);
             return '';
        })

        //console.log(scoreString); 
          return  scoreString
    }

    renderMatchTeamBTag(match) {
        // innings_order = 1, 2, 3, 4
        // batting_team_id":  702,703 
        // fielding_team_id": 703,702
        // inning.wickets, inning.run, inning.overs  

        let scoreString = '';
        const teamB = match.team_2_id;

        if (!match.innings) {
            //console.log("Team=>(B) not yet Played...");
            return '';
        }

        const maxInning = match.innings.length;
        const innings = match.innings.filter(x => x.batting_team_id === teamB)

        innings.map((inning, inningCNT) => {
                
            if (match.format === 'T20' || match.format === 'ODI') {

                scoreString += (inningCNT > 0 ? " & " : '')
                    + inning.runs
                    + (inning.wickets < 10 ? "/" + inning.wickets : '')
                    + (inning.declared ? 'd' : '')
                    + (maxInning === inning.innings_order ? " (" + inning.overs + ")" : '')

            } else {
                scoreString += (inningCNT > 0 ? " & " : '')
                    + inning.runs
                    + (inning.wickets < 10 ? "/" + inning.wickets : '')
                    + (inning.declared ? 'd' : '')
                    + (maxInning === inning.innings_order ? " (" + inning.overs + ")" : '')
            }

            return 'scoreString';
        })

        return scoreString;
    }

    //This method return the MATCH_STATUS text if the break type is Empty Otherwize return BREAK_TYPE. 
    renderMatchStatus(match) {
        let tagText = '';

        if (match.match_state === 'Scheduled') {
            return tagText;
        }

        if (match.break_type === "") {
            tagText = <span>
                {match.match_state} <br />
            </span>
        } else {
            tagText = <span style={{ padding: 0 }}>
                {match.break_type}<br />
            </span>
        }
        return tagText;
    }
    //-------------------------------------------------------------------------------------------------

    //This method return the MATCH_STATUS text if the break type is Empty Otherwize return BREAK_TYPE. 
    renderEmptyBreakForHeader(match) {
        let tagText = '';
        if (match.match_state === 'Scheduled') {
            tagText = <span style={{ padding: 0 }}>
                {''} <br/>
            </span>
            return tagText;
        }
    }
    //-------------------------------------------------------------------------------------------------

    //This method COMPOSE DATE UPCOMING DATE depending upon match STATUS. 
    renderUpcommingDate(match) {
        let tagText = '';
        if (match.match_state === 'Scheduled') {
            tagText = <span className='header-match-status-normal-black'>
                {" "} {Moment(new Date(match.match_start)).format("DD MMM")}
                {", "}{Moment(new Date(match.match_start)).format("hh:mm a")}
            </span>
        }
        return tagText;
    }

    //-------------------------------------------------------------------------------------------------

    renderHeaderCardBody = (match) => {

        return (

            <div className="card card-header-scroll p-1 " key={match.id} >
                <div className="header-card-contents">
                    {/* Following Code Render Live and Scheduled Matched */}
                    {/* If Break Type is Empty Then It Will Show  Break Type Otherr Wise MATCH_STATUS */}
                    <span className={this.headerTextMatchStatusClass(match.match_state)}>
                        {this.renderMatchStatus(match)}
                    </span>

                    {/* Following Code Render Header text for Live-Matches */}
                    {/* eg:  Title, Venue, Match Start Date */}
                    
                    <span className='header-match-status-normal-black'>
                         {match.title}, {' at '} 
                    </span> 
  
                    <span className='header-match-status-normal-gray'>
                        {match.venue.title}
                    </span>
  
                    <span>
                        {this.renderUpcommingDate(match)}
                        <br />
                    </span>

                    <span>
                        {this.renderEmptyBreakForHeader(match)}
                    </span>

                    {/* Following Code Render Flags or team A */}
                    <img className='header-flag'
                        src={match.teamA.flag_url} alt="no Iamge" />
                    <span className="header-teams-shortname">
                        {match.teamA.short_name}
                    </span>

                    <span className="header-teams-score">
                        {this.renderMatchTeamATag(match)}
                    </span>
                    <br />

                    {/* Following Code Render Flags or team B */}
                    <img className='header-flag'
                        src={match.teamB.flag_url} alt="no Iamge" />
                    <span className="header-teams-shortname">
                        {match.teamB.short_name}
                    </span>

                    {/* Following Code Render Score team B */}
                    <span className="header-teams-score">
                        {this.renderMatchTeamBTag(match)}
                    </span>

                </div>
            </div>
        );
    }

    render() {
        const { error, isLoaded, liveMatches } = this.state;

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<div> Loading Data.... </div>);
        } else {
            return (
                        <div className="scrolling-wrapper">
                            {liveMatches.live_matches.map((match, i) => (
                                    <span key={match.id}>
                                        {match.match_state !== 'Scheduled'
                                            ?
                                            <Link to={`/match/${match.id}`}>
                                                {this.renderHeaderCardBody(match)}
                                            </Link>
                                            :
                                            this.renderHeaderCardBody(match)}
                                    </span>
                            ))}
                        </div>
            );
        }
    }
}

export default MatchHeader;