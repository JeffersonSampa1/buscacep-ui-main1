import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { CnpjService } from './cnpj.service';


@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']
})
export class CnpjComponent implements OnInit {
  @Input() titleHome = 'Consultando CNPJ';
  buscacnpj: string = '';
  buscar: boolean = false;
  constructor(
    private cnpjService: CnpjService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Buscando CNPJ');
  }

  buscarCNPJ(buscacnpj: any, form: any) {
    if (buscacnpj !== null && buscacnpj !== '' && buscacnpj >= 14) {
      this.cnpjService.consultaCNPJ(buscacnpj).subscribe({
        next: (dados: any) => {
          this.buscar = true;
          setTimeout(() => {
            this.populaCNPJForm(dados, form);
            console.log('cheguei aqui');
          }, 100);
        },
        error: (e: any) => {
          this.resetaCNPJForm(form);
          this.buscar = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao busca CNPJ!'
          });
        }
      })
    }
  }

  populaCNPJForm(dados: any, formulario: any) {
    console.log('entrei no populacnpj');
    console.log('dados antes', dados);
    formulario.form.patchValue({
      cep: dados.cep,
      nome_fantasia: dados.nome_fantasia,
      razao_social: dados.razao_social,
      logradouro: dados.logradouro,
      municipio: dados.municipio,
      bairro: dados.bairro,
      uf: dados.uf
    })
    console.log('dados depois', dados);
  }

  resetaCNPJForm(formulario: any) {
    formulario.form.patchValue({
      logradouro: null,
      cidade: null,
      bairro: null,
      estado: null
    })
    this.buscar = false;
  }
}
