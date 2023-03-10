import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

render((
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>
), document.getElementById('root'));
