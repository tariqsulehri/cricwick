import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faPlayCircle);

function OtherVideoCardLargeLink(props) {
    const {video} = props;

    return (
        <div className="card mb-1 p-0">
                <div className="card-body p-2">
                    <div className="card-body p-2">
                        <div className='video-card-image-size-large'>
                            <img src={video.thumb}
                                alt="no Iamge" />

                            <div className='play-button'>
                                <FontAwesomeIcon color="white"
                                    icon={"play-circle"}
                                    size="6x"
                                />
                            </div>
                        </div>
                        <h4 className="cardsmall-col-heading-black">
                            {video.title}
                        </h4>
                    </div>
                </div>
        </div>
    );
}

export default OtherVideoCardLargeLink; 
