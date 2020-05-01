import React from 'react';

const Register = ({ handleRoute }) => {
    return (
        <article className="br3 ba b--black-10 mv6 shadow-5 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 black-80">
                 <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                        {/* <label className="pa0 ma0 lh-copy f6 pointer">
                            <input type="checkbox" />
                        Remember me
                        </label> */}
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            onClick={() => handleRoute('home', true)}
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </div>
            </main>
        </article>
    )
};

export default Register;