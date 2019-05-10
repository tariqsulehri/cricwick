import React, { Component } from 'react';   

class Matches extends Component {
   constructor(props){
       super(props)    
       this.state={

       }
   }

    renderMatchTeamBTag(match) {
        let tagText = '';

        // if(!match.innings){
        //    console.log(match.innings)
        //    tagText =  <span></span>
        //    return 
        // }   

        // if (match.innings.length >= 1) {
        //     tagText =
        //         <span>
        //             {match.innings[1].runs}{" "}/{" "}
        //             {match.innings[1].wickets} {" "}
        //             ({match.innings[1].overs})
        //         </span>

        // }
        return tagText;
    }

    renderMatchTeamATag(match) {
        let tagText = '';

        // if(match.innings.length > 0) {
        //   tagText = 
        //   <span> 
        //       {match.innings[0].runs}{ " "}/{ " "}
        //       {match.innings[0].wickets} {" "} 
        //       ({match.innings[0].overs}) 
        //   </span>
        // }

        return tagText;
    }

     render() { 
        const {matches} =  this.props;

        return (
             <React.Fragment>
                <h6>{"Matches"}</h6> 
                {matches.data.map((match,i)=>( 
                    <div className="card card-block mb-1" key={match.id}>
                        {/* Following Code Render Flags or team A */}
                        <img className='header-flag-image' style={{width:25+"px", height:25+"px"}}
                            src={match.teamA.flag_url} alt="no Iamge" />

                        <span className="header-text-teams-shortname">
                            {match.teamA.short_name}
                        </span>

                        <span className="header-text-teama-score">
                            {this.renderMatchTeamBTag(match)}
                        </span>
                    

                        {/* Following Code Render Flags or team B */}
                        <img className='header-flag-image' style={{width:25+"px", height:25+"px"}}
                            src={match.teamB.flag_url} alt="no Iamge" />
                        <span className="header-text-teams-shortname">
                            {match.teamB.short_name}
                        </span>

                        {/* Following Code Render Score team B */}
                        <span className="header-text-teama-score">
                            {this.renderMatchTeamATag(match)}
                        </span>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}
 
export default Matches;