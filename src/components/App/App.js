import React from 'react';
import Header from '../elements/Header/Header';
import {Route, Switch} from "react-router-dom";
import NotFound from "../elements/NotFound/NotFound";
import Movie from "../Movie/Movie";

import Home from '../Home/Home';

const App = () => {
    return(
        <div>
            <div>
                <Header/>
            </div>

            <Switch>
                <Route
                    exact
                    path={"/"}
                    component={Home}
                />
                <Route
                    exact
                    path={"/:movieId"}
                    component={Movie}  />
                <Route
                    component={NotFound}
                />
            </Switch>
        </div>
    )
};

export default App;