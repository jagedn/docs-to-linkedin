function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function exposeRun(namespace, method, argArray) {
    var func = (namespace ? this[namespace][method] : this[method]);
    if (argArray && argArray.length) {
        return func.apply(this, argArray)
    } else {
        return func();
    }
}

function onOpen(e) {
    var topMenu = DocumentApp.getUi().createMenu('DocsToLinkedin')
    topMenu.addItem('Publicar ahora', 'showSidebar');
    topMenu.addToUi();
}

function onInstall(e) {
    onOpen(e);
}

function showSidebar() {
    var linkedinService = getService_();
    if (!linkedinService.hasAccess()) {
        var authorizationUrl = linkedinService.getAuthorizationUrl();
        var authTemplate = HtmlService.createTemplateFromFile('static/auth.html')
        authTemplate.authorizationUrl = authorizationUrl;
        var page = authTemplate.evaluate();
        DocumentApp.getUi().showSidebar(page);
        return;
    }
    const template = HtmlService.createTemplateFromFile('static/base.html');
    template.data = {}
    const htmlOutput = template.evaluate().setTitle('DocsToLinkedin');
    DocumentApp.getUi().showSidebar(htmlOutput);
}

function getService_() {
    // Create a new service with the given name. The name will be used when
    // persisting the authorized token, so ensure it is unique within the
    // scope of the property store.
    return OAuth2.createService('linkedin')

        // Set the endpoint URLs, which are the same for all Google services.
        .setAuthorizationBaseUrl('https://www.linkedin.com/oauth/v2/authorization')
        .setTokenUrl('https://www.linkedin.com/oauth/v2/accessToken')

        // Set the client ID and secret, from the Google Developers Console.
        .setClientId(getClientId())
        .setClientSecret(getClientSecret())

        // Set the name of the callback function in the script referenced
        // above that should be invoked to complete the OAuth flow.
        .setCallbackFunction('authCallback')

        // Set the property store where authorized tokens should be persisted.
        .setPropertyStore(PropertiesService.getUserProperties())

        // Set the scope of the request.
        .setScope('openid profile email w_member_social')

        // Set the name of the callback function that should be invoked to
        // complete the OAuth flow.
        .setCallbackFunction('authCallback')

        // Set the property store where authorized tokens should be persisted.
        .setPropertyStore(PropertiesService.getUserProperties());
}

function authCallback(request) {
    var linkedinService = getService_();
    var isAuthorized = linkedinService.handleCallback(request);
    if (isAuthorized) {
        return HtmlService.createHtmlOutput('Success! You can close this tab.');
    } else {
        return HtmlService.createHtmlOutput('Denied. You can close this tab');
    }
}

function logout() {
    var linkedinService = getService_();
    linkedinService.reset();
}