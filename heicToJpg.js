const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const convert = require("heic-convert");

let source = process.argv[2];

if (!source) {
    let data = new Buffer.from(
        "comand to run script: node heicToJpg /your/source/path/sample.heic\n"
    );
    fs.writeSync(stream.fd, data, 0, data.length, stream.pos);
    process.exit();
}

if (!fs.lstatSync(source).isFile()) {
    let data = new Buffer.from(source + " is not a file\n");
    fs.writeSync(stream.fd, data, 0, data.length, stream.pos);
    process.exit();
}

const dirname = path.dirname(source);
const sourceFileName = path.basename(source);
const outputFileName = sourceFileName.split(".")[0] + ".jpeg";


(async () => {
    const inputBuffer = await promisify(fs.readFile)(path.join(dirname, sourceFileName));
    const outputBuffer = await convert({
        buffer: inputBuffer, // the HEIC file buffer
        format: 'JPEG',      // output format
        quality: 1,           // the jpeg compression quality, between 0 and 1
    });
    await promisify(fs.writeFile)(path.join(dirname, outputFileName), outputBuffer);
})()
    .then(() => {
        console.log('result: ', path.join(dirname, outputFileName))
        process.exit(0)
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
