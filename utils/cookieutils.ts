
export function getCookieValue(key: string): string | undefined {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`));
  return match?.split("=")[1];
}

export function setCookie(key: string, value: string, days = 7) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${key}=${value}; path=/; max-age=${maxAge}`;
}

export function deleteCookie(key: string) {
  document.cookie = `${key}=; path=/; max-age=0`;
}
