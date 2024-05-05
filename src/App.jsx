import { Provider } from 'react-redux'
import store from './redux/store'
import SearchJob from './pages/searchJobs/SearchJob'
import Layout from './pages/layout/Layout'

function App() {

  return (
    <Provider store={store}>
      <Layout>
      <SearchJob />
      </Layout>
    </Provider>
  )
}

export default App
