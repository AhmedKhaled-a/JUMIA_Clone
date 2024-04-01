import React from 'react'
import GenericError from '../GenericError'
import './index.module.css';

export default function Unauth() {

    return (<GenericError title="401"
        comment="UnAuthorized!"
        redirects={[{ title: 'Login', path: '/login' }]}
    />
  )
}
