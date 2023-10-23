# REST API Collections

## Bruno API Client
https://www.usebruno.com/

## Authentication
For endpoints requiring authentication, add a `Cookie` header to your request. The value of this cookie can be obtained from an already-authenticated browser session. Check the Network tab in the developer tools/console of your browser, and then copy the value of the `Cookie` header.

**NOTE**: Do NOT `git commit` any `Cookie` value to the saved request.

## Collections Notes

### Saved Requests
- Saved requests might reference User or Issue IDs that no longer exist in the database. Check the database to ensure your requests are valid. 
- As a general rule for exploring the API, it's best to create new data records first before updating/deleting, to ensure.
- If you are just exploring the API, don't commit your changes to the git repo, unless those changes are correcting requests which are out of sync with a current schema and won't function without being changed.

