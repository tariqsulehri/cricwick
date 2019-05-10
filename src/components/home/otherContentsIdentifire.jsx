import React, { Component }      from "react";
import {Link}                    from "react-router-dom";
import OtherVideoCardLink        from "../videos/otherVideoCardLink.jsx";
import OtherVideoCardLargeLink   from "../videos/otherVideoCardLargeLink.jsx";
import "../../assets/css/home/genericHome.css";


class OtherContentsIdentifire extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick=(video) =>{


  } 

  render() {
    const { contents, typeVideo, series} = this.props;
    let subType = contents.sub_type;

    if (!contents.data) 
        return( <div> {" "} {contents.title}{" "} </div>);

    if (typeVideo === "video") {
      return( 
            <div>
              {contents.data.map((video , i) => (
                <Link key={i} to={`/series/${series.id}/${series.short_name}/videos/${video.id}`}>
                      <OtherVideoCardLink video={video} selectedType={'Archives'} left_Col={3} right_Col={9}/> 
                </Link>
              ))}
            </div>
      )
    }

    if (subType === "video") {
      return (
            <div>
                {contents.data.map((video, i) => (
                   <Link key={i} to={`/series/${series.id}/${series.short_name}/videos/${video.id}`}>
                        <OtherVideoCardLargeLink key={i} video={video} selectedType={'Featured'} left_Col={3} right_Col={9}/>
                  </Link>
                ))}
            </div> 
      );
    }

    if (subType === "news") {
      return <div>
        {contents.data.map(news => (
          <div key={news.id} className="card border-light shadow-sm bg-white rounded mb-2">
           <Link to={`/stories/news/${news.id}`}>
            <div className="card-body p-3">
              <div className='video-card-image-size-large'>
                <img src={news.image}
                  alt="no Iamge"
                />
              </div>

              <div className="cardsmall-col-heading-black">
                {news.title} 
              </div>

            </div>
             </Link> 
          </div>
        ))}
      </div>;
    }

    //======================= End Articles =====================================
    if (subType === "article") {
      return <div>
        {contents.data.map(article => (
          <div key={article.id} className="card border-light shadow-sm bg-white rounded mb-2">
            <Link to={`/stories/articles/${article.id}`}>
              <div className="card-body p-3 pb-0">

                <div className='video-card-image-size-large'>
                  <img src={article.image}
                    alt="no Iamge"
                  />
                </div>

                <div className="cardsmall-col-heading-black">
                  {article.title} 
              </div>

                {/* <h6 style={{ fontWeight: "normal" }}>
                        {Moment(new Date(news.created_at)).format("DD MMM, YYYY")}
                      </h6> */}
              </div>
            </Link>
          </div>
        ))}
      </div>;
    }
    //------------------------------- End Articles ----------------------------
  }
}

export default OtherContentsIdentifire;
