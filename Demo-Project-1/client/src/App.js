import './App.css';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from '@apollo/client';

import DisplayData from './DisplayData.js';

function App() {
  // ApolloCient will be used by GraphQL to connect to an API
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    // ApolloClient library allows to cache info/data into your browser's cache
    // when data is fetched and a given component is being changed, the page will contain
    // latest data without the need to refresh the given page. If the data hasn't changed,
    // data can be retrieved from cache instead of making a new call to the API, each time a new 
    // component is being rendered on the browser page
    uri: 'http://localhost:4000/graphql',
    // uri specifies a link where a GraphQL API is running
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <h1>List of Users</h1> */}
        <DisplayData></DisplayData>
      </div>
    </ApolloProvider>
  );
}

export default App;
