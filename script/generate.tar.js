const child_process = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const packageJSON = require('../package.json');

function resolveRoot(relativePath) {
    return path.resolve(__dirname, '../', relativePath);
}

fs.rmSync(resolveRoot(`build/stage/v${packageJSON.version}`), {force: true, recursive: true});

// node-pre-gyp not support node v18: https://github.com/mapbox/node-pre-gyp/issues/647
const targets = [/*'8.0.0',*/ '10.0.0', '12.0.0', '14.0.0', '16.0.0'/*, '18.0.0'*/];
// https://nodejs.org/api/os.html#osarch
const target_archs = [/*'arm', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x',*/ 'x64', 'arm64'];
// https://github.com/mapbox/node-pre-gyp#options
const target_platforms = [/*'linux', 'sunos', 'freebsd', 'openbsd', 'aix',*/ 'darwin', 'win32'];

let errorConfigs = [];

for (let loop1 = 0; loop1 < targets.length; loop1++) {
    let target = targets[loop1];
    for (let loop2 = 0; loop2 < target_archs.length; loop2++) {
        let target_arch = target_archs[loop2];
        for (let loop3 = 0; loop3 < target_platforms.length; loop3++) {
            let target_platform = target_platforms[loop3];

            let command = `./node_modules/.bin/node-pre-gyp configure build package --openssl_fips='' --target=${target} --target_arch=${target_arch} --target_platform=${target_platform}`;
            console.log('execSync:', command);
            try {
                child_process.execSync(command);
            } catch (e) {
                console.error(e);
                errorConfigs.push(JSON.stringify({target, target_arch, target_platform}) + os.EOL);
            }
        }
    }
}

if (errorConfigs.length) {
    fs.writeFileSync(resolveRoot('generate.tar.error.log'), errorConfigs.join(''));
}


// test 


