import { token } from './store.js';
import { push } from 'svelte-spa-router';

const Session = {
  session: () => {
    const ls = localStorage.getItem('token');
    if (ls != null) {
      token.set(1);
    } else {
      push('/');
    }
  },
};

export default Session;
