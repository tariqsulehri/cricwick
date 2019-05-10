import React, { Component } from 'react';
import config  from '../../config.json';
import http    from '../../services/httpService'; 
import { Link } from 'react-router-dom';
import LoadingSidepanel from '../common/loadingSidepanel';
import {toast}   from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import '../../assets/css/home/homeLeftPanel.css';

class HomeLeftDownPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            baseUrl: config.apiEndPoint,
            telco  : config.telco,
            updates: []
        }

    }

    componentDidMount = async () => {
         await this.loadSeriesRecords();
    }

    // componentWillUnmount(){
    //   window.removeEventListener('scroll', this.handleScroll);
    // }
    
    loadSeriesRecords = async () => {
        const { page, perPage, baseUrl } = this.state;

        let Url = baseUrl
            + '/'
            + 'news'

        console.log(Url);

        try {
            const { data } = await http.get(Url);
            await this.setState(() => {
                return {
                    isLoaded:   true,
                    isLoading:  false,
                    seriesData: data.data,
                }
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error("Errror : ",ex.response.message);
            }
            this.setState({
                isLoaded: false,
                error: ex,
            });
        } 
     
    }

  render() {
        const { error, isLoaded, seriesData } = this.state;

        if (!isLoaded) {
            return (<LoadingSidepanel />)
        } else if (error) {
            return (<div> error : {error.message} </div>)
        } else {
            return (
                <div>
                     {/* <div className="card border-light shadow-sm bg-white rounded p-2">
                        <h6 className="card-header">Latest Updates</h6>
                        <div className='card-body p-0 pb-1'>
                            <ul className='list-group pt-1'>
                                {seriesData.slice(0, 6).map((update, i) => (
                                    <li key={i} className='list-group-item'>
                                        <Link  to={`/stories/${'news'}/${update.id}`} >
                                            {update.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div> */}
              </div>
            );
        }
    }
}

export default HomeLeftDownPanel;


// <div className="card card-block p-2">
// <h6 className="card-header p-1">Featured Series</h6>
// <div className='card-body p-0 pb-1'>
//  <ul className='list-group pt-1'>