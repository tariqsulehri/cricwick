import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlayCircle);

const  XsVideoCardLink = (props) => {
    const { video, left_Col, right_Col } = props;

    return (
        <div className="flex-d">
            <div className="card border-light shadow-sm bg-white rounded mb-2 p-0">
                <div className="card-body p-2">
                        <div className="container">
                            <div className="row">
                                <div className={`col-${left_Col} card-col-for-image`} >
                                    <img
                                        className="card-image-xs"
                                        src={video.thumb}
                                        alt="no Iamge" />

                                    <div className="play-button-small-xs">
                                        <FontAwesomeIcon
                                            color="white"
                                            icon={"play-circle"}
                                            size="3x"
                                        />
                                    </div>
                                </div>

                                <div className={`col-${right_Col} card-xs-col-for-text`}>

                                    <h6 className="cardsmall-col-sub-heading-gray">
                                        {video.match_desc} 
                                    </h6>
                                    <h6 className="card-xsmall-col-bodytext-black">
                                        {video.title.substr(0,45)}
                                        {video.title.length > 45 && " ..."}
                                    </h6>

                                    {/* <h6 className="cardsmall-col-sub-heading-gray">
                                        {Moment(new Date(video.created_at)).format("DD MMM,YYYY")}
                                    </h6> */}

                                </div>

                            </div>
                        </div>
                   
                </div>
            </div>
        </div>
    );
}

export default XsVideoCardLink; 
