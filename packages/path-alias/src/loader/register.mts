import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Remove --experimental-loader ExperimentalWarning as the option doesn't exist anymore / is no longer experimental nodejs/node#51196
// Export ts-node/esm-register to use with --import
// https://github.com/nodejs/node/issues/51196
register('@armit/path-alias/esm', pathToFileURL('./'));
