document.addEventListener('DOMContentLoaded', function() {
  
  function getHash() {
    // Remove the '#'
    return window.location.hash.substring(1);
  }

  function closeAllDialogs() {
    document.querySelectorAll('dialog').forEach(dialog => {
      if (dialog.open) {
        dialog.close();
      }
    });
  }

  function handleHashChange() {
    const hash = getHash();
    
    // If we have a hash, find the dialog
    if (hash) {
      const dialog = document.getElementById(hash);
      if (dialog && !dialog.open) {
        // Close others just in case
        closeAllDialogs();
        dialog.showModal();
      } else if (!dialog) {
        // Hash exists but no dialog found (maybe bad link), close all
        closeAllDialogs();
      }
    } else {
      // No hash, close all
      closeAllDialogs();
    }
  }

  // Handle initial load
  handleHashChange();

  // Handle hash changes
  window.addEventListener('hashchange', handleHashChange);

  // Close when clicking outside (backdrop)
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', function(event) {
      // If the target is the dialog element itself, it's the backdrop
      if (event.target === dialog) {
        window.location.hash = ''; // This will trigger hashchange and close it
      }
    });

    dialog.addEventListener('cancel', function() {
      window.location.hash = ''; // Clear hash on Escape key
    });

    dialog.addEventListener('close', function() {
      // Stop any iframes (like Bandcamp) by refreshing their src
      const iframes = dialog.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        const src = iframe.src;
        iframe.src = '';
        iframe.src = src;
      });
    });

    // Also handle close button explicitly if we want to prevent default jump behavior
    // although href="#" usually does the job of clearing specific hash.
    const closeBtn = dialog.querySelector('.close-button');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        // Let the href="#" do its work, or preventDefault and set hash manually
        // e.preventDefault();
        // window.location.hash = '';
      });
    }
  });
});
