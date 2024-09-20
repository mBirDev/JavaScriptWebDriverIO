const registrationPage = require('../pageobjects/dataCreation.page');
const { expect } = require('chai');
const propertiesReader = require('properties-reader');

// Load properties from the file
const properties = propertiesReader('config.properties');
describe('User Registration Tests', () => {
    before(async () => {
        await browser.maximizeWindow();
        await browser.url("https://demo.automationtesting.in/Register.html");
    });

    it("Should display the Full Name label", async () => {
        await registrationPage.fullNameLabel.waitForDisplayed();
        const labelText = await registrationPage.fullNameLabel.getText();
        expect(labelText).to.equal("Full Name*");
    });

    it("Should enter Full Name", async () => {
        const firstName = properties.get('firstName');
        const lastName = properties.get('lastName');
        await registrationPage.setValue("//input[@placeholder='First Name']", firstName);
        await registrationPage.setValue("//input[@placeholder='Last Name']", lastName);

        const firstNameValue = await registrationPage.firstNameInput.getValue();
        const lastNameValue = await registrationPage.lastNameInput.getValue();
        expect(firstNameValue).to.equal(firstName);
        expect(lastNameValue).to.equal(lastName);
    });

    it("Should enter Address", async () => {
        const address = properties.get('address');
        await registrationPage.setValue("//textarea[@ng-model='Adress']", address);
        const addressValue = await registrationPage.addressInput.getValue();
        expect(addressValue).to.equal(address);
    });

    it("Should enter email address", async () => {
        const email = properties.get('email');
        await registrationPage.setValue("//input[@ng-model='EmailAdress']", email);
        const emailValue = await registrationPage.emailInput.getValue();
        expect(emailValue).to.equal(email);
    });

    it("Should enter phone number", async () => {
        const phone = properties.get('phone');
        await registrationPage.setValue("//input[@ng-model='Phone']", phone);
        const phoneValue = await registrationPage.phoneInput.getValue();
        expect(phoneValue).to.equal(phone);
    });

    it("Should select the Male radio button", async () => {
        await registrationPage.selectInputByValue("Male", "radio");
        const maleRadio = registrationPage.genderRadioButtons[0];
        const isSelected = await maleRadio.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the Female radio button", async () => {
        await registrationPage.selectInputByValue("FeMale", "radio");
        const femaleRadio = registrationPage.genderRadioButtons[1];
        const isSelected = await femaleRadio.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the Cricket checkbox button", async () => {
        await registrationPage.selectInputByValue("Cricket", "checkbox");
        const cricketCheckBox = registrationPage.hobbiesCheckboxes[0];
        const isSelected = await cricketCheckBox.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the Movies checkbox button", async () => {
        await registrationPage.selectInputByValue("Movies", "checkbox");
        const moviesCheckBox = registrationPage.hobbiesCheckboxes[1];
        const isSelected = await moviesCheckBox.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the Hockey checkbox button", async () => {
        await registrationPage.selectInputByValue("Hockey", "checkbox");
        const hockeyCheckBox = registrationPage.hobbiesCheckboxes[2];
        const isSelected = await hockeyCheckBox.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the language", async () => {
        const languageSelection = await registrationPage.waitForElement("//div[@id='msdd']");
        await languageSelection.scrollIntoView();
        await languageSelection.click();
        await registrationPage.selectLanguage("English");
    });

    it("Should select the skills", async () => {
        const skillSelection = await registrationPage.waitForElement("//select[@id='Skills']");
        await skillSelection.scrollIntoView();
        await skillSelection.click();
        await skillSelection.selectByIndex(8);
        await skillSelection.selectByVisibleText('Analytics');
    });
});
