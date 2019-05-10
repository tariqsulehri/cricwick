import React, { Component } from 'react';
import http from 'superagent';
import Loading from '../common/loading';
import '../../assets/css/summary/squad.css';

class MatchSquads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            team_id : '',
            match_id:'',
            hasMore: true,
            seriesData: [],
            over: null,
            selectedType: 'summary', 
            baseUrl: 'https://back.cricwick.net/api',
        };

    }


    componentDidMount = async ()=> {
        const { match } = this.props;
        await this.loadSeriesRecords(match.team_1_id, match.id);
    }

    loadSeriesRecords = async (team_id, match_id) => {
        const { baseUrl } = this.state;


        // console.log("Match from Parent Object : " , match);
        // https://back.cricwick.net/api/1107/2409/squad
        //Home Series Api  

        const Url = baseUrl
            + '/'
            + team_id
            + '/'
            + match_id
            + '/'
            + 'squad'

        console.log(Url);

        http
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState(()=>{
                    return{
                        isLoaded: true,
                        isLoading: false,
                        seriesData: res.body,
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
    }

    handleClick = (team_id, match_id) => {
          this.setState( ()=> { return { team_id: team_id, match_id: match_id} });
          this.loadSeriesRecords(team_id, match_id);
    }

   
    renderSquad = (ObjectSelectedSquad) => (
        <div className=''> 
          {ObjectSelectedSquad.map((player, i)=>(
               <div key={i} className="card border-light shadow-sm bg-white rounded  mycard p-1 text-center">
                                <img
                                className="playerImage"
                                src={player.player.display_picture_url}
                                alt="noImage"
                                />

                   <div className="card-body p-1">
                       <span className='player-name'> 
                            {player.player.name}
                       </span>
                     
                      {player.is_captain &&
                          <span className='captain'>
                              {" - C"}
                          </span>
                      }
                      
                       <br/>
                       {/* {player.is_wicket_keeper &&
                       <span className='player-role'> {"Wicket Keeper & "} </span>
                       } */}
                       <span className='player-role'>{player.player.playing_role}</span><br/>
                       <span className='player-role'>{player.player.batting_hand}</span>
                       <br />
                   </div>
               </div>
          ))}
        </div>
    )


    render() {
        // console.log(match.id);
        // console.log(match.team_1_id,match.teamA.name);
        // console.log(match.team_2_id, match.teamB.name);
        const { error, isLoaded, seriesData} = this.state;
        const {match} = this.props;
       
        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading/>);
        } else {
            return (
                <div>
                   <div className=' card border-light shadow-sm bg-white rounded p-2 mb-2' >
                       <span className='short-menu-buttons'>
                            <button className='btn btn-default' onClick={() => this.handleClick(match.team_1_id, match.id)} >{match.teamA.name}</button>
                            <button className='btn btn-default' onClick={() => this.handleClick(match.team_2_id, match.id)}>{match.teamB.name}</button>
                        </span>
                    </div>

                    <div className='card-columns'>
                        {this.renderSquad(seriesData)}
                    </div>

                </div>
            );
        }
    }
}

export default MatchSquads;