export class receita {

    id: number
    tipo_conta: string
    data: Date
    descricao: string
    valor: number


    constructor(id? : number ,tipo_conta?: string, data?: Date, descricao?: string, valor?: number ) {
        this.id = id
        this.tipo_conta = tipo_conta
        this.data = data
        this.descricao = descricao
        this.valor = valor
    }
}