const registrationPage = require('../pageobjects/dataCreation.page');
const { expect } = require('chai');
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
        await registrationPage.setValue("//input[@placeholder='First Name']", "Abc");
        await registrationPage.setValue("//input[@placeholder='Last Name']", "XYZ");

        const firstNameValue = await registrationPage.firstNameInput.getValue();
        const lastNameValue = await registrationPage.lastNameInput.getValue();
        expect(firstNameValue).to.equal("Abc");
        expect(lastNameValue).to.equal("XYZ");
    });

    it("Should enter Address", async () => {
        await registrationPage.setValue("//textarea[@ng-model='Adress']", "123 Main Street");
        const addressValue = await registrationPage.addressInput.getValue();
        expect(addressValue).to.equal("123 Main Street");
    });

    it("Should enter email address", async () => {
        await registrationPage.setValue("//input[@ng-model='EmailAdress']", "abc123@gmail.com");
        const emailValue = await registrationPage.emailInput.getValue();
        expect(emailValue).to.equal("abc123@gmail.com");
    });

    it("Should enter phone number", async () => {
        await registrationPage.setValue("//input[@ng-model='Phone']", "1234567890");
        const phoneValue = await registrationPage.phoneInput.getValue();
        expect(phoneValue).to.equal("1234567890");
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
