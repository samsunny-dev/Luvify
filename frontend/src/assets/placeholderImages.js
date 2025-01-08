// Function to create placeholder image data URLs
const createPlaceholder = (width, height, text, bgColor = '#FF9800') => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Draw text
  ctx.fillStyle = 'white';
  ctx.font = '20px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  return canvas.toDataURL('image/png');
};

export const placeholderImages = {
  // Landing page images
  hero: createPlaceholder(800, 600, 'Hero Image'),
  swipeCards: createPlaceholder(600, 400, 'Swipe Cards'),
  community: createPlaceholder(600, 400, 'Community'),
  events: {
    event1: createPlaceholder(400, 300, 'Event 1'),
    event2: createPlaceholder(400, 300, 'Event 2'),
    event3: createPlaceholder(400, 300, 'Event 3'),
  },
  
  // Auth pages
  login: createPlaceholder(600, 800, 'Login Illustration'),
  signup: createPlaceholder(600, 800, 'Signup Illustration'),
  
  // Profile images
  avatars: {
    default: createPlaceholder(200, 200, 'Default Avatar', '#9C27B0'),
    user1: createPlaceholder(200, 200, 'User 1', '#9C27B0'),
    user2: createPlaceholder(200, 200, 'User 2', '#9C27B0'),
    user3: createPlaceholder(200, 200, 'User 3', '#9C27B0'),
  },
  
  // Profile gallery
  gallery: {
    photo1: createPlaceholder(400, 300, 'Gallery 1'),
    photo2: createPlaceholder(400, 300, 'Gallery 2'),
    photo3: createPlaceholder(400, 300, 'Gallery 3'),
    photo4: createPlaceholder(400, 300, 'Gallery 4'),
  },
};
