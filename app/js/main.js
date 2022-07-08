const slider = document.querySelector('[data-slider]');
const toggle = document.querySelector('[data-toggle]');
const pricing = {
  pageviews: ['10k', '50k', '100k', '500k', '1m'],
  prices: [8, 12, 16, 24, 36],
  yearlyDiscount: 25,
};

slider.addEventListener('input', changePricingInfos);
toggle.addEventListener('change', changeMonthlyPrice);

changeSliderBackground();
function changeSliderBackground() {
  const value = (slider.value / (slider.max - slider.min)) * 100;

  slider.style.backgroundImage = `linear-gradient(to right, var(--soft-cyan) 0%, var(--soft-cyan) ${value}%, var(--light-grayish-blue-100) ${value}%, var(--light-grayish-blue-100) 100%)`;
}

changePricingInfos();
function changePricingInfos() {
  changeSliderBackground();
  changePageviewsValue();
  changeMonthlyPrice();
}

function changeMonthlyPrice() {
  const priceElement = document.querySelector('[data-price]');
  const { prices } = pricing;
  const sliderValue = getSliderValue();
  const price = prices[sliderValue];
  const discount = verifyDiscount();
  const newPrice = price - (price * discount) / 100;

  priceElement.innerText = `$${newPrice.toFixed(2)}`;
}

function getSliderValue() {
  return slider.value;
}

function verifyDiscount() {
  const label = toggle.parentElement;
  const { yearlyDiscount } = pricing;
  const isChecked = toggle.checked;

  if (isChecked) {
    label.setAttribute('aria-labelledby', 'yearly-desc');
    return yearlyDiscount;
  }
  label.setAttribute('aria-labelledby', 'monthly-desc');
  return 0;
}

function changePageviewsValue() {
  const pageviewsElement = document.querySelector('[data-pageviews]');
  const { pageviews } = pricing;

  pageviewsElement.innerText = pageviews[getSliderValue()];
}
