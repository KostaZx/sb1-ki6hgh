import { TebexHeadless } from 'tebex_headless';
import { config } from './config.js';

export const tebex = new TebexHeadless(config.webstoreId);