import React from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../assets/css/common/videoCards.css'


library.add(faPlayCircle);


const Videos = (props) => {
  const { match } = props;

  console.log(match);

  if (match.length <= 0) {
    return (<div></div>)
  } else {

    return (
      <div>
        {match.map((video, i) => (
          <div key={i}>
            {i === 0 &&
              <div className='card mb-1 p-4 pb-0'>
                <Link to={`/series/${video.match_obj.series_id}/${video.match_obj.series_short_name}/videos/${video.id}`}>
                  <div className='video-card-image-size-large'>
                    <img src={video.med_image} alt="no Iamge" />
                    <div className='play-button'>
                      <FontAwesomeIcon color="white"
                        icon={"play-circle"}
                        size="6x" />
                    </div>
                  </div>

                  <div className="cards-big-videocard-heading">
                    {video.title}
                  </div>
                </Link>
              </div>
            }

            {i > 0 &&
              <div key={video.id} className="flex-d">
                <div className="card mb-1 p-0">
                  <Link to={`/series/${video.match_obj.series_id}/${video.match_obj.series_short_name}/videos/${video.id}`}>
                    <div className="card-body p-3">
                      <div className='container'>
                        <div className='row'>

                          <div className='col-3 card-col-for-image'>
                            <img className='card-image-small'
                              src={video.med_image}
                              alt="no Iamge"
                            />

                            <div className='play-button-small'>
                              <FontAwesomeIcon color="white"
                                icon={"play-circle"}
                                size="4x"
                              />
                            </div>
                          </div>

                          <div className='col-9 card-col-for-text'>
                            <h6 className="cardsmall-col-heading-black" >
                              {video.title}
                            </h6>
                            <h6 className='cardsmall-col-sub-heading-gray'>
                              {video.match_desc}
                            </h6>
                          </div>

                        </div>

                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            }
          </div>
        ))}
      </div>
    )
  }
}

export default Videos;