import { Component } from '@angular/core';
import { receita } from './receita';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  receita: receita = new receita()
  receitas: receita[] = []

  saveData(form) {
    console.log('salvando os dados')

    if (!this.receita.id) {
      this.receita.id = (new Date()).getTime()
      this.receitas.push(this.receita)

    } else {
      let oldreceita = this.receitas.find(s => s.id === this.receita.id)
      oldreceita.tipo_conta = this.receita.tipo_conta
      oldreceita.descricao = this.receita.descricao
      oldreceita.valor = this.receita.valor
    }

    this.receita = new receita()
    form.resetForm()
  }


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