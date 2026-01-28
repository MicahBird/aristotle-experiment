document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('item-modal');
  const closeBtn = document.querySelector('.close-button');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDate = document.getElementById('modal-date');
  const modalLink = document.getElementById('modal-link');

  // Open Modal
  document.querySelectorAll('.tier-item').forEach(item => {
    item.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      const date = this.getAttribute('data-date');
      const imageUrl = this.getAttribute('data-image');
      const url = this.getAttribute('data-url');

      modalTitle.textContent = title;
      modalDate.textContent = date;
      modalImage.src = imageUrl;
      modalLink.href = url;

      modal.style.display = 'block';
    });
  });

  // Close Modal
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Click outside to close
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});