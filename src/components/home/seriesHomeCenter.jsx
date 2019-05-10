import React, { Component } from 'react';   
import Match from './match';
import '../../assets/css/home/homeCenterPanel.css';

class SeriesHomeCenter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
             homeSeries : [],
             renderTag : '',
             match:null
         }
    }

    renderMatch = (series) =>{

        if (series.type === 'matches') {
            console.log(series.data)
        }

        if (series.type === 'videos') {
            console.log("Videos");
            // tagText= "this is Videos Object";
        }

        if (series.type === 'news') {
            console.log("news");
        }

        if (series.type === 'articles') {
            console.log("articles");
        }

    }
e
    render() {
        const { homeSeries} = this.props;
          
       return (
            <div> 
                  < Match series={homeSeries} />
            </div>
        )
    }
}

 
export default SeriesHomeCenter;

 
 //http://back.cricwick.net/api/v2/view_lists/get_list_items_from_viewable?viewable_type=series&viewable_id=170&page=1&telco=mobilink