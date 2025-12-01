import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  // Get the base URL from the request
  const protocol = request.headers.get('x-forwarded-proto') || 
                   (request.headers.get('host')?.includes('localhost') ? 'http' : 'https');
  const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  if (!code) {
    // Return error script if no code provided
    const errorScript = `
(function() {
  console.error('TrakoShip Widget: Missing code parameter. Please add ?code=YOUR_USER_ID to the script URL.');
})();
`;
    return new NextResponse(errorScript, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // Generate the widget script dynamically
  const widgetScript = `
(function() {
  'use strict';
  
  // Configuration from URL parameter
  const userId = '${code.replace(/'/g, "\\'")}';
  const baseUrl = '${baseUrl.replace(/'/g, "\\'")}';
  const containerId = 'trakoship-widget-' + Math.random().toString(36).substr(2, 9);
  
  // Wait for DOM to be ready
  function initWidget() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWidget);
    } else {
      createWidget();
    }
  }
  
  function createWidget() {
    // Create container div if it doesn't exist
    let container = document.getElementById(containerId);
    
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.width = '100%';
      container.style.minHeight = '400px';
      
      // Try to find a good place to insert the widget
      // First, try to find script tag and insert after it
      const scripts = document.getElementsByTagName('script');
      if (scripts.length > 0) {
        const lastScript = scripts[scripts.length - 1];
        lastScript.parentNode?.insertBefore(container, lastScript.nextSibling);
      } else {
        // Fallback: append to body
        document.body.appendChild(container);
      }
    }
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = baseUrl + '/embed/search?userId=' + encodeURIComponent(userId);
    iframe.style.width = '100%';
    iframe.style.height = '700px';
    iframe.style.border = '1px solid #e2e8f0';
    iframe.style.borderRadius = '0.5rem';
    iframe.frameBorder = '0';
    iframe.scrolling = 'auto';
    iframe.setAttribute('title', 'Shipment Tracking Widget');
    iframe.setAttribute('allow', 'fullscreen');
    
    // Clear container and append iframe
    container.innerHTML = '';
    container.appendChild(iframe);
    
    // Handle responsive height
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'trakoship-resize') {
        const iframes = container.querySelectorAll('iframe');
        iframes.forEach(function(iframe) {
          iframe.style.height = event.data.height + 'px';
        });
      }
    });
  }
  
  // Initialize widget
  initWidget();
})();
`;

  return new NextResponse(widgetScript, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

