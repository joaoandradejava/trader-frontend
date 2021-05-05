export class TraderAutenticado {
  id: number;
  token: string;
  isAdmin: boolean;

  constructor(id: number, token: string, isAdmin) {
    this.id = id;
    this.token = token;
    this.isAdmin = isAdmin;
  }
}
