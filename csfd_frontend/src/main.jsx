import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import './index.css';

// Microsoft Authentication Provider setup
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './auth/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const init = async () => {
  await msalInstance.initialize();
};

init();

if (
  !msalInstance.getActiveAccount() &&
  msalInstance
    .getAllAccounts()
    .filter((account) => account.username.endsWith('@kmutt.ac.th')) > 0
) {
  msalInstance.setActiveAccount(
    msalInstance
      .getAllAccounts()
      .filter((account) => account.username.endsWith('@kmutt.ac.th'))[0],
  );
}

msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <RouterProvider router={router} />
    </MsalProvider>
  </React.StrictMode>,
);
