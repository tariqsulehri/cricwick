import React, { Component } from "react";
import Moment from "moment";
import "../../assets/css/common/scheduledMatches.css";

class ScheduleMatches extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderMatchTeamATag(match) {
        // innings_order = 1, 2, 3, 4
        // batting_team_id':  702,703
        // fielding_team_id': 703,702
        // inning.wickets, inning.run, inning.overs

        let scoreString = "";
        const teamA = match.team_1_id;

        //console.log( 'A ' ,teamA);
        //console.log( 'Innings ' , match);

        if (!match.innings) {
            //console.log('Team=>(A) not yet Played...');
            return "";
        }

        const maxInning = match.innings.length;

        const innings = match.innings.filter(x => x.batting_team_id === teamA);

        innings.map((inning, inningCNT) => {
            if (match.format === "T20" || match.format === "ODI") {
                scoreString +=
                    (inningCNT > 0 ? " & " : "") +
                    inning.runs +
                    (inning.wickets < 10 ? "/" + inning.wickets : "") +
                    (inning.declared ? "d" : "") +
                    (maxInning === inning.innings_order ? " (" + inning.overs + ")" : "");
            } else {
                scoreString +=
                    (inningCNT > 0 ? " & " : "") +
                    inning.runs +
                    (inning.wickets < 10 ? "/" + inning.wickets : "") +
                    (inning.declared ? "d" : "") +
                    (maxInning === inning.innings_order ? " (" + inning.overs + ")" : "");
            }

            return "scoreString";
        });

        //console.log(scoreString);

        return scoreString;
    }

    renderMatchTeamBTag(match) {
        // innings_order = 1, 2, 3, 4
        // batting_team_id':  702,703
        // fielding_team_id': 703,702
        // inning.wickets, inning.run, inning.overs

        let scoreString = "";
        const teamB = match.team_2_id;

        if (!match.innings) {
            //console.log('Team=>(B) not yet Played...');
            return "";
        }

        const maxInning = match.innings.length;
        const innings = match.innings.filter(x => x.batting_team_id === teamB);

        innings.map((inning, inningCNT) => {
            if (match.format === "T20" || match.format === "ODI") {
                scoreString +=
                    (inningCNT > 0 ? " & " : "") +
                    inning.runs +
        (inning.wickets < 10 ? "/" + inning.wickets : "") +
                    (inning.declared ? "d" : "") +
                    (maxInning === inning.innings_order ? " (" + inning.overs + ")" : "");
            } else {
                scoreString +=
                    (inningCNT > 0 ? " & " : "") +
                    inning.runs +
                    (inning.wickets < 10 ? "/" + inning.wickets : "") +
                    (inning.declared ? "d" : "") +
                    (maxInning === inning.innings_order ? " (" + inning.overs + ")" : "");
            }

            return "scoreString";
        });

        return scoreString;
    }

    //This Method Change Color on the basic of Match Status if Live it will be red
    headerTextMatchStatusClass = status => {
        const isClass =
            status === "Live"
                ? "sh-header-text-match-status-live"
                : "sh-header-text-match-status-normal";
        return isClass;
    };

    //This method return the MATCH_STATUS text if the break type is Empty Otherwize return BREAK_TYPE.
    renderMatchStatusAtHeader(match) {
        let tagText = "";

        if (match.match_state === "Scheduled") {
            tagText = "Upcomming";
            return tagText;
        }

        if (match.break_type === "") {
            tagText = (match.match_state === 'Live' ? match.match_state : '');
        } else {
            tagText = match.break_type;
        }
        return tagText;
    }
    //-------------------------------------------------------------------------------------------------

    renderUpcommingDate = match => {
        let dateTimeString = "";

        if (match.match_state === "Scheduled") {
            dateTimeString =
                " " + Moment(new Date(match.match_start)).format("DD MMM, YYYY");
        } else {
            dateTimeString = "";
        }

        return dateTimeString;
    };

    renderUpcommingTime = match => {
        let dateTimeString = "";

        if (match.match_state === "Scheduled") {
            dateTimeString =
                " " + Moment(new Date(match.match_start)).format("hh:mm a");
        } else {
            dateTimeString = "";
        }

        return dateTimeString;
    };

    render() {
        const { match } = this.props;

        // match_state: 'Over', detail: 'South Africa won by 6 wickets'

        return (
            <div>
                <div id="center-div" style={{ width: 100 + "%", textAlign: 'left', verticalAlign: 'top' }}>

                    {/* Show Result if Match Finished Display Result */}
                    <h6 className='sh-header-text-match-status-live'>
                        {match.match_state === 'Over' ? ' Result' : ''}
                    </h6>

                    {/* Following Code Render Live and Scheduled Matched */}
                    {/* It Will Show Upcomming instead of Scheduled */}
                    <h6 className={this.headerTextMatchStatusClass(match.match_state)} style={{ float: 'right' }}>
                        {this.renderMatchStatusAtHeader(match)}
                    </h6>

                    <span className="sh-header-text-match">
                        {match.title}
                    </span>
                    {", "}
                    <span className="sh-header-text-match" style={{ color: "Gray" }}>
                        {match.venue.title}
                    </span>{" "}

                    {/* Match Status/Result on the basic of match_state='Over' show Result Status */}

                    <span className="sh-match-date">
                        {this.renderUpcommingDate(match)}
                    </span>
                    {match.match_state !== 'Over' && <br />}
                    <span className="sh-match-time">
                        {this.renderUpcommingTime(match)}
                    </span>
                    {match.match_state !== 'Over' && <br />}

                </div>

                <div id="left-div" className="flex-container" style={{ display: "flex" }}>
                    <div style={{ width: 50 + "%", textAlign: 'center' }}>

                        {/* Following Code Render Flag of Team A */}
                        <img className="sh-header-flag-image" style={{ width: 60 + "px", height: 60 + "px" }}
                            src={match.team_1.team.flag_url} alt="no Iamge" />{" "}  <br />

                        {/* Following Code Render Score team A */}
                        <h6 id="teamA-short-name" className="sh-header-text-teams-shortname" style={{marginBottom:0+'px'}}>
                            {match.team_1.team.name}
                        </h6>
                        <h6 className="sh-header-text-teama-score">
                            {this.renderMatchTeamATag(match)}
                        </h6>

                    </div>

                    {/* Following DIVISION for team B */}

                    <div id="right-div" style={{ width: 50 + "%", textAlign: 'center' }}>
                        {/* Following Code Render Flags of team B */}
                        <img
                            className="sh-header-flag-image"
                            style={{ width: 60 + "px", height: 60 + "px" }}
                            src={match.team_2.team.flag_url}
                            alt="no Iamge"
                        />
                        <h6 className="sh-header-text-teams-shortname" style={{marginBottom: 0 + 'px'}}>
                            {match.team_2.team.name}
                        </h6>
                        {/* Following Code Render Score team B */}
                        <h6 className="sh-header-text-teama-score">
                            {this.renderMatchTeamBTag(match)}
                        </h6>
                    </div>
                </div>

                {/* Match Status/Result on the basic of match_state='Over' show Result Status */}
                <h6 className="sh-footer-text-center-match-status" style={{marginTop:20 + 'px'}} >
                    {match.match_state === "Over" ? match.match_result : ""}
                </h6>
            </div>
        );
    }
}

export default ScheduleMatches;
