/**
 * Page URL utilities for Next.js App Router
 */

const pageRoutes = {
  Home: '/',
  Services: '/services',
  Portfolio: '/portfolio',
  About: '/about',
  Contact: '/contact',
  Request: '/request',
  Dashboard: '/dashboard',
  Login: '/login',
  Register: '/register',
  'Create Project': '/create-project'
} as const;

export type PageName = keyof typeof pageRoutes;

/**
 * Creates a page URL from a page name
 */
export function createPageUrl(pageName: PageName): string {
  return pageRoutes[pageName] || '/';
}

/**
 * Gets the page name from a URL path
 */
export function getPageNameFromUrl(path: string): PageName | null {
  const entry = Object.entries(pageRoutes).find(([, url]) => url === path);
  return entry ? (entry[0] as PageName) : null;
}
