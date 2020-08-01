/**
 * <!>Make sure that every change on the original file is copied here.
 * Should've imported it from server folder but because I created
 * the app using create-react-app this is tricky.
 * ref: https://spectrum.chat/react/help/importing-files-outside-of-src-folder-in-cra~f1fe9fe2-5448-4fd3-a891-fe6830106bfe
 *   and
 * https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory/44115058#44115058
 */
export const SERVER_CFG = {
    PORT: 8080,
    HOSTNAME: '127.0.0.1'
}

export const SERVER_URL = `http://${SERVER_CFG.HOSTNAME}:${SERVER_CFG.PORT}`;
