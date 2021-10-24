const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const soprox = path.join(__dirname, "../soprox.config.json");
if (fs.existsSync(soprox)) {
  const conf = require(soprox);
  if (conf?.mainnet?.payer?.secretKey || conf?.mainnet?.program?.secretKey)
    throw new Error(
      "CAUTION! Remove secret key in mainnet config before being able to commit the repo."
    );
}

exit(0);
