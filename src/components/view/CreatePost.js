import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import { connect } from 'react-redux';
import actions from '../../actions';
import { APIManager } from '../../utils';

class CreatePost extends Component {

    constructor() {
        super();
        this.state = {
            post: {
                image: '',
                caption: ''
            }
        }
        this.selectImage = this.selectImage.bind(this);
        this.updateCaption = this.updateCaption.bind(this);
        this.submitPost = this.submitPost.bind(this);
    }

    submitPost(event) {
        event.preventDefault()

        if (this.state.post.image.length == 0){
            alert('Please add an image first.');
            return;
        }

        if (this.state.post.caption.length == 0){
            alert('Please add a caption.');
            return;
        }

        let updated = Object.assign({}, this.state.post);
        this.props.onCreate(updated);
    }

    updateCaption(event) {
        let updated = Object.assign({}, this.state.post);
        updated['caption'] = event.target.value;
        this.setState({
            post: updated
        });
        console.log(this.state.post.caption);
    }

    selectImage(files) {
        console.log('Image selected');
        const image = files[0];

        const cloudName = 'dikbalehb';
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'

        const timestamp = Date.now() / 1000;
        const uploadPreset = 'olo6fjz2';

        const paramStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + '0gEvkUjXR_fWvTTMXcF3F_IvsbI';
        const signature = sha1(paramStr);

        const params = {
            'api_key': '453718655922961',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        };

        APIManager
        .uploadFile(url, image, params)
        .then((uploaded) => {
            let updated = Object.assign({}, this.state.post);
            updated['image'] = uploaded['secure_url'];
            this.setState({
                post: updated
            });
        })
        .catch((err) => {
            alert(err);
        });
    }

    render() {
        return(
            <div>
                <div style={{background:'#fff'}}>
                    <h2> Submit Post </h2>
                    <input onChange={this.updateCaption} type="text" placeholder="Caption" />
                    <div className="row">
                        <div className="3u 12u$(small)">
                            <Dropzone onDrop={this.selectImage} style={{border:'none', marginTop:12}}>
                                <button className="button special">Upload Image</button>
                            </Dropzone>
                        </div>

                        <div className="3u 12u$(small)">
                                <button className="button special" style={{width:90+'%', marginLeft:12, marginTop:12}} onClick={this.submitPost}>Submit</button>
                        </div>

                        <div className="6u 12u$(small)">
                            <img style={{width:120, float:'right', marginTop:12}} src={this.state.post.image} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePost;