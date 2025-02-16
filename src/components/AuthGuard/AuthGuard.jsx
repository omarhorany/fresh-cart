import React from 'react'
import { Navigate } from 'react-router'

export default function AuthGuard({ children }) {
    const token = localStorage.getItem('token')
    return <>
        {token ? <Navigate to="/" /> : children}
    </>

}
