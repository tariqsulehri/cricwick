import React, { Component } from 'react';
import RenderMatch          from './renderMatch';
import {Link}               from 'react-router-dom';
import Articles              from  '../common/articles';
import VideoCardLink        from '../common/videoCardLink';
import VideoCardLarge       from '../common/videoCardLarge';

import '../../assets/css/home/homeCenterPanel.css';
import '../../assets/css/common/videoCards.css';

class SeriesContentsIdentifire extends Component {
    constructor(props) {
        super(props)
        this.state = {
            match: '',
            matchType: '',
        }
    }

    
    
    //----------------------------------------------------------- 
    // This Method Print Series Title on the first card as header. 
    printMatchCardHeader(printSeriesTitle, seriesTitle) {
        if (printSeriesTitle === 0) {
            return <span className="card-title">
                       {seriesTitle}
                       <hr />
                    </span>
        }
        return;
    }


    render() {
        const { match, contentType, printSeriesTitle, seriesTitle, series } = this.props;
        if (contentType === 'matches') {
            return (
              <div>   
                    {match.match_state !== 'Scheduled' &&
                        <Link to={`/match/${match.id}`}>
                            <div className="card border-light shadow-sm bg-white rounded mb-2" style={{ minHeight: 75 + "px" }}>
                                <div className="card-body p-3">
                                    {this.printMatchCardHeader(printSeriesTitle, seriesTitle)}
                                    <RenderMatch match={match} matchType={contentType} />
                                </div>
                            </div>
                        </Link>
                    }

                    {match.match_state === 'Scheduled' &&
                        <div className="card border-light shadow-sm bg-white rounded mb-2" style={{ minHeight: 75 + "px" }}>
                            <div className="card-body p-3">
                                {this.printMatchCardHeader(printSeriesTitle, seriesTitle)}
                                <RenderMatch match={match} matchType={contentType} />
                            </div>
                        </div>
                    }
             </div>  

            );
        }

        if (contentType === 'news') {
            return (
                <div>
                    <ul>
                        <li className='news-list'  key={match.id}>
                            <Link to={{
                                pathname: `/stories/news/${match.id}`,
                                state: {
                                    objSelectedStory: match,
                                    selectedType: 'Latest_News',
                                    showFull: true
                                }
                            }}>

                                {match.title}
                            </Link>
                        </li>
                    </ul>
                </div>
            )
        }

        //-------------------------------------------------------------------------------
        // 1) This Method Print Particular Series video's. the 1st card as Series Videos as header.
        // 2) Further remaining videos as small card image and text Side By Side format.   
        if (contentType === 'videos') {

            if(printSeriesTitle===0){
                return(
                     <Link  to={`/series/${series.id}/${series.short_name}/videos/${match.id}`}>
                        <VideoCardLarge video={match}/>
                    </Link>
                )
            }
            
            if(printSeriesTitle > 0){
                return(
                     <Link to={`/series/${series.id}/${series.short_name}/videos/${match.id}`}>
                        <VideoCardLink video={match} left_Col={3} right_Col={9} />
                    </Link>   
                )
            }

        }
         //-------------------------------------------------------------------------------


        if (contentType === 'article') {
            return (
                 <Articles match={match} left_Col={9} right_Col={3}/> 
            )
        }

        if (contentType === 'tweets') {
            return (
                <a href={match.url} target='_blank' rel='noopener noreferrer' >
                    <div className='card border-light shadow-sm bg-white rounded mb-2 tweets-card'>
                        <div className='card-body p-3'>
                            <span
                                dangerouslySetInnerHTML={{ __html: match.body }}>
                            </span>
                        </div>
                    </div>
                </a>
            )
        }
    }
}

export default SeriesContentsIdentifire;