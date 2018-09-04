import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'




class Tweet extends Component {

    handleLike = (event) => {
        event.preventDefault();

        const { dispatch, tweet, authedUser } = this.props;

        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    };

    toParent = (event, id) => {
        event.preventDefault();
        this.props.history.push(`/tweet/${id}`)
    };

    render (){
        const { tweet } = this.props;

        if (tweet === null) {
            return <p>This Tweet doesn't existed</p>
        }


        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet;



        return (
            <Link to={`/tweet/${id}`} className="tweet">
                <img src={avatar}
                     alt={`Avatar of ${name}`}
                     className="avatar"
                />
                <div className="tweet-info">
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className="replying-to" onClick={event => this.toParent(event, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className='tweet-icon'/>
                        <span>{replies !== 0 && replies}</span>
                        <button className="heart-button" onClick={this.handleLike}>
                            {hasLiked === true
                            ? <TiHeartFullOutline color='#e0245e' className="tweet-icon"/>
                            : <TiHeartOutline className="tweet-icon"/>}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}


function mapStateToProps(store, { id }){
    const { authedUser, users, tweets } = store,
        tweet = tweets[id],
        author = users[tweet.author],
        parentTweet = tweet ? tweets[tweet.replyingTo] : null;

    console.log(users[tweet.author]);
    console.log(store);
    return {
        authedUser,
        tweet:  tweet
            ? formatTweet(tweet, author, authedUser, parentTweet )
            : null
    }

}



export default withRouter(connect(mapStateToProps)(Tweet))