import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: ''
        }
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    onFormSubmit = () => {
        const { email, name, password } = this.state;
        const { handleRoute, loadUser } = this.props;

        fetch('/api/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    loadUser(user);
                    handleRoute('home', true);
                };
            });

    };

    render() {

        return (
            <article className="br3 ba b--black-10 mv6 shadow-5 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    id="name"
                                    name="name"
                                    onChange={this.handleInputChange}
                                    type="text"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    id="email-address"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    type="email"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    id="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    type="password"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                onClick={this.onFormSubmit}
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );

    }; // End of render()

}; // End of Register class

export default Register;