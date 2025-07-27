document.addEventListener('DOMContentLoaded', () => {
  const donationInput = document.getElementById('donationInput');
  const totalAmount = document.getElementById('totalAmount');
  const amountButtons = document.querySelectorAll('.amount-btn');
  const customAmountInput = donationInput;
  const donationForm = document.querySelector('form');

  const successModal = createToastModal('successModal', '🎉 Thank you for your donation!');
  const errorModal = createToastModal('errorModal', '⚠️ Minimum donation is $5.00');

  const alertDialog = document.getElementById('alertDialog');
  const openDialogBtn = document.getElementById('openDialogBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const continueBtn = document.getElementById('continueBtn');

  // === Mobile Menu Toggle ===
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // === Search Modal Toggle ===
  const searchButton = document.getElementById('searchButton');
  const searchButtonMobile = document.getElementById('searchButtonMobile');
  const searchModal = document.getElementById('searchModal');
  const closeSearch = document.getElementById('closeSearch');

  if (searchButton && searchModal) {
    searchButton.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
    });
  }

  if (searchButtonMobile && searchModal) {
    searchButtonMobile.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
    });
  }

  if (closeSearch && searchModal) {
    closeSearch.addEventListener('click', () => {
      searchModal.classList.add('hidden');
    });
  }

  if (openDialogBtn) {
    openDialogBtn.style.display = 'none';
  }

  // === Handle Preset Amount Buttons ===
  amountButtons.forEach(button => {
    button.addEventListener('click', () => {
      const amount = button.dataset.amount;
      updateTotal(amount);
      customAmountInput.value = amount;
    });
  });

  // === Custom Amount Input ===
  customAmountInput.addEventListener('input', (e) => {
    updateTotal(e.target.value);
  });

  // === Sync Total Display ===
  donationInput.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    totalAmount.textContent = isNaN(val) ? '0.00' : val.toFixed(2);
  });

  // === Form Submit ===
  donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const donationVal = parseFloat(donationInput.value);

    if (isNaN(donationVal) || donationVal < 5) {
      errorModal();
    } else if (alertDialog) {
      alertDialog.classList.remove('hidden');
    }
  });

  // === Dialog Actions ===
  if (cancelBtn && alertDialog) {
    cancelBtn.addEventListener('click', () => {
      alertDialog.classList.add('hidden');
    });
  }

  if (continueBtn && alertDialog) {
    continueBtn.addEventListener('click', () => {
      alertDialog.classList.add('hidden');
      successModal();
      setTimeout(() => {
        window.location.href = "index.html";
      }, 6000);
    });
  }

  // === Update Total Helper ===
  function updateTotal(amount) {
    const floatAmount = parseFloat(amount);
    totalAmount.textContent = isNaN(floatAmount) ? '0.00' : floatAmount.toFixed(2);
    donationInput.value = floatAmount || 0;
  }

  // === Toast Modal Helper ===
  function createToastModal(id, message) {
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-6 py-4 rounded-lg shadow-lg text-black hidden z-50';
    modal.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 text-red-500 font-bold" id="close${id}">✖</button>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(`#close${id}`);
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    return () => {
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 3000);
    };
  }

  // === Donation Stats Section ===
  let donors = 0,
      sponsors = 0,
      zakatDonors = 0,
      totalDonors = 0;

  let amountDonors = 0,
      amountSponsors = 0,
      amountZakat = 0,
      totalAmountRaised = 0;

  let educationCount = 0,
      nutritionCount = 0,
      healthCount = 0;

  let educationAmount = 0,
      nutritionAmount = 0,
      healthAmount = 0;

  // Get elements by unique IDs
  const donorCountDonorsEl = document.getElementById('donorCountDonors');
  const amountRaisedDonorsEl = document.getElementById('amountRaisedDonors');

  const donorCountSponsorEl = document.getElementById('donorCountSponsor');
  const amountRaisedSponsorEl = document.getElementById('amountRaisedSponsor');

  const donorCountZakatEl = document.getElementById('donorCountZakat');
  const amountRaisedZakatEl = document.getElementById('amountRaisedZakat');

  const amountRaisedTodayTotalEl = document.getElementById('amountRaisedTodayTotal');

  const donorCountEducationEl = document.getElementById('donorCountEducation');
  const amountRaisedEducationEl = document.getElementById('amountRaisedEducation');

  const donorCountNutritionEl = document.getElementById('donorCountNutrition');
  const amountRaisedNutritionEl = document.getElementById('amountRaisedNutrition');

  const donorCountHealthEl = document.getElementById('donorCountHealth');
  const amountRaisedHealthEl = document.getElementById('amountRaisedHealth');

  const amountRaisedTotalEl = document.getElementById('amountRaisedTotal');

  function updateStats() {
    // Simulate increments for donors
    donors += Math.floor(Math.random() * 3);
    sponsors += Math.floor(Math.random() * 2);
    zakatDonors += Math.floor(Math.random() * 2);

    // Simulate amounts raised randomly for each category
    amountDonors += (Math.random() * 300 + 50);
    amountSponsors += (Math.random() * 500 + 100);
    amountZakat += (Math.random() * 200 + 50);

    // Sector-wise counts and amounts
    educationCount += Math.floor(Math.random() * 2);
    nutritionCount += Math.floor(Math.random() * 2);
    healthCount += Math.floor(Math.random() * 2);

    educationAmount += (Math.random() * 150 + 50);
    nutritionAmount += (Math.random() * 100 + 30);
    healthAmount += (Math.random() * 120 + 40);

    // Total sums
    totalDonors = donors + sponsors + zakatDonors;
    totalAmountRaised = amountDonors + amountSponsors + amountZakat;
    const totalSectorAmount = educationAmount + nutritionAmount + healthAmount;

    // Update DOM
    if(donorCountDonorsEl) donorCountDonorsEl.textContent = donors;
    if(amountRaisedDonorsEl) amountRaisedDonorsEl.textContent = amountDonors.toFixed(2);

    if(donorCountSponsorEl) donorCountSponsorEl.textContent = sponsors;
    if(amountRaisedSponsorEl) amountRaisedSponsorEl.textContent = amountSponsors.toFixed(2);

    if(donorCountZakatEl) donorCountZakatEl.textContent = zakatDonors;
    if(amountRaisedZakatEl) amountRaisedZakatEl.textContent = amountZakat.toFixed(2);

    if(amountRaisedTodayTotalEl) amountRaisedTodayTotalEl.textContent = totalAmountRaised.toFixed(2);

    if(donorCountEducationEl) donorCountEducationEl.textContent = educationCount;
    if(amountRaisedEducationEl) amountRaisedEducationEl.textContent = educationAmount.toFixed(2);

    if(donorCountNutritionEl) donorCountNutritionEl.textContent = nutritionCount;
    if(amountRaisedNutritionEl) amountRaisedNutritionEl.textContent = nutritionAmount.toFixed(2);

    if(donorCountHealthEl) donorCountHealthEl.textContent = healthCount;
    if(amountRaisedHealthEl) amountRaisedHealthEl.textContent = healthAmount.toFixed(2);

    if(amountRaisedTotalEl) amountRaisedTotalEl.textContent = totalSectorAmount.toFixed(2);
  }

  // Update stats every 4 seconds
  updateStats();
  setInterval(updateStats, 4000);

});
