import React from 'react';
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlayCircle);

function VideoCardLink(props) {
    const { video, left_Col, right_Col } = props;

    return (
        <div className="flex-d">
            <div className="card border-light shadow bg-white rounded mb-1 p-0">
                <div className="card-body p-2">
                    {/* <Link to={{
                        pathname: '/leftPanel',
                        state: {
                            viewable_id: video.match_obj.series_id,
                            selectedType: 'videos',
                            tag_id: 27,
                            video_id: video.id,
                            video: video
                        }
                    }}> */}

                        <div className="container">
                            <div className="row">
                                <div className={`col-${left_Col} card-col-for-image`} >
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

                                    <h6 className="cardsmall-col-sub-heading-gray">
                                        {video.title}
                                    </h6>

                                    <h6 className="cardsmall-col-sub-heading-gray">
                                        {Moment(new Date(video.created_at)).format("DD MMM,YYYY")}
                                    </h6>

                                    <h6 className="cardsmall-col-bodytext-black">
                                        {video.match_desc} 
                                    </h6>
                                </div>

                            </div>
                        </div>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
}

export default VideoCardLink; 
