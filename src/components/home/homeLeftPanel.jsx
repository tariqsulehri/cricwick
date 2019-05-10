import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingSidepanel from '../common/loadingSidepanel'
import '../../assets/css/home/homeLeftPanel.css';

class HomeLeftPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            page:1,
            telco:'mobilink',
            featuredSeries: []
        }

    }

    componentDidMount() {
        fetch("http://back.cricwick.net/api/v2/series/featured")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(() => {
                        return {
                            isLoaded: true,
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
        const { error, isLoaded, featuredSeries} = this.state;

       if (!isLoaded) {
            return (<LoadingSidepanel />)
        } else if (error) {
            return (<div> error : {error.message} </div>)
        } else {
            return (
                <div>
                    <div className="card border-light shadow-sm bg-white rounded p-2">
                        <h6 className="card-header">Featured Series</h6>
                        <div className='card-body p-0 pb-1'>
                            <ul className='list-group pt-1'>
                                {featuredSeries.featured_series.map(series => (
                                    <li key={series.id} className='list-group-item'>
                                        <NavLink  to={`/series/${series.id}/${series.title.replace(/\s+/g,'-')}`}> 
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