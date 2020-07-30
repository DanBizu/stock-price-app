/**
 *     <!> WARNING
 *     Starting `ts-node` in `--inspect` mode is quite tricky.
 *     Read the explanation bellow for more details.
 *
 * We need to use `--inspect` to review in Chrome console what happens in the server app.
 * Previously, this command worked just fine: "npm run ts-node --inspect server/main.ts"
 * To use the right tsconfig after switching to native react a clever command was needed in package.json:
 * `"ts-node": "node_modules/.bin/ts-node --project ./tsconfig-server.json"`
 * Recently some changes have been made and the `--inspect` flag is no longer working in ts-node.
 *
 * One solution would be to register ts-node in node: `node --inspect -r ts-node/register ./server/main.ts`.
 * However, because of react-native we need to use another tsconfig file in ts-node ` --project ./tsconfig-server.json`
 * Unfortunately it is not possible to pass this param to ts-node using the register argumetn '-r' from node.
 *
 * A possible solution would be to set it up via environment vars in the command:
 *     TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' \
 *     mocha --require ts-node/register 'test/** /*.spec.{ts,tsx}'
 * This is not a nice setup, therefor, we use this hook which makes things easier.
 * https://stackoverflow.com/questions/40635956/overriding-tsconfig-json-for-ts-node-in-mocha
 */
require('ts-node').register({
    project: 'tsconfig-server.json',
});