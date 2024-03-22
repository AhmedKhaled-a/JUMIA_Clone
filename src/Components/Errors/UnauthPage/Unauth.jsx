import React from 'react'
import GenericError from '../GenericError'
import './index.module.css';

export default function Unauth() {

    return (<GenericError title="401"
        comment="UnAuthorized What did you do maaaaan"
        lowerComment="This is for developers and admins what are you doing"
        redirects={[{ title: 'Login', path: '/login' }]}
    />
  )
}
