import { FC, lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from './store/index'
import Spinner from './components/core/Spinner'
import 'react-toastify/dist/ReactToastify.css'
import './assets/App.css'

const MainRouter = lazy(() => import('./components/MainRouter'))

const App: FC = () => {
	return (
		<Provider store={store}>
			<Suspense fallback={<Spinner />}>
				<MainRouter />
				<ToastContainer newestOnTop />
			</Suspense>
		</Provider>
	)
}

export default App