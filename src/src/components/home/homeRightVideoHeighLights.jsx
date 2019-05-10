import React, { Component } from 'react';
import LoadingSidepanel from '../common/loadingSidepanel';
import XsVideoCardLink from '../common/xsVideoCardLink';
import {NavLink, Route} from 'react-router-dom';

class HomeRightVideoHeighLights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            videoHeighLights: [],
        };
    }

    componentDidMount() {

        fetch("https://back.cricwick.net/api/v1/user_api/home_videos?telco=mobilink")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(() => {
                        return {
                            isLoaded: true,
                            videoHeighLights: result
                        }
                    });
                },

                // Handling Erro
                (error) => {
                    this.setState(() => {
                        return {
                            isLoaded: true,
                            error
                        }
                    });
                }
            )
    }

    render() {
        const { videoHeighLights, error, isLoaded } = this.state;
        
        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<LoadingSidepanel />);
        } else {

            return (
                <div>
                    <h6 className='cards-top-heading-black'>VIDEOS HEIGHLIGHTS</h6>
                    <hr className='hr-line' />
                    {videoHeighLights.timeline_videos.map((video, i) => (
                         <NavLink key={i} to={`/videos/${video.id}`}>
                             <XsVideoCardLink key={i} video={video} left_Col={5} right_Col={7} />
                         </NavLink>
                    ))}
          
                </div>
            );
        }
    }
}

export default HomeRightVideoHeighLights;

