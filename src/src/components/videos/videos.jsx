import React,
{ Component } from 'react';
import config from "../../config.json";
import {
  NavLink,
  Route,
  Switch
} from 'react-router-dom';

import AllVideos from './allVideos';
import Featured from './featured';
import Archives from './archives';
import VideoPlayer from '../../components/common/VideoPlayer';

import '../../assets/css/videos/videos.css';

import '../../assets/css/common/shortMenu.css';


class Videos extends Component {
  constructor(props) {
    super(props);
 
    const {match} =  this.props;

    this.state = {
      error: null,
      isLoaded: false,
      isLoading: false,
      hasMore: true,
      seriesData: [],
      selectedType: '',
      baseUrl: "https://back.cricwick.net/api/v1",
      page: 1,
      perPage: 5,
      telco: config.telco,
      video: [],
      tag_id: 27,
      video_id: "",
      title: "",
      matchDesc: "",
      isActive : 'all',
    };
  }

  componentWillReceiveProps = async nextProps => {
    //console.log('component Will Recevie Props NextProps :', nextProps.viewable_id , nextProps.tag_id  );
 
    console.log("videos : ", nextProps.match.url);
    let isActive = '';

    if(nextProps.match.url === "/videos"){
         isActive='all';
    }
  
    console.log(isActive);

    await this.setState(() => {
      return {
        selectedType: nextProps.selectedType,
        video: nextProps.video,
        isActive:isActive
      };
    });
    // await this.handleClick(nextProps.video)
  };

  handleClick = selectedType => {
    if (!selectedType) {
      this.setState(() => {
        return { selectedType: "All_Videos" };
      });
    } else {
      this.setState(() => {
        return { selectedType: selectedType };
      });
    }
  };

  render() {
    const { match } = this.props;
    const {isActive} = this.state; 
    return (

      <div>
        <div className='card card-block pl-2 pt-3 pb-3 mb-1'>
          {/* <h6 className='menu-buttons-title-heading'>{seriesData.match.series.title}</h6> */}
          
          <span className='short-menu-buttons'>
            <NavLink exact className='btn btn-default'
              to={`${match.url}`}
              activeClassName={isActive==="all" ? "short-menu-active" : "short-menu-active"}>All Videos     </NavLink>

            <NavLink className='btn btn-default'
              to={`${match.url}/featured`}
              activeClassName="short-menu-active">Featured       </NavLink>

            <NavLink className='btn btn-default'
              to={`${match.url}/archives`}
              activeClassName="short-menu-active">Archives       </NavLink>
          </span>
          </div>
             
           <div>
            <Route exact
                  path={`${match.url}`} 
                  render={(props) => <AllVideos {...props} selectedType="All_Videos" />}
            />
    

    
           </div>  
           <div>
       </div>
      </div>

    );
  }
  //----------------------------------------------------------------------
}

export default Videos;

/* <Route 
path={`${match.url}/archives/:id`}
render={(props) => (
  <div>
    <VideoPlayer {...props} id={props.match.params.id}
      showControlls={true}
      width='100%'
      height='100%' />
    <div>
      <Archives {...props} selectedType="Archives" />
    </div>
  </div>
)}
/> */
/* <Route 
path={`${match.url}/videos/:id`}
render={(props) => (
  <div>
    <VideoPlayer {...props} id={props.match.params.id}
      showControlls={true}
      width='100%'
      height='100%' />
    <div>
      <AllVideos {...props} selectedType="All_Videos" />
    </div>
  </div>
)}
/> */
//  <Route path={`${match.url}/:name`}
// render={({ props }) => (
//   <div>

//     <h6>{this.props.params.name}</h6>
    /* { match.params.name  === "archives" &&
      <Archives {...props} selectedType="Archives" />
    
    {match.params.name === "featured" &&
       <Featured {...props} selectedType="Featured" />
    } 
//   </div>
// )}
// />

// <Route exact
// path={`${match.url}`}
// render={(props) => <AllVideos {...props} selectedType="All_Videos" />}
// />
// </Switch> */



//========================


{/* <Switch>
<Route exact path={`/videos/archives`}
  render={(props) => (
        <Archives {...props} selectedType="Archives" />
  )}
/>

<Route exact path={`/videos/featured`}
render={(props) => (
  <Featured {...props} selectedType="Featured" />
)}
/>

<Route exact path={`${match.url}/:id`}
render={(props) => (
  <div>
    <VideoPlayer {...match} id={props.match.params.id}
      showControlls={true}
      width='100%'
      height='100%' />
  
    <AllVideos selectedType="videos" id={props.match.params.id} />
</div>
)}
/>

<Route exact
path={`${match.url}`}
render={(props) => <AllVideos {...props} selectedType="All_Videos" />}
/>
</Switch> */}
