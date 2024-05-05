import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import SearchJob from './pages/searchJobs/SearchJob'

function App() {

  return (
    <Provider store={store}>
    <SearchJob />
    </Provider>
  )
}

export default App
