import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { SSRProvider } from '@react-aria/ssr';
import { store } from '../redux/app/store';
import { Provider } from 'react-redux';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SSRProvider>
      <Provider store={store}>

        <Component {...pageProps} />
      </Provider>

    </SSRProvider>
  )
}

export default MyApp
