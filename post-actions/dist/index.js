/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const fs = __nccwpck_require__(147);
const path = __nccwpck_require__(17);
const excludedPaths = [".github", ".git", "post-actions", "local-data", ".mvn", ".idea"];

function replaceTokens() {
    console.info('Starting token replacement ...');
    const full_string = process.env.GITHUB_REPOSITORY.split('/');
    const repoName = full_string[1]; // e.g. data-protection-svc
    process.env.FULL_SERVICE_NAME = repoName;
    console.info(`Full service name: ${repoName}`);
    const serviceName = repoName.replace("-svc", ""); // e.g. data-protection
    process.env.SERVICE_NAME = serviceName
    console.info(`Service name: ${process.env.SERVICE_NAME}`);
    process.env.SERVICE_PACKAGE_NAME = serviceName.replace(/[-_\s]/g, ""); // e.g. dataprotection
    console.info(`Service package name: ${process.env.SERVICE_PACKAGE_NAME}`);
    const files = getAllFiles(path.resolve("../"));

    files.forEach(file => {
        try {
            console.log(`Processing ${path.dirname(file)}`);
            const data = fs.readFileSync(file, 'utf8');
            const res = data.replace(/\${\w+}/gi, (fileContents) => {
                const match = fileContents.match(/\${(?<var>\w+)}/i);
                let env = process.env[match[1]];
                if (typeof env === 'undefined') {
                    console.warn(`Environment Variable ${match[1]} not found!`);
                    env = fileContents;
                } else {
                    console.info(`Replacing Environment Variable ${match[1]}.`);
                }
                return env;
            });
            fs.writeFileSync(file, res);
            console.info(`File ${file} saved.`);
        } catch (err) {
            console.info(`An error has occurred ${err}.`);
        }
    });
}

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function (file) {
        const filePath = `${dirPath}/${file}`;
        const fileDetails = fs.statSync(filePath);
        if (fileDetails.isDirectory() && !excludedPaths.includes(path.basename(path.resolve(file)))) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else if (fileDetails.isFile()) {
            arrayOfFiles.push(filePath);
        } else {
            console.info(`Skipping file ${filePath}`);
        }
    });
    return arrayOfFiles;
}

replaceTokens();
})();

module.exports = __webpack_exports__;
/******/ })()
;