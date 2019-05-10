import React, { Component } from 'react';
import Moment from 'moment';
import Loading from '../common/loading';
import request from 'superagent';
import '../../assets/css/videos/videos.css';
import '../../assets/css/common/videoCards.css';

class DetailedNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            baseUrl: 'https://back.cricwick.net/api',
            page: 1,
            perPage: 5,
            id:    this.props.id,
            selectedType: this.props.selectedType,
            news: [],
            showFull: false
        }

    }

    componentWillMount = async()=>{
    // console.log('component Did Mount (DETAILED NEWS) :',this.state.id, selectedType);
       await this.loadSelectedNews();  
    }

    componentWillReceiveProps=async(nextProps)=>{
        const { id, selectedType } = nextProps;
        console.log("Component Will Receive Props : ",id, selectedType);
        await this.setState(() => {
            return {
                id     : id,
                selectedType: selectedType,
            }
        })
        
        this.loadSelectedNews();
        window.scroll(0,0);
    }

   loadSelectedNews= async() =>{
        const { baseUrl, selectedType, id } = this.state;
         //https://back.cricwick.net/api/news/2113
         
         let Url = baseUrl + `/${selectedType}/` + id             //this.state.id;

     console.log(Url);

     await request
         .get(Url)
         .set('Accept', 'application/json')
         .then(res => {
           this.setState(() => {
                 return {
                     isLoaded  : true,
                     isLoading : false,
                     news      : res.body,
                 }
             });

         })
         .catch(error => {
             this.setState({
                 isLoaded: false,
                 error
             });
         });
    }


    render() {
        const { isLoaded, error, news } = this.state;
        
        console.log("From Detailed News : ",news.id);

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {
            return (
                    <div className="card mb-1 p-2">
                        <div className='card-body p-0'>
                            <div>
                                <img className='video-card-image-size-large'
                                    src={news.image}
                                    alt="no Iamge" />
                            </div>

                            <span
                                className='cardsmall-col-sub-heading-gray'>  {news.by}
                            </span>
                            <h6 className='cardsmall-col-sub-heading-gray' style={{ float: 'right' }}>
                                {Moment(new Date(news.created_at ? news.created_at : news.published)).format("DD MMM,YYYY")}
                            </h6>
                            <h6 className='cards-big-videocard-heading'>  {news.series_name}</h6>
                            <hr />
                            <div className='cards-big-videocard-heading' > {news.title}</div>

                            <p dangerouslySetInnerHTML={{ __html: news.body }} />

                        </div>
                    </div>
            );
        }
    }
}

export default DetailedNews;
