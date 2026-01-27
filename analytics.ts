declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

/**
 * Pushes a generic event to the dataLayer
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
    
    // Check if we are in a local environment for debugging without using process.env
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
      console.log('GTM Event Tracked:', eventName, params);
    }
  }
};

/**
 * Tracks a page view
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
};

/**
 * Specific event helpers based on requirements
 */

export const trackButtonClick = (buttonName: string, destination?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    destination: destination,
  });
};

export const trackLinkClick = (linkName: string, href: string) => {
  trackEvent('link_click', {
    link_name: linkName,
    href: href,
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  });
};

export const trackServiceClick = (serviceName: string) => {
  trackEvent('service_click', {
    service_name: serviceName,
  });
};

export const trackBlogPostView = (postTitle: string, category: string) => {
  trackEvent('blog_post_view', {
    post_title: postTitle,
    category: category,
  });
};