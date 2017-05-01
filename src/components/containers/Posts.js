import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreatePost } from '../view';
import actions from '../../actions';

class Posts extends Component {

    constructor() {
        super();
        this.submitPost = this.submitPost.bind(this);
    }

    componentDidMount() {
        const currentLocation = this.props.post.currentLocation;
        this.props.fetchPosts(currentLocation);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate: ');
        if (this.props.post.list == null) {
            const currentLocation = this.props.post.currentLocation;
            this.props.fetchPosts(currentLocation);
        }
    }

    submitPost(post) {
        let user = this.props.account.user;
        if (user == null) {
            console.log('Upload anonymously');
            post['username'] = 'anon';
        }
        else {
            post['username'] = user.username;
        }
        const currentLocation = this.props.post.currentLocation;
        post['geo'] = [
            currentLocation.lat,
            currentLocation.lng
        ]
        this.props.createPost(post);
    }

    render() {
        const list = this.props.post.list // can be null
        return (
            <div>
                <CreatePost onCreate={this.submitPost} />
                <div className="table-wrapper">
                    <table className="alt">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Caption</th>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                             { (list == null) ? null :
                                list.map((post, i) => {
                                    return (
                                         <tr key={post.id}>
                                            <td><img style={{width:64}}src={post.image} /></td>
                                            <td>{post.caption}</td>
                                            <td>{post.username}</td>
                                        </tr>
                                    );
                                })
                             }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        post: state.post,
        account: state.account
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchPosts: (params) => dispatch(actions.fetchPosts(params)),
        createPost: (params) => dispatch(actions.createPost(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Posts);