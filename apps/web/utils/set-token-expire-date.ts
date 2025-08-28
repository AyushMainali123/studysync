export function setTokenExpiration(expiresIn: number) {
  const expirationDate = new Date(Date.now() + expiresIn * 1000);
  return expirationDate;
}
