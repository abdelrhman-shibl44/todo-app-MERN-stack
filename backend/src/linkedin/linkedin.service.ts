import { Injectable } from '@nestjs/common';
import { Builder, By, Capabilities, until } from 'selenium-webdriver';

@Injectable()
export class LinkedinService {
  async getUserProfile(profileName: string): Promise<any> {
    const driver = await new Builder()
      .withCapabilities(Capabilities.chrome())
      .build();

    try {
      // Set user-agent
      await driver.executeScript(
        "Object.defineProperty(navigator, 'userAgent', {value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})",
      );
      await driver.get(`https://www.linkedin.com/in/${profileName}/`);

      // Wait for the modal to appear and then close it
      await driver.wait(
        until.elementLocated(
          By.xpath('/html/body/div[3]/div/div/section/button'),
        ),
        7000,
      );
      const closeButton = await driver.findElement(
        By.xpath('/html/body/div[3]/div/div/section/button'),
      );
      await closeButton.click();

      // Once the modal is closed, scrape the profile data
      const name = await driver
        .findElement(
          By.xpath(
            '/html/body/main/section[1]/div/section/section[1]/div/div[2]/div[1]/button/h1',
          ),
        )
        .getText();
      const title = await driver
        .findElement(
          By.xpath(
            '/html/body/main/section[1]/div/section/section[1]/div/div[2]/div[1]/h2',
          ),
        )
        .getText();
      const photoUrl = await driver
        .findElement(
          By.xpath(
            '/html/body/main/section[1]/div/section/section[1]/div/div[1]/img',
          ),
        )
        .getAttribute('src');

      // Return scraped data
      return {
        name,
        title,
        photoUrl,
      };
    } catch (error) {
      throw new Error('Failed to fetch LinkedIn profile');
    } finally {
      await driver.quit();
    }
  }
}
