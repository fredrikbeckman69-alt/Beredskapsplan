import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

const tenantId = process.env.AZURE_TENANT_ID || '';
const clientId = process.env.AZURE_CLIENT_ID || '';
const clientSecret = process.env.AZURE_CLIENT_SECRET || '';
export const MAILBOX_ADDRESS = process.env.MAILBOX_ADDRESS || '';

let graphClient: Client | null = null;

export function getGraphClient() {
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Azure AD credentials are not properly configured in environment variables.');
  }

  if (!graphClient) {
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ['https://graph.microsoft.com/.default']
    });

    graphClient = Client.initWithMiddleware({
      debugLogging: process.env.NODE_ENV === 'development',
      authProvider
    });
  }

  return graphClient;
}

export async function sendEmail(to: string, subject: string, bodyText: string) {
  const client = getGraphClient();

  const sendMail = {
    message: {
      subject: subject,
      body: {
        contentType: 'Text',
        content: bodyText
      },
      toRecipients: [
        {
          emailAddress: {
            address: to
          }
        }
      ]
    },
    saveToSentItems: 'true'
  };

  try {
    await client.api(`/users/${MAILBOX_ADDRESS}/sendMail`).post(sendMail);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function getInbox(limit = 20) {
  const client = getGraphClient();

  try {
    const response = await client.api(`/users/${MAILBOX_ADDRESS}/mailFolders/inbox/messages`)
      .top(limit)
      .select('id,subject,from,receivedDateTime,isRead,bodyPreview')
      .orderby('receivedDateTime DESC')
      .get();

    return response.value;
  } catch (error) {
    console.error('Error fetching inbox:', error);
    throw error;
  }
}

export async function getEmailDetails(messageId: string) {
  const client = getGraphClient();

  try {
    const response = await client.api(`/users/${MAILBOX_ADDRESS}/messages/${messageId}`).get();
    return response;
  } catch (error) {
    console.error('Error fetching email details:', error);
    throw error;
  }
}
