const fs = require('fs');
const path = require('fs');
const utils = require('./utils');

utils.checkPath(utils.__Root, () => {
  if (fs.existsSync(utils.__Options)) {
    if (!utils.isJsonString(fs.readFileSync(utils.__Options))) {
      fs.writeFileSync(utils.__Options, utils.__optionsBase);
    }
  } else {
    fs.writeFileSync(utils.__Options, utils.__optionsBase);
  }
});