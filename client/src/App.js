import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particleOptions = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class App extends Component {

    constructor() {
        super();
        this.state = {
            box: {},
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            },
            imageUrl: '',
            input: '',
            loggedIn: false,
            route: 'signin'
        }
    };

    calculateFaceRegion = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box,
            image = document.getElementById('userImage'),
            imageHeight = Number(image.height),
            imageWidth = Number(image.width),
            imageFaceBox = {
                topRow: clarifaiFace.top_row * imageHeight,
                rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
                bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight),
                leftCol: clarifaiFace.left_col * imageWidth
            };
        return imageFaceBox;
    };

    handleInput = (event) => {
        this.setState({ input: event.target.value });
    };

    handleRoute = (route, loggedIn) => {
        if (route === 'signin')
            this.setState({
                box: {},
                user: {
                    id: '',
                    name: '',
                    email: '',
                    entries: 0,
                    joined: ''
                },
                imageUrl: '',
                input: '',
                route,
                loggedIn
            })
        else
            this.setState({ route, loggedIn })
    };

    handleSubmit = () => {
        const { input, user } = this.state;
        this.setState({ imageUrl: input });

        // Back-End Server URL
        if (process.env.NODE_ENV === 'production') const URL = 'https://whispering-island-45495.herokuapp.com';
        else const URL = 'http://localhost:3000';

        fetch(`${URL}/imageurl`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    fetch(`${URL}/image`, {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: user.id
                        })
                    })
                        .then(res => res.json())
                        .then(count => {
                            this.setState(
                                Object.assign(
                                    this.state.user,
                                    { entries: count }
                                ),
                                this.renderImageFaceBox(this.calculateFaceRegion(response))
                            )
                        })
                        .catch(console.log);
                }
            })
            .catch(error => console.log(error));
    };

    loadUser = (data) => {
        const { id, name, email, entries, joined } = data;
        this.setState({
            user: {
                id,
                name,
                email,
                entries,
                joined
            },
        });
    };

    renderImageFaceBox = (box) => {
        this.setState({ box });
    };

    render() {
        const { box, imageUrl, loggedIn, route, user } = this.state;
        return (
            <div className="App">
                <Particles
                    className='particles'
                    params={particleOptions}
                />
                <Navigation
                    handleRoute={this.handleRoute}
                    loggedIn={loggedIn}
                    route={route}
                />
                {route === 'home'
                    ? <div>
                        <Logo />
                        <Rank
                            name={user.name}
                            entries={user.entries}
                        />
                        <ImageLinkForm
                            handleInput={this.handleInput}
                            handleSubmit={this.handleSubmit}
                        />
                        <FaceRecognition
                            box={box}
                            imageUrl={imageUrl}
                        />
                    </div>
                    : (
                        this.state.route === 'signin'
                            ? <SignIn
                                handleRoute={this.handleRoute}
                                loadUser={this.loadUser}
                            />
                            : <Register
                                handleRoute={this.handleRoute}
                                loadUser={this.loadUser}
                            />
                    )
                }
            </div>
        );
    };

};

export default App;
