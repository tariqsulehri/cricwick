import React, { Component } from 'react';
import Moment from 'moment';
import '../../assets/css/home/homeCenterPanel.css';

class RenderMatch extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    renderMatchTeamATag(match) {
        // innings_order = 1, 2, 3, 4
        // batting_team_id':  702,703 
        // fielding_team_id': 703,702
        // inning.wickets, inning.run, inning.overs  

        let scoreString = '';
        const teamA = match.team_1_id;
        
        //console.log( 'A ' ,teamA);
        //console.log( 'Innings ' , match);

        if(!match.innings){
            //console.log('Team=>(A) not yet Played...');
            return '';
        }

        const maxInning =  match.innings.length; 

        const innings =  match.innings.filter(x => x.batting_team_id === teamA)
     
     
        innings.map((inning, inningCNT) => {

            if (match.format === 'T20' || match.format === 'ODI') {
               
                scoreString += (inningCNT > 0 ? ' & ' : '')
                    + inning.runs  
                    + (inning.wickets < 10 ?  '/' + inning.wickets : '')  
                    + (inning.declared ? 'd' : '') 
                    + (maxInning === inning.innings_order ? ' (' + inning.overs + ')' : '')

            } else {

                scoreString += (inningCNT > 0 ? ' & ' : '')
                    + inning.runs 
                    + (inning.wickets < 10 ?  '/' + inning.wickets : '')  
                    + (inning.declared ? 'd' : '') 
                    + (maxInning === inning.innings_order ? ' (' + inning.overs + ')' : '')
            }

            return 'scoreString';
        })
      
        //console.log(scoreString); 

        return scoreString;
    }

    renderMatchTeamBTag(match) {
       // innings_order = 1, 2, 3, 4
        // batting_team_id':  702,703 
        // fielding_team_id': 703,702
        // inning.wickets, inning.run, inning.overs  

        let scoreString = '';
        const teamB = match.team_2_id;
        
        if(!match.innings){
            //console.log('Team=>(B) not yet Played...');
            return '';
        }

        const maxInning =  match.innings.length;

        const innings =  match.innings.filter(x => x.batting_team_id === teamB) 

        innings.map((inning, inningCNT) => {

            if (match.format === 'T20' || match.format === 'ODI') {
               
                scoreString += (inningCNT > 0 ? ' & ' : '')
                + inning.runs 
                + (inning.wickets < 10 ?  '/' + inning.wickets : '')  
                + (inning.declared ? 'd' : '') 
                + (maxInning === inning.innings_order ? ' (' + inning.overs + ')' : '')

            } else {
                 scoreString += (inningCNT > 0 ? ' & ' : '')
                    + inning.runs
                    + (inning.wickets < 10 ?  '/' + inning.wickets : '')    
                    + (inning.declared ? 'd' : '') 
                    + (maxInning === inning.innings_order ? ' (' + inning.overs + ')' : '')
            }

            return 'scoreString';
        })
               
        return scoreString;
    }

    //This Method Change Color on the basic of Match Status if Live it will be red
    headerTextMatchStatusClass = (status) => {
        const isClass = status === 'Live' ? 'center-card-match-status-live' : 'center-card-match-status-normal';
        return isClass;
    }

    //This method return the MATCH_STATUS text if the break type is Empty Otherwize return BREAK_TYPE. 
    renderMatchStatusAtHeader(match) {
        let tagText = '';

        if (match.match_state === 'Scheduled') {
            tagText = 'Upcomming'
            return tagText;
        }

        if (match.break_type === '') {
             tagText = match.match_state;
        } else {
             tagText = match.break_type
        }
        return tagText;
    }
    //-------------------------------------------------------------------------------------------------

    renderUpcommingDateTime = (match ) => {
       
        let dateTimeString = '';
        
        if(match.match_state==='Scheduled'){
            dateTimeString = ' ' +  Moment(new Date(match.match_start)).format('DD MMM')
                          + ', ' +  Moment(new Date(match.match_start)).format('hh:mm a')
        }else{
            dateTimeString = '';
        }
        
        return dateTimeString;
    }

    render() {
        const { match} = this.props;
        
        // match_state: 'Over', detail: 'South Africa won by 6 wickets'

        return (
            <div>
                {/* Following Code Render Header text for Live-Matches */}
                {/* eg:  Title, Venue, Match Start Date */}
                <span className='center-card-matchtype'>
                    {match.title}, {' at '}  
                </span>
                
                <span className='center-card-matchtype' style={{ color: 'Gray' }}>
                     {match.venue.title}
                </span>

                 {/* Show Result if Match Finished Display Result */} 
                 <span className='center-card-match-status-live'>
                     {match.match_state==='Over' ? ' Result' : ''}
                 </span> 
                   
                {/* Following Code Render Live and Scheduled Matched */}
                {/* It Will Show Upcomming instead of Scheduled */}
                <span className={this.headerTextMatchStatusClass(match.match_state)}>
                    {this.renderMatchStatusAtHeader(match)}
                </span>  
                <br/>

                {/* Following Code Render Flag of Team A */}
                <img className='center-card-flag-image'
                    src={match.teamA.flag_url} alt='no Iamge' />

                <span className='center-card-teams-shortname'>
                    {match.teamA.short_name}
                </span>

                {/* Following Code Render Score team A */}
                <span className='center-card-teams-score'>
                    {this.renderMatchTeamATag(match)}
                </span>
                <br />

                {/* Following Code Render Flags of team B */}
                <img className='center-card-flag-image'
                    src={match.teamB.flag_url} alt='no Iamge' />
                <span className='center-card-teams-shortname'>
                    {match.teamB.short_name}
                </span>

                {/* Following Code Render Score team B */}
                <span className='center-card-teams-score'>
                    {this.renderMatchTeamBTag(match)}
                </span>

                <br/>
               
                {/* Match Status/Result on the basic of match_state='Over' show Result Status */} 
                {/* Match Status/Result on the basic of match_state='Over' show Result Status */}         
                <p className='footer-text-center-match-status'>
                   {match.match_state==='Over' ? match.detail : ''} 
                   {this.renderUpcommingDateTime(match)}
                </p>
            </div>
        )
    }
}

export default RenderMatch;