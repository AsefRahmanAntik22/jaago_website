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
});
