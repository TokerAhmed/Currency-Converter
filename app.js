//const BASE_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");

const btn= document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchangeRate();
});


for(let select of dropdowns){
    for(currCode in countryList) {
        let newoption= document.createElement("option");
        newoption.innerText= currCode;
        newoption.value= currCode;
        if (select.name==="from" && currCode==="USD"){
            newoption.selected="selected";
        }else if (select.name==="to" && currCode==="BDT"){
            newoption.selected="selected";
        }
        select.append(newoption);
        }

        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
        });
}

const updateFlag= (element)=>{
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src= newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate=async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${from}.json`;

    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Currency data not found");

        const data = await response.json();

        // 🔄 New format: data[from][to]
        const rate = data[from][to];

        if (!rate) throw new Error("Conversion rate not found");

        const convertedAmount = (amtVal * rate).toFixed(2);
        msg.innerText= `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
        // 👇 Display it in the console or update HTML instead
        //console.log(`${amtVal} ${from.toUpperCase()} = ${convertedAmount} ${to.toUpperCase()}`);
    } catch (error) {
        console.error("Error:", error.message);
    }
}




