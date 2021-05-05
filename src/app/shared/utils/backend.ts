export class Backend {
  private static get getBaseUrl(): string {
    return 'https://trader-back-end.herokuapp.com/';
  }

  public static get getBaseLogin(): string {
    return `${this.getBaseUrl}login`;
  }

  public static get getBaseTrader(): string {
    return `${this.getBaseUrl}traders`;
  }

  public static get getBaseAcao(): string {
    return `${this.getBaseUrl}acoes`;
  }
}
