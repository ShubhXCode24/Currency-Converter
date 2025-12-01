const Base_Url = `https://v6.exchangerate-api.com/v6/01ed0a7b11b78a3c0785ba86/latest/`;



//Select Important HTML Elements
const dropDowns = document.querySelectorAll(".drop-down select");
const button = document.querySelector("#btn");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const message = document.querySelector(".msg");



// 1. SET ALL COUNTRY OPTIONS IN DROPDOWNS---
for(let select of dropDowns) {
    for(let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currencyCode;
        newOption.innerText = currencyCode;

        // Default Select Value
        if(select.name === "from" && currencyCode === "USD") {
            newOption.selected = "Selected";
        } else if(select.name === "to" && currencyCode === "INR") {
            newOption.selected = "Selected";
        }

        select.append(newOption)
    }

    // Change flag when selecting currency
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    }) 
}

// CHANGE FLAG FUNCTION
function updateFlag(element) {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}



// 2. BUTTON CLICK -> GET EXCHANGE RATE---
button.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#input-amount");
    let amountValue = amount.value;

    //If Empty Amount
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }

    const URL = `${Base_Url}${fromCurrency.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    
    let rate = data.conversion_rates[toCurrency.value];
    let finalAmount = (amountValue * rate).toFixed(2);

    message.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
})