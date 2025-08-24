
export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Auth: {
    Base: '/auth',
    Google: '/google',
    GoogleCallback: '/google/callback',
  },
} as const;
