import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlayCircle);

function VideoCard(props){
    const {video, left_Col, right_Col} =  props; 
    // console.log(video);
    return (
        <div className="flex-d">
            <div className="card border-light shadow-sm bg-white rounded mb-2 p-0">
                <div className="card-body p-2">
                    <div className="container">
                        <div className="row">
                            <div className= {`col-${left_Col} card-col-for-image`} >
                                <img
                                    className="card-image-small"
                                    src={video.thumb}
                                    alt="no Iamge" />

                                <div className="play-button-small">
                                    <FontAwesomeIcon
                                        color="white"
                                        icon={"play-circle"}
                                        size="4x"
                                    />
                                </div>
                            </div>

                            <div className={`col-${right_Col} card-col-for-text`}>
                                <h6 className="cardsmall-col-heading-black">
                                    {video.title}
                                </h6>
                                <h6 className="cardsmall-col-sub-heading-gray">
                                    {video.match_desc}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoCard; 
