import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingSidepanel from '../common/loadingSidepanel'
import '../../assets/css/home/homeLeftPanel.css';
import { Offline, Online } from "react-detect-offline";

class HomeLeftPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: true,
            page: 1,
            telco: 'mobilink',
            featuredSeries: []
        }

    }

    updateIndicator = () => {
        console.log("Status......")
    }

    componentDidMount() {
        await this.getRecords();
        console.log("after get records...");
        if (error) {
            for (let i = 0; i < 5; i++) {
                console.log("Error : ", i);
            }
        }
    }

    getRecords = () => {
        fetch("http://back.cricwick.net/api/v2/series/featured")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(() => {
                        return {
                            isLoaded: true,
                            isLoading: false,
                            featuredSeries: result
                        }
                    });
                },

                // Handling Erro
                (error) => {
                    this.setState(() => {
                        return {
                            isLoaded: true,
                            error
                        }
                    });
                }
            )

    }


    render() {
        const { error, isLoaded, featuredSeries } = this.state;

        if (!isLoaded) {
            return (<LoadingSidepanel />)
        } else if (error) {
            return (<div> error : {error} </div>)
        } else {
            return (
                <div>
                    <div>
                        <Offline>This is Offline</Offline>
                        <Online>This is online</Online>
                    </div>
                    <div className="card border-light shadow-sm bg-white rounded p-2">
                        <h6 className="card-header">Featured Series</h6>
                        <div className='card-body p-0 pb-1'>
                            <ul className='list-group pt-1'>
                                {featuredSeries.featured_series.map(series => (
                                    <li key={series.id} className='list-group-item'>
                                        <NavLink to={`/series/${series.id}/${series.title.replace(/\s+/g, '-')}`}>
                                            {series.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default HomeLeftPanel