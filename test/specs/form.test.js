const dataCreationPage = require('../pageobjects/dataCreation.page');
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
        await dataCreationPage.fullNameLabel.waitForDisplayed();
        const labelText = await dataCreationPage.fullNameLabel.getText();
        expect(labelText).to.equal("Full Name*");
    });

    it("Should enter Full Name", async () => {
        const firstName = properties.get('firstName');
        const lastName = properties.get('lastName');
        await dataCreationPage.setValue("//input[@placeholder='First Name']", firstName);
        await dataCreationPage.setValue("//input[@placeholder='Last Name']", lastName);

        const firstNameValue = await dataCreationPage.firstNameInput;
        const lastNameValue = await dataCreationPage.lastNameInput;
        expect(firstNameValue).to.equal(firstName);
        expect(lastNameValue).to.equal(lastName);
    });

    it("Should enter Address", async () => {
        const address = properties.get('address');
        await dataCreationPage.setValue("//textarea[@ng-model='Adress']", address);
        const addressValue = await dataCreationPage.addressInput;
        expect(addressValue).to.equal(address);
    });

    it("Should enter email address", async () => {
        const email = properties.get('email');
        await dataCreationPage.setValue("//input[@ng-model='EmailAdress']", email);
        const emailValue = await dataCreationPage.emailInput;
        expect(emailValue).to.equal(email);
    });

    it("Should enter phone number", async () => {
        const phone = properties.get('phone');
        await dataCreationPage.setValue("//input[@ng-model='Phone']", phone);
        const phoneValue = await dataCreationPage.phoneInput;
        expect(phoneValue).to.equal(String(phone));
    });

    it("Should select the Male radio button", async () => {
        await dataCreationPage.selectInputByValue("Male", "radio");
        const maleRadio = dataCreationPage.genderRadioButtons[0];
        const isSelected = await maleRadio.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the Female radio button", async () => {
        await dataCreationPage.selectInputByValue("FeMale", "radio");
        const femaleRadio = dataCreationPage.genderRadioButtons[1];
        const isSelected = await femaleRadio.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the Cricket checkbox button", async () => {
        await dataCreationPage.selectInputByValue("Cricket", "checkbox");
        const cricketCheckBox = dataCreationPage.hobbiesCheckboxes[0];
        const isSelected = await cricketCheckBox.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the Movies checkbox button", async () => {
        await dataCreationPage.selectInputByValue("Movies", "checkbox");
        const moviesCheckBox = dataCreationPage.hobbiesCheckboxes[1];
        const isSelected = await moviesCheckBox.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the Hockey checkbox button", async () => {
        await dataCreationPage.selectInputByValue("Hockey", "checkbox");
        const hockeyCheckBox = dataCreationPage.hobbiesCheckboxes[2];
        const isSelected = await hockeyCheckBox.isSelected();
        expect(isSelected).to.be.true;
    });

    it("Should select the language", async () => {
        const languageSelection = await dataCreationPage.waitForElement("//div[@id='msdd']");
        await languageSelection.scrollIntoView();
        await languageSelection.click();
        await dataCreationPage.selectLanguage("English");

        const selectedLanguages = await $$("//div[@id='msdd']//li"); // Assuming each language is a <li> in the dropdown

        // Assertion to ensure "English" is among the selected languages
        const isLanguageSelected = await Promise.all(
            selectedLanguages.map(async (language) => await language.getText())
        ).then(texts => texts.includes("English"));
    
        expect(isLanguageSelected).to.be.true; // Check if "English" is selected
    
        // Optionally, check if the dropdown displays "English"
        const dropdownText = await languageSelection.getText();
        expect(dropdownText).to.include("English");
    });

    it("Should select the skills", async () => {
        const skillSelection = await dataCreationPage.waitForElement("//select[@id='Skills']");
        await skillSelection.scrollIntoView();
        await skillSelection.click();
        await skillSelection.selectByIndex(8);
        await skillSelection.selectByVisibleText('Analytics');
        // Get the selected option's visible text
        const selectedSkill = await skillSelection.getValue(); // This gets the value (attribute "value") of the selected option
        const selectedSkillText = await skillSelection.$('option:checked').getText(); // This retrieves the text of the selected option


        expect(selectedSkillText).to.equal('Analytics'); // Check that the visible text is 'Analytics'
        expect(selectedSkill).to.equal('Analytics'); 
    });
});
