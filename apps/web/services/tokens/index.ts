import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const TokenType = {
  Access: 'access_token',
  Refresh: 'refresh_token',
};

const ProviderAccountId = 'provider_account_id';

export class TokenService {
  private _cookieStore: ReadonlyRequestCookies;
  constructor(_cookieStore: ReadonlyRequestCookies) {
    this._cookieStore = _cookieStore;
  }

  setAccessToken(token: string, expiresAt?: number) {
    this._cookieStore.set(TokenType.Access, token, {
      httpOnly: true,
      path: '/',
      expires: expiresAt ? expiresAt : undefined,
      sameSite: 'strict',
    });
  }

  setRefreshToken(token: string) {
    this._cookieStore.set(TokenType.Refresh, token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    });
  }

  setProviderAccountId(accountId: string) {
    this._cookieStore.set(ProviderAccountId, accountId, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    });
  }

  getAccessToken() {
    return this._cookieStore.get(TokenType.Access)?.value || '';
  }

  getRefreshToken() {
    return this._cookieStore.get(TokenType.Refresh)?.value || '';
  }

  getProviderAccountId() {
    return this._cookieStore.get(ProviderAccountId)?.value || '';
  }

  deleteTokens() {
    this._cookieStore.delete(TokenType.Access);
    this._cookieStore.delete(TokenType.Refresh);
  }

  deleteProviderAccountId() {
    this._cookieStore.delete(ProviderAccountId);
  }

  deleteAll() {
    this.deleteTokens();
    this.deleteProviderAccountId();
  }

  get cookieStore() {
    return this._cookieStore;
  }
}
