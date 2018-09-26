
require('chromedriver');

const {Browser, By, Key, until} = require("selenium-webdriver");

const URL = "https://www.youtube.com/";

class YTpage {
    constructor(driver){
        this.driver = driver;
        this.locators =  {
            searchBtn: By.id('search-icon-legacy'),
            searchInputField: By.name('search_query'),
            videoResultsTitle: By.id('video-title'),
        }
    }

    open(){
        this.driver.get(URL)
    }
}

module.exports = YTpage; 