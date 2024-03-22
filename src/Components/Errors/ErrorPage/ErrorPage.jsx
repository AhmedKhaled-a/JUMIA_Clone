import React from 'react';
import './index.module.css';
import GenericError from '../GenericError';

const ErrorPage =  () => {
    return <div><GenericError
        title="404"
        comment="hmm... what did you doo AGGGGG"
        lowerComment="Why did you do this do need help"
        redirects={[{ title: 'Login', path: '/login' }]}
    /></div>
}

export {ErrorPage};
