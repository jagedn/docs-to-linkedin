# DocsToLinkedin

DocsToLinkedin is a Google Apps Script project that allows users to upload their Google Docs directly to LinkedIn as posts. This project leverages LinkedIn's API for document uploads and OAuth2 for authentication.

## Features

- Upload Google Docs as LinkedIn posts.
- OAuth2 authentication with LinkedIn.
- Customizable sidebar interface within Google Docs.

## Prerequisites

- A Google account with access to Google Docs.
- A LinkedIn Developer account to obtain API credentials.
- Basic understanding of Google Apps Script.

## Setup

1. **Clone the Repository:**
   - Download or clone this repository to your local machine.

2. **LinkedIn API Setup:**
   - Create a LinkedIn app at the [LinkedIn Developer Portal](https://www.linkedin.com/developers/).
   - Obtain your `Client ID` and `Client Secret`.

3. **Google Apps Script Setup:**
   - Open Google Docs and navigate to `Extensions > Apps Script`.
   - Copy the contents of each file in this repository into the corresponding script files in the Apps Script editor.
   - Rename `env-example.js.rename` to `env.js` and replace `'YOUR-LINKEDIN-CLIENT-ID'` and `'YOUR-LINKEDIN-CLIENT-SECRET'` with your LinkedIn app credentials.

4. **Enable Advanced Services:**
   - In the Apps Script editor, click on `Resources > Advanced Google services...`.
   - Enable the Google Docs API.

5. **Deploy the Script:**
   - Click on `Deploy > Test deployments` to authorize the script and test it.
   - Once tested, deploy it as a web app.

## Usage

- Open a Google Doc.
- Click on `DocsToLinkedin` in the menu and select `Publicar ahora`.
- If not authorized, follow the authorization flow to grant access.
- Enter your post content in the sidebar and click `Publicar` to upload your document to LinkedIn.

## Files

- `static/base.html`: Main HTML template for the sidebar.
- `static/header.html`: Header section for the sidebar.
- `static/Runner.js.html`: JavaScript for handling script execution.
- `static/style.css.html`: CSS for styling the sidebar.
- `static/auth.html`: HTML template for the authorization page.
- `appsscript.json`: Configuration file for the Apps Script project.
- `Main.js`: Main script file for handling Google Docs interactions.
- `Util.js`: Utility functions for LinkedIn API interactions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## Contact

For any questions or issues, please contact [@jagedn](https://github.com/jagedn).