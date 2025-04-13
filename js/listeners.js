// Track clicks and page views across HTML tags and CSS objects
document.addEventListener('DOMContentLoaded', function() {
    // Function to log events
    function logEvent(eventType, element) {
      const timestamp = new Date().toISOString();
      
      // Determine the event object type
      let objectType = 'unknown';
      
      if (element.tagName) {
        if (element.tagName.toLowerCase() === 'img') {
          objectType = 'image';
        } else if (element.tagName.toLowerCase() === 'a') {
          objectType = 'hyperlink';
        } else if (element.tagName.toLowerCase() === 'button') {
          objectType = 'button';
        } else if (element.tagName.toLowerCase() === 'select') {
          objectType = 'drop-down';
        } else if (element.tagName.toLowerCase() === 'textarea') {
          objectType = 'text area';
        } else if (element.tagName.toLowerCase() === 'p') {
          objectType = 'text';
        } else if (element.tagName.toLowerCase() === 'input') {
          objectType = 'input field';
        } else if (element.tagName.toLowerCase() === 'h1' || 
                  element.tagName.toLowerCase() === 'h2' ||
                  element.tagName.toLowerCase() === 'h3') {
          objectType = 'heading';
        } else if (element.tagName.toLowerCase() === 'div' || 
                  element.tagName.toLowerCase() === 'section') {
          objectType = 'container';
        } else {
          objectType = element.tagName.toLowerCase();
        }
      }
      
      // Log the event in the requested format
      console.log(`${timestamp}, ${eventType}, ${objectType}`);
    }
  
    // Track all clicks
    document.addEventListener('click', function(event) {
      logEvent('click', event.target);
    });
  
    // Track page views using Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          logEvent('view', entry.target);
        }
      });
    }, {
      threshold: 0.5 // Element is considered viewed when 50% visible
    });
  
    // Observe all significant elements
    document.querySelectorAll('div, p, img, h1, h2, h3, a, button, section, nav, main, header').forEach(element => {
      observer.observe(element);
    });
    
    // Log initial page view
    console.log(`${new Date().toISOString()}, view, page`);
  });