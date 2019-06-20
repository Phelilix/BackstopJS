var fs = require('fs');

/*
  If the data is like this:
  +------------------------+--------------+
  |          Key:          |    value:    |
  +------------------------+--------------+
  |amplitude_lastEventId   |             2|
  |amplitude_lastEventTime | 1543336128855|
  |amplitude_sessionId     | 1543336128827|
  |amplitude_unsent        |            []|
  +------------------------+--------------+

  The json should be like this:
  {
    "amplitude_lastEventId": "2",
    "amplitude_lastEventTime": "1543336128855",
    "amplitude_sessionId": "1543336128827",
    "amplitude_unsent": "[]"
  }
*/

async function loadLocalStorageData (path, page) {
  const localStorageData = JSON.parse(fs.readFileSync(path));
  await page.evaluate(json => {
    for (let key in json) {
      window.localStorage.setItem(key, json[key]);
    }
  }, localStorageData);
}

module.exports = async (page, scenario) => {
  if (fs.existsSync(scenario.localStoragePath) && scenario.url) {
    await page.goto(scenario.url);
    window.localStorage.clear();
    await loadLocalStorageData(scenario.localStoragePath, page);
    console.log('Local storage state restored with: ', JSON.stringify(window.localStorage, null, 2));
  }
};
