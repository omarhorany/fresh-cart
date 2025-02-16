import React from 'react'
import { Navigate } from 'react-router'

export default function Guard({ children }) {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to='/login' />
}
