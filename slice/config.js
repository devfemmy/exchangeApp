/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable semi */

import {APP_URL,APP_STAGING_URL,APP_STAGING_TRANSACTION_URL, APP_STAGING_WALLET_URL,APP_STAGING_WEBSOCKET_URL,APP_WEBSOCKET_URL, APP_WALLET_URL,APP_DOJAH_PUBLIC_KEY,APP_DOJAH_PRIVATE_KEY,APP_DOJAH_TEST_KEY,APP_DOJAH_APP_ID,APP_DOJAH_LINK, APP_TRANSACTION_URL,APP_CHATWOOT_TOKEN} from "@env"

const endPointVersion = "Staging"


const config = {
    api_base_url: endPointVersion === "Staging" ? APP_STAGING_URL : APP_URL,
    wallet_base_url:endPointVersion === "Staging" ? APP_STAGING_WALLET_URL : APP_WALLET_URL,
    transaction_url: endPointVersion === "Staging" ? APP_STAGING_TRANSACTION_URL : APP_TRANSACTION_URL,
    chatwoot_url: APP_CHATWOOT_TOKEN,
    dojah_private_key: APP_DOJAH_PRIVATE_KEY,
    dojah_public_key: APP_DOJAH_PUBLIC_KEY,
    dojah_test_key: APP_DOJAH_TEST_KEY,
    dojah_appId_key: APP_DOJAH_APP_ID,
    dojah_link: APP_DOJAH_LINK,
    websocket_url: endPointVersion === "Staging" ? APP_STAGING_WEBSOCKET_URL : APP_WEBSOCKET_URL,
  };

  export default config;
  