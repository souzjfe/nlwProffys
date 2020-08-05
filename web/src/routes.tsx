import React from 'react';
import { Route, BrowserRouter, Router } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';

function Routes (){
    return(
        <BrowserRouter>
            <Route exact path="/" component={Landing}/>
            <Route path="/give-classes" component={TeacherForm}/>
            <Route path="/study" component={TeacherList}/>
        </BrowserRouter>
    )
}

export default Routes;