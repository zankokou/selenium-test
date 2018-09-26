require('chromedriver');
const { Key } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");
const YTPage = require('../pages/youtube_page.js')
const { expect } = require('chai');

suite(function(env){
    describe('YouTube Search Functionality', function(){
        let driver;
        let page;
        this.timeout(20000);

        before(async function(){
            driver = await env.builder().build();
            page = new YTPage(driver);
            await page.open();
        })

        it("calls search function without any input", async function(){
            await driver.findElement(page.locators.searchBtn).click();
            expect(null);
            await driver.sleep(1000);

        })

        it("checks the Url navigation from page to page", async function(){
            let currentUrl = await driver.getCurrentUrl();

            await driver.findElement(page.locators.searchInputField).clear();
            await driver.findElement(page.locators.searchInputField).sendKeys('Trunk Club', Key.ENTER);
            await driver.sleep(1000);

            let pageUrl = await driver.getCurrentUrl();
            expect(pageUrl).to.not.equal(currentUrl);
            
        })

        it("checks the first video title for revelvant result", async function(){
            await driver.findElement(page.locators.searchInputField).clear();
            await driver.findElement(page.locators.searchInputField).sendKeys('Trunk Club', Key.ENTER);
            await driver.sleep(1000);

            let videoTitle = await driver.findElement(page.locators.videoResultsTitle).getText();

            expect(videoTitle).includes('Trunk Club');
            
        })


        it("checks the first video to see if capitaliztion yields different results", async function(){
            await driver.findElement(page.locators.searchInputField).clear();
            await driver.findElement(page.locators.searchInputField).sendKeys('tRunK cLUB', Key.ENTER);
            await driver.sleep(1000);

            let videoTitle = await driver.findElement(page.locators.videoResultsTitle).getText();

            expect(videoTitle).includes('Trunk Club');
            
        })
      
        after(async function(){
            driver.quit();
        })
    })


})

