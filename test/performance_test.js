require('chromedriver');
const { Key, until } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");
const YTPage = require('../pages/youtube_page.js')

suite(function(env){
    describe('YT Search Performance Test', function(){
        let driver;
        let page;
        this.timeout(100000);

        before(async function(){
            driver = await env.builder().build();
            page = new YTPage(driver);
            await page.open();
        })

        it("will run the search X times to check average speed", async function(){
            var startTime= new Date().getTime();
            var runs = 100
            for( i = 0; i < runs ; i++){
                await driver.findElement(page.locators.searchInputField).clear();
                await driver.findElement(page.locators.searchInputField).sendKeys('Trunk Club', Key.ENTER);
                await driver.sleep(500);
                await driver.wait(
                    until.elementLocated(page.locators.videoResultsTitle)
                )
               
            }
            var totalTime = new Date().getTime()-startTime
            var averageTime = (totalTime/runs - (500*runs))
            console.log(`Average Search Time: ${averageTime}(ms) given ${runs} runs`);

        })
      
        after(async function(){
            driver.quit();
        })
    })


})

