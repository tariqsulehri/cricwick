import React , {Component} from 'react';
//import {TwitterTimelineEmbed} from 'react-twitter-embed';


import '../../assets/css/home/homeRightPanel.css';


//https://css-tricks.com/full-browser-width-bars/

class HomeRightPanel extends Component{
    render(){
         return(
             <div>
                 <div className="card border-light shadow-sm bg-white rounded mb-1">
                     {/* Code for App Download */}
                    <img className="card-img-bottom" 
                         src={require('../../assets/images/app_download.png')} alt='NoImage'/>
                        
                 </div>

                 <div className="card border-light shadow-sm bg-white rounded mb-1">
                     <div className='card-body p-1'>
                         {/* <img class="card-img-top" src="..." alt="Card image cap"></img> */}

                          {/* <TwitterTimelineEmbed
                            sourceType='profile'
                            screenName='TheRealPCB'
                            options={{username:"TheRealPCB", limit:'3' }}
                            onLoad={() => console.log("Timeline is loading")}
                         /> */}

                          <a className="twitter-timeline"
                             href="https://twitter.com/TheRealPCB"
                             data-tweet-limit="3"
                             data-chrome="nofooter noborders transparent noheader">
                             Tweets
                         </a>                     
                     </div>
                 </div>

               
                     
             </div>
         );
    }
}

export default HomeRightPanel;

