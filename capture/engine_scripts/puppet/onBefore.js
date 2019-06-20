module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);

  await require('./loadLocalStorage')(page, scenario); 
  // after loadLocalStorage, not guaranteed to be on 'before' from here.
};
