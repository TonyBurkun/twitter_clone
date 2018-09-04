import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from '../components/Tweet'

class Dashboard extends Component {
    render(){

        console.log(this);
        return (
            <div>
                <h3 className="center">Your Timeline</h3>
                <ul className="dashboard-list">
                    {this.props.tweetsIds.map((id) => {
                        return (
                            <li key = {id}>
                                <Tweet id = {id}/>
                            </li>
                        )
                    })}
                </ul>
            </div>

        )
    }
}

function mapStateToProps (store) {

    let { tweets } = store;
    return {
        tweetsIds: Object.keys(tweets)
    }
}





export default connect(mapStateToProps)(Dashboard)
