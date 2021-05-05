export class ValidadorFormularioMensagem {
  public static mensagemCampoObrigatorio(label: string): string {
    return `Preencha o campo ${label}!`;
  }

  public static mensagemCampoTamanhoCaracteres(
    label: string,
    min: number,
    max: number
  ): string {
    return `O campo ${label} tem que ter o tamanho entre ${min} á ${max} caracteres!`;
  }

  public static mensagemEmailOuCpfInvalido(label: string): string {
    return `${label} inválido!`;
  }

  public static mensagemValorMinimo(
    label: string,
    valorMinimo: number
  ): string {
    return `O ${label} tem que ser um valor maior que ${valorMinimo - 1}`;
  }
}
