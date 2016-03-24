import { initComponents } from './logic/components';
import stores from './logic/stores';
import {startUI} from './ui';

startUI();

initComponents().then(() => {
  stores.isInitialDataLoaded = true;
});
