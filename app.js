const countryList = {
  AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", AQD: "AQ", 
  ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG", 
  BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV", 
  BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF", CHF: "CH", CLP: "CL", 
  CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", 
  DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR", 
  FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI", GMD: "GM", 
  GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", 
  IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO", 
  JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW", 
  KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", 
  LVL: "LV", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", 
  MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", 
  MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", 
  PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", 
  RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", 
  SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST", SVC: "SV", 
  SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", 
  TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", 
  VEF: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW"
};

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") newOption.selected = true;
    if (select.name === "to" && currCode === "INR") newOption.selected = true;
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => updateFlag(evt.target));
}

const updateExchangeRate = async () => {
  let amtVal = document.querySelector(".amount input").value || 1;
  const url = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
  
  try {
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    msg.innerText = `${amtVal} ${fromCurr.value} = ${(amtVal * rate).toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
  }
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode] || "UN"; // Default to "UN" if missing
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  if (!img) return; // Prevent errors if no img element exists

  // Handle flag errors gracefully
  img.onerror = () => {
    img.src = "https://flagsapi.com/UN/flat/64.png"; // Fallback flag
  };

  img.src = newSrc;
};


btn.addEventListener("click", (evt) => { evt.preventDefault(); updateExchangeRate(); });
window.addEventListener("load", updateExchangeRate);
