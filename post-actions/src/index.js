const fs = require('fs');
const path = require('path');
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