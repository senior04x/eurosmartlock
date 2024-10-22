window.onload = function() {
  // Notification 3 sekunddan keyin chiqadi
  setTimeout(() => {
      showNotification();
  }, 1500);
};

function showNotification() {
  const notification = document.getElementById('notification');
  const notificationSound = document.getElementById('notificationSound');

  // Show the notification
  notification.classList.add('show');

  // Play sound (iPhone-like notification sound)
  notificationSound.currentTime = 0; // Reset sound to the beginning
  notificationSound.play().catch(error => {
      console.log("Audio playback failed:", error);
  });

  // Hide the notification after 3 seconds
  setTimeout(() => {
      hideNotification();
  }, 3500);

  // Allow swiping up to remove the notification
  notification.addEventListener('touchstart', handleSwipe);
}

function hideNotification() {
  const notification = document.getElementById('notification');
  notification.classList.remove('show');
  notification.classList.add('hide');
}

// Allow swiping up to remove the notification
function handleSwipe(event) {
  const notification = document.getElementById('notification');
  const startY = event.touches[0].clientY;
  notification.addEventListener('touchmove', (event) => {
      const moveY = event.touches[0].clientY;
      if (moveY < startY) {
          hideNotification();
      }
  });
}
