// Performance Optimized JavaScript with Error Handling - Faith Miracle Assembly

// Cache DOM elements to avoid repeated queries
const DOM = {
  slides: null,
  video: null,
  menu: null,
  footer: null,
  header: null,
  init() {
    this.slides = document.querySelectorAll('.slide');
    this.video = document.querySelector('.header-video');
    this.menu = document.getElementById('mobileMenu');
    this.footer = document.querySelector('.site-footer');
    this.header = document.querySelector('header');
  }
};

// Slideshow functionality with performance optimizations
class SlideShow {
  constructor() {
    this.slideIndex = 0;
    this.slideInterval = null;
    this.isInitialized = false;
  }

  init() {
    if (!DOM.slides || !DOM.video || this.isInitialized) {
      console.warn('SlideShow: Required elements not found or already initialized');
      return;
    }
    
    // Reset all slides
    DOM.slides.forEach(slide => {
      slide.style.opacity = '0';
      slide.classList.remove('active');
    });

    this.isInitialized = true;
    this.bindEvents();
  }

  bindEvents() {
    // Use passive event listeners for better performance
    if (DOM.video) {
      DOM.video.addEventListener('ended', () => this.start(), { passive: true });
    }
  }

  start() {
    this.slideIndex = 0;
    
    if (DOM.slides[this.slideIndex]) {
      DOM.slides[this.slideIndex].style.opacity = '1';
      DOM.slides[this.slideIndex].classList.add('active');
    }

    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    if (!DOM.slides[this.slideIndex]) return;

    DOM.slides[this.slideIndex].classList.remove('active');
    DOM.slides[this.slideIndex].style.opacity = '0';

    this.slideIndex++;
    
    if (this.slideIndex < DOM.slides.length) {
      DOM.slides[this.slideIndex].classList.add('active');
      DOM.slides[this.slideIndex].style.opacity = '1';
    } else {
      this.stop();
      this.resetToVideo();
    }
  }

  stop() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  resetToVideo() {
    setTimeout(() => {
      DOM.slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
      });
      
      if (DOM.video) {
        DOM.video.currentTime = 0;
        DOM.video.play().catch(e => console.log('Video autoplay prevented:', e));
      }
    }, 1000);
  }
}

// Mobile menu functionality
class MobileMenu {
  static toggle() {
    if (DOM.menu) {
      DOM.menu.classList.toggle('show');
    } else {
      console.warn('Mobile menu element not found');
    }
  }
}

// Performance optimizations
class PerformanceOptimizer {
  static init() {
    this.addLastUpdated();
    this.optimizeMobileHeader();
    this.setBackgroundImages();
    this.setupIntersectionObserver();
  }

  static addLastUpdated() {
    if (!DOM.footer) {
      console.warn('Footer element not found for last updated timestamp');
      return;
    }

    try {
      const lastUpdated = new Date(document.lastModified);
      const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

      const formattedDate = lastUpdated.toLocaleDateString(undefined, dateOptions);
      const formattedTime = lastUpdated.toLocaleTimeString(undefined, timeOptions);

      const updatedPara = document.createElement('p');
      updatedPara.textContent = `Last updated: ${formattedDate}, ${formattedTime}`;
      updatedPara.style.cssText = 'font-size: 0.8rem; color: #fff; margin-top: 5px;';

      DOM.footer.appendChild(updatedPara);
    } catch (error) {
      console.error('Error adding last updated timestamp:', error);
    }
  }

  static optimizeMobileHeader() {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      if (window.innerWidth <= 600 && DOM.header) {
        DOM.header.style.height = '970px';
        DOM.header.style.backgroundSize = 'cover';
      }
    });
  }

  static setBackgroundImages() {
    // Use requestAnimationFrame to avoid layout thrashing
    requestAnimationFrame(() => {
      const leadPastorSection = document.querySelector(".lead-pastor-section");
      if (leadPastorSection) {
        leadPastorSection.style.cssText += `
          background-image: url('Images/image2.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `;
      }

      const greatnessSection = document.querySelector(".greatness-section");
      if (greatnessSection) {
        greatnessSection.style.cssText += `
          background-image: url('Images/image7.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `;
      }
    });
  }

  // Intersection Observer for lazy loading optimization
  static setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}

// Error handling wrapper
function safeExecute(fn, context = 'Unknown') {
  try {
    return fn();
  } catch (error) {
    console.error(`Error in ${context}:`, error);
    return null;
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  safeExecute(() => {
    DOM.init();
    
    const slideShow = new SlideShow();
    slideShow.init();
    
    PerformanceOptimizer.init();
  }, 'DOMContentLoaded initialization');
}, { passive: true });

// Global function for mobile menu (keeping for backward compatibility)
function toggleMenu() {
  safeExecute(() => {
    MobileMenu.toggle();
  }, 'toggleMenu');
}

// Optimize window load event
window.addEventListener('load', () => {
  safeExecute(() => {
    PerformanceOptimizer.optimizeMobileHeader();
  }, 'window load optimization');
}, { passive: true });

// Add resize handler with debouncing for better performance
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    safeExecute(() => {
      PerformanceOptimizer.optimizeMobileHeader();
    }, 'resize optimization');
  }, 250);
}, { passive: true });

// Expression page specific functionality
if (window.location.pathname.includes('expression.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    safeExecute(() => {
      // Any expression page specific code can go here
      console.log('Expression page loaded successfully');
    }, 'Expression page initialization');
  });
}
// Image Uniformity Manager - Ensures all flyer images display content properly
class ImageUniformityManager {
  constructor() {
    this.flyerItems = [];
    this.isInitialized = false;
    this.resizeTimeout = null;
  }

  init() {
    if (this.isInitialized) return;
    
    this.flyerItems = document.querySelectorAll('.flyer-grid .flyer-item img');
    
    if (this.flyerItems.length === 0) {
      console.warn('No flyer images found');
      return;
    }

    this.isInitialized = true;
    this.setupImageHandling();
    this.bindEvents();
  }

  setupImageHandling() {
    // Wait for all images to load before calculating dimensions
    const imagePromises = Array.from(this.flyerItems).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(img);
        } else {
          img.addEventListener('load', () => resolve(img), { once: true });
          img.addEventListener('error', () => resolve(img), { once: true });
        }
      });
    });

    Promise.all(imagePromises).then(() => {
      this.calculateOptimalDimensions();
      this.applyUniformSizing();
    });
  }

  calculateOptimalDimensions() {
    let maxWidth = 0;
    let maxHeight = 0;
    const aspectRatios = [];

    // Calculate dimensions and aspect ratios for all images
    this.flyerItems.forEach(img => {
      const naturalWidth = img.naturalWidth || img.width;
      const naturalHeight = img.naturalHeight || img.height;
      
      if (naturalWidth && naturalHeight) {
        maxWidth = Math.max(maxWidth, naturalWidth);
        maxHeight = Math.max(maxHeight, naturalHeight);
        aspectRatios.push(naturalWidth / naturalHeight);
      }
    });

    // Find the most common aspect ratio or use average
    const avgAspectRatio = aspectRatios.reduce((sum, ratio) => sum + ratio, 0) / aspectRatios.length;
    
    // Calculate optimal container dimensions based on viewport
    const containerWidth = this.getOptimalContainerWidth();
    const containerHeight = containerWidth / avgAspectRatio;

    this.optimalDimensions = {
  width: containerWidth,
  height: Math.max(containerHeight, 280), // UPDATED: Increased minimum height
  aspectRatio: avgAspectRatio
};

  getOptimalContainerWidth() {
  const viewport = window.innerWidth;
  const gridContainer = document.querySelector('.flyer-grid');
  
  if (!gridContainer) return 400; // UPDATED: Increased default width

  const containerStyle = window.getComputedStyle(gridContainer);
  const containerWidth = gridContainer.offsetWidth - 
                        parseFloat(containerStyle.paddingLeft) - 
                        parseFloat(containerStyle.paddingRight);
  
  // Calculate width based on grid columns - WIDER SIZING
  if (viewport <= 768) {
    // Single column on mobile - much wider
    return Math.min(containerWidth - 20, 500); // UPDATED: Increased from 400 to 500
  } else if (viewport <= 1024) {
    // Tablet size - wider
    return Math.min((containerWidth - 30) / 2, 450); // UPDATED: Added tablet breakpoint
  } else {
    // Desktop - significantly wider
    return Math.min((containerWidth - 30) / 2, 500); // UPDATED: Increased from 350 to 500
  }
}

  applyUniformSizing() {
    if (!this.optimalDimensions) return;

    const { width, height } = this.optimalDimensions;

    // Apply uniform sizing to all flyer items
    this.flyerItems.forEach((img, index) => {
      const container = img.closest('.flyer-item');
      if (!container) return;

      // Set container dimensions
      container.style.width = `${width}px`;
      container.style.height = `${height}px`;
      container.style.overflow = 'hidden';
      container.style.position = 'relative';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';

      // Calculate the best fit for the image
      this.fitImageToContainer(img, container, width, height);
    });

    // Update grid layout to accommodate new dimensions
    this.updateGridLayout();
  }

  fitImageToContainer(img, container, containerWidth, containerHeight) {
    const naturalWidth = img.naturalWidth || img.width;
    const naturalHeight = img.naturalHeight || img.height;
    
    if (!naturalWidth || !naturalHeight) return;

    const imageAspectRatio = naturalWidth / naturalHeight;
    const containerAspectRatio = containerWidth / containerHeight;

    let finalWidth, finalHeight;

    if (imageAspectRatio > containerAspectRatio) {
      // Image is wider - fit to height to show all content
      finalHeight = containerHeight;
      finalWidth = finalHeight * imageAspectRatio;
    } else {
      // Image is taller - fit to width to show all content
      finalWidth = containerWidth;
      finalHeight = finalWidth / imageAspectRatio;
    }

    fitImageToContainer(img, container, containerWidth, containerHeight) {
  const naturalWidth = img.naturalWidth || img.width;
  const naturalHeight = img.naturalHeight || img.height;
  
  if (!naturalWidth || !naturalHeight) return;

  const imageAspectRatio = naturalWidth / naturalHeight;
  const containerAspectRatio = containerWidth / containerHeight;

  let finalWidth, finalHeight;

  // Enhanced fitting algorithm for better content display
  if (imageAspectRatio > containerAspectRatio) {
    // Image is wider - fit to height but allow some width overflow for better content visibility
    finalHeight = containerHeight;
    finalWidth = finalHeight * imageAspectRatio;
    
    // If the width is much larger, scale down slightly to fit more content
    if (finalWidth > containerWidth * 1.2) {
      finalWidth = containerWidth * 1.1; // Allow 10% overflow
      finalHeight = finalWidth / imageAspectRatio;
    }
  } else {
    // Image is taller - fit to width
    finalWidth = containerWidth;
    finalHeight = finalWidth / imageAspectRatio;
    
    // If height is much larger, scale down slightly
    if (finalHeight > containerHeight * 1.2) {
      finalHeight = containerHeight * 1.1; // Allow 10% overflow
      finalWidth = finalHeight * imageAspectRatio;
    }
  }

  // Apply styles to ensure content is visible with minimal cropping
  img.style.width = `${finalWidth}px`;
  img.style.height = `${finalHeight}px`;
  img.style.objectFit = 'cover'; // UPDATED: Changed from 'contain' to 'cover'
  img.style.objectPosition = 'center';
  img.style.maxWidth = 'none';
  img.style.maxHeight = 'none';

  // Center the image
  img.style.position = 'absolute';
  img.style.top = '50%';
  img.style.left = '50%';
  img.style.transform = 'translate(-50%, -50%)';
}
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';

    // If image is smaller than container, center it
    if (finalWidth < containerWidth || finalHeight < containerHeight) {
      img.style.position = 'absolute';
      img.style.top = '50%';
      img.style.left = '50%';
      img.style.transform = 'translate(-50%, -50%)';
    }
  }

  updateGridLayout() {
    const grid = document.querySelector('.flyer-grid');
    if (!grid || !this.optimalDimensions) return;

    const { width } = this.optimalDimensions;
    const gap = 30;
    const viewport = window.innerWidth;

    if (viewport <= 768) {
      // Single column on mobile
      grid.style.gridTemplateColumns = '1fr';
      grid.style.justifyItems = 'center';
    } else {
      // Two columns on desktop
      grid.style.gridTemplateColumns = `repeat(2, ${width}px)`;
      grid.style.justifyContent = 'center';
    }

    grid.style.gap = `${gap}px`;
  }

  bindEvents() {
    // Handle window resize with debouncing
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.calculateOptimalDimensions();
        this.applyUniformSizing();
      }, 250);
    }, { passive: true });

    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.calculateOptimalDimensions();
        this.applyUniformSizing();
      }, 500);
    }, { passive: true });
  }

  // Method to manually refresh if images are updated dynamically
  refresh() {
    this.flyerItems = document.querySelectorAll('.flyer-grid .flyer-item img');
    this.setupImageHandling();
  }
}

// Initialize the Image Uniformity Manager
let imageUniformityManager;

// Update the existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  safeExecute(() => {
    DOM.init();
    
    const slideShow = new SlideShow();
    slideShow.init();
    
    PerformanceOptimizer.init();
    
    // Initialize Image Uniformity Manager
    imageUniformityManager = new ImageUniformityManager();
    imageUniformityManager.init();
    
  }, 'DOMContentLoaded initialization');
}, { passive: true });

// Add to window load event for additional safety
window.addEventListener('load', () => {
  safeExecute(() => {
    PerformanceOptimizer.optimizeMobileHeader();
    
    // Ensure images are properly sized after everything loads
    if (imageUniformityManager) {
      setTimeout(() => {
        imageUniformityManager.refresh();
      }, 100);
    }
    
  }, 'window load optimization');
}, { passive: true });