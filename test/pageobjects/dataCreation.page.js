class DataCreationPage {
    get fullNameLabel() {
        return $("//label[contains(text(),'Full Name* ')]");
    }

    get firstNameInput() {
        return $("input[placeholder='First Name']");
    }

    get lastNameInput() {
        return $("input[placeholder='Last Name']");
    }

    get addressInput() {
        return $("textarea[ng-model='Adress']");
    }

    get emailInput() {
        return $("input[ng-model='EmailAdress']");
    }

    get phoneInput() {
        return $("input[ng-model='Phone']");
    }

    get genderRadioButtons() {
        return $$("//input[@name='radiooptions']");
    }

    get skillsSelect() {
        return $("select#Skills");
    }

    get hobbiesCheckboxes() {
        return $$("//input[@type='checkbox']");
    }

    get languageDropdown() {
        return $("#msdd");
    }

    async setValue(selector, value) {
        const element = await $(selector);
        await element.waitForDisplayed();
        await element.setValue(value);
    }

    async selectInputByValue(value, type) {
        const selector = type === 'radio' ? "//input[@name='radiooptions']" : "//input[@type='checkbox']";
        const inputs = await $$(selector);
        for (const input of inputs) {
            const inputValue = await input.getAttribute("value");
            if (inputValue.toLowerCase() === value.toLowerCase()) {
                const isSelected = await input.isSelected();
                if (type === 'checkbox' || (type === 'radio' && !isSelected)) {
                    await input.click();
                }
                break;
            }
        }
    }

    async selectLanguage(language) {
        const languageList = await $$("//a[@class='ui-corner-all']");
        for (const langElement of languageList) {
            const text = await langElement.getText();
            if (text.toLowerCase() === language.toLowerCase()) {
                await langElement.click();
                break;
            }
        }
    }

    async waitForElement(selector) {
        const element = await $(selector);
        await element.waitForDisplayed();
        return element;
    }
}

module.exports = new DataCreationPage();
