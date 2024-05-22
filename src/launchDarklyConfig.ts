import { LDClient, initialize } from 'launchdarkly-js-client-sdk';

const clientSideID = '664e2172b978e20fc74c2e30'; // replace with your LaunchDarkly client-side ID

export const ldClient: LDClient = initialize(clientSideID, { key: 'example-user-key' });



export const ldConfig = {
  flags: {
    showImages: 'sample-feature',
  },
};
