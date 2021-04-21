import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { receita } from './receita'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  receita: receita = new receita()
  receitas: receita[] = []
  tabela: [] = []
  valores = new Array()

  //chama a função inicial que pega as coisas no local storage e mostra na web
  ngOnInit(){
    this.iniciarTabela()
  }

  iniciarTabela() {

    //pega o que esta no local storage para que seja comparado no if abaixo
    this.tabela = JSON.parse(localStorage.getItem("dados"))

    //se tiver algo no local storage ele entra no if
    if (this.tabela.length > 0) {

      //pega os valores do local storage e passa pra json e poem na variavel this.receitas
      this.receitas = JSON.parse(localStorage.getItem("dados"))

      //roda um for dentro do this.receita para pegar os valores que estão la e por no this.valores, para que toda vez que a pessoa entre no site,
      //esteja salvo a ultima coisa que ela fez e possa continuar a partir dali
      this.receitas.forEach(elemento => 
        this.valores.push(elemento)
      )

      this.mostrarSaldoPositivoDashboard()

      this.mostrarSaldoPositivoNegativo()

      this.mostrarSaldoTotalDashboard()

    }
  }

  mostrarSaldoPositivoDashboard() {
    //mostra saldo positivo na dashboard
    const positivo = document.getElementById('saldo-positivo')
    positivo.innerText = localStorage.getItem('saldo_positivo') + ' R$'
  }

  mostrarSaldoPositivoNegativo() {
    //mostra saldo negativo na dashboard
    const negativo = document.getElementById('saldo-negativo')
    negativo.innerText = localStorage.getItem('saldo_negativo') + ' R$'
  }

  mostrarSaldoTotalDashboard() {
    //mostra o saldo total na dashboard
    const total = document.getElementById('saldo-total')
    total.innerText = parseInt(localStorage.getItem('saldo_positivo')) + parseInt(localStorage.getItem('saldo_negativo')) + ' R$'
  }

  resultado = 0
  resultado_negativo = 0
  saveData(form) {

    if (!this.receita.id) {
      this.receita.id = (new Date()).getTime()
      this.receitas.push(this.receita)

    } else {
      let oldreceita = this.receitas.find(s => s.id === this.receita.id)
      oldreceita.tipo_conta = this.receita.tipo_conta
      oldreceita.descricao = this.receita.descricao
      oldreceita.valor = this.receita.valor
    }

    //pega o id no html para enjetar as coisas do local storage e aparecer na tela
    const positivo = document.getElementById('saldo-positivo')
    const negativo = document.getElementById('saldo-negativo')

    //se o tipo for receita ele ira somar ao valor que esta lá
    if (this.receita.tipo_conta == 'Receita'){

      let valores_localstorage = JSON.parse(localStorage.getItem("saldo_positivo"))

      let valor = this.receita.valor + valores_localstorage
      positivo.innerText = valor.toString() + ' R$'
      this.resultado = valor
      localStorage.setItem('saldo_positivo', this.resultado.toString())

      const total = document.getElementById('saldo-total')
      total.innerText = parseInt(localStorage.getItem("saldo_positivo")) + parseInt(localStorage.getItem("saldo_negativo")) + ' R$'

      //se o tipo for despesa ele ira subtrair ao valor que esta lá
    } 
    if (this.receita.tipo_conta == 'Despesa'){
      
      let valores_localstorage = JSON.parse(localStorage.getItem("saldo_negativo"))

      let valor = valores_localstorage - this.receita.valor
      negativo.innerText = valor.toString() + ' R$'
      this.resultado = valor
      localStorage.setItem('saldo_negativo', this.resultado.toString())

      const total = document.getElementById('saldo-total')
      total.innerText = parseInt(localStorage.getItem("saldo_positivo")) + parseInt(localStorage.getItem("saldo_negativo")) + ' R$'

    }

    //injeta no this.valores para que seja salvo no local storage
    this.valores.push(
      this.receita
    )

    this.receitas.push
    localStorage.setItem('dados', JSON.stringify(this.valores))

    this.receita = new receita()
    form.resetForm()
  }


  //edita os valores de cada item da tabela
  editReceita(rec: receita) {
    this.receita = new receita(
      rec.id,
      rec.tipo_conta,
      rec.data,
      rec.descricao,
      rec.valor
    )

  }

  removeReceita(rec: receita) {
    let index = this.receitas.findIndex(s => s.id === rec.id)
    this.receitas.splice(index, 1)

  }


}