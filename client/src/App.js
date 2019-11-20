import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import AddPost from './components/AddPost';
import Posts from './components/Posts';

import AddCategory from './components/AddCategory';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="container">
          <h1 className="text-center">My Blog</h1>
          <nav className="text-center">
            <ul>
              <li>
                <Link to="/">Posts</Link>
              </li>
              <li>
                <Link to="/add-post">Add Post</Link>
              </li>
              <li>
                <Link to="/add-category">Add Category</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/add-post">
              <AddPost />
            </Route>
            <Route path="/add-category">
              <AddCategory />
            </Route>
            <Route path="/">
              <Posts />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}