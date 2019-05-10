import React from 'react';

const Tweets = props => {
    const { match } = props;


    if (match) {
        return (
            <a href={match.url} target='_blank' rel='noopener noreferrer' >
                <div className='card border-light shadow-sm bg-white rounded mb-1 tweets-card'>
                    <div className='card-body p-3'>
                        <span
                            dangerouslySetInnerHTML={{ __html: match.body }}>
                        </span>
                    </div>
                </div>
            </a>
        );

    } else {
        return (null)
    }
};

export default Tweets; 