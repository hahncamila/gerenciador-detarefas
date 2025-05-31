type JwtPayload = {
  upn: string;
  groups: string[];
  exp: number;
};

function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const decoded = JSON.parse(payload);
    return decoded;
  } catch (e) {
    console.error("Erro ao decodificar JWT:", e);
    return null;
  }
}

export function getUserRoles(): string[] {
  const token = localStorage.getItem("token");
  if (!token) return [];

  const decoded = parseJwt(token);
  return decoded?.groups || [];
}

export function isAdmin(): boolean {
  const roles = getUserRoles();
  return roles.includes("ADMIN");
}
