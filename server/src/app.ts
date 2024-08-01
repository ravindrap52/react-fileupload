import { listen } from './server';

listen().catch(error => {
  console.error(error);
});