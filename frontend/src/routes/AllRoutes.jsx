import React from 'react'
import {Route,Routes} from "react-router-dom"
import Summary from '../pages/Summary'
import Private from './PrivateRoute'
import Dashboard from '../pages/Dashboard'
import Paragraph from '../pages/Paragraph'
import Chatbot from '../pages/Chatbot'
import Scifi from '../pages/Scifi'

export default function AllRoutes() {
  return (
    <Routes>
        <Route path='/summary' element={<Private><Summary/></Private>} />
        <Route path='/paragraph' element={<Private><Paragraph/></Private>} />
        <Route path='/' element={<Dashboard/>} />
        <Route path='/chatbot' element={<Private><Chatbot/></Private>} />
        <Route path='/scifi' element={<Private><Scifi/></Private>} />
    </Routes>
  )
}
