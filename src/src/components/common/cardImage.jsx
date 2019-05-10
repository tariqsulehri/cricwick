import React from 'react';
// import '../../assets/css/videos/videos.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

import '../../assets/css/common/videoCards.css';

library.add(faPlayCircle);

const CardImage = (props) => {
    const { image, title, detail } = props;
    return (
        <div className="card border-light shadow-sm bg-white rounded">
            <div className='card-col-for-image'>
                <img
                    className='card-videos-small-as-title'
                    src={image}
                    alt="noImage" />

                <div className="play-button-for-vertical">
                    <FontAwesomeIcon
                        color="white"
                        icon={"play-circle"}
                        size="4x"
                    />
                </div>
            </div>   

            <div className="card-body p-2">
                <span className='cardsmall-col-heading-gray'>
                    {title}
                </span><br />

                <span className='cardsmall-col-bodytext-black'>
                    {detail}
                </span>
            </div>
        </div>
    );
}

export default CardImage;
