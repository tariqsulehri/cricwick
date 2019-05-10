import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom'
import '../../assets/css/common/articles.css';

const Articles = (props) => {

  const { match, left_Col, right_Col } = props;
  let _match = match;
  
  return (
        <div className="flex-d">
          <Link to={{
            pathname: `/stories/articles/${_match.id}`,
            state: {
              objSelectedStory: _match,
              selectedType: 'Articles',
              showFull: true
            }
          }}>

            <div className="card border-light shadow-sm bg-white rounded mb-2 p-0">
              <div className="card-body p-2">

                <div className='container'>
                  <div className='row'>

                    <div className={`col-${left_Col} card-col-for-text`}>
                      <h4 className="article-cardsmall-col-heading-black" >
                        {_match.title}
                      </h4>
                      <h6 className='article-cardsmall-col-sub-heading-gray'>
                        {Moment(new Date(_match.created_at)).format("DD MMM, YYYY")}
                      </h6>
                    </div>

                    <div className={`col-${right_Col} card-col-for-image`}>
                      <img
                        className="article-card-image-small"
                        src={_match.image}
                        alt="no Iamge"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </Link>
        </div>
  );
}

export default Articles;