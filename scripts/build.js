/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const defaultConfig = {
    entry: "./build/main.js",
    output: "main.plugin.js",
    releaseFolder: "./release",
    pluginConfig: "./plugin.config.json",
    addInstallScript: true
};
const libConfigPath = path.join(__dirname, "../bbdbuild.config.json");
const libConfig = Object.assign(defaultConfig, fs.existsSync(libConfigPath) ? require(libConfigPath) : {});
const pluginPath = path.isAbsolute(libConfig.entry) ? libConfig.entry : path.join(__dirname, "..", libConfig.entry);
const releasePath = path.isAbsolute(libConfig.releaseFolder) ? libConfig.releaseFolder : path.join(__dirname, "..", libConfig.releaseFolder);
const pluginConfigPath = path.isAbsolute(libConfig.pluginConfig) ? libConfig.pluginConfig : path.join(__dirname, "..", libConfig.pluginConfig);

const formatString = function(string, values) {
    for (const val in values) string = string.replace(new RegExp(`{{${val}}}`, "g"), () => values[val]);
    return string;
};

const template = fs.readFileSync(path.join(__dirname, "template.local.js")).toString();
console.log("");
console.time("Build took");
console.log(`Building from ${pluginConfigPath}`);

if (!fs.existsSync(pluginConfigPath))
    console.error(`Could not find "${pluginConfigPath}"`);
else {
    const config = require(pluginConfigPath);
    const pluginName = config.info.name;
    const content = require(pluginPath).toString();
    let result = formatString(template, {
        PLUGIN_NAME: pluginName,
        CONFIG: JSON.stringify(config),
        INNER: content,
        WEBSITE: config.info.github,
        SOURCE: config.info.github_raw,
        PATREON: config.info.patreonLink,
        PAYPAL: config.info.paypalLink,
        AUTHOR_LINK: config.info.authorLink,
        INVITE_CODE: config.info.inviteCode,
        INSTALL_SCRIPT: libConfig.addInstallScript ? require(path.join(__dirname, "installscript.js")) : ""
    });
    if (libConfig.addInstallScript) result = result + "\n/*@end@*/";
    const buildFile = path.join(releasePath, libConfig.output);
    fs.writeFileSync(buildFile, result);
    console.log(`${pluginName} built successfully`);
    console.log(`${pluginName} saved as ${buildFile}`);
}
console.timeEnd("Build took");
