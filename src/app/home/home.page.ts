import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Product } from '../interfaces/product';
import { FirebaseService } from '../services/firebase.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lista = [];
  image = 'https://cdn.pixabay.com/photo/2016/11/19/20/55/apples-1841132_960_720.jpg'

  constructor(
    private alertCtrl: AlertController,
    private fire: FirebaseService,
    private utilService: UtilService
  ) { }


  ngOnInit(): void {
    this.fire.getAllProducts().subscribe(results => this.lista = results);
  }

  //Modo do botão excluir
  productDel(id) {
    try {
      this.utilService.load('Excluindo Produto. Aguarde...', 2000)
      this.fire.delProduct(id);
    } catch (err) {
      this.utilService.toast(err, 'bottom', 2000);
    }

  }

  //Método Alert do botão ion-fab
  async alertAdd() {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Cadastrar Produtos:',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome do Produto:'
        },

        {
          name: 'quantidade',
          type: 'text',
          placeholder: 'Quantidade:'
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.utilService.toast('Cancelado', 'bottom', 'danger');
          }
        },
        {
          text: 'Cadastrar',
          handler: (form) => {
            let product: Product = { nome: form.nome, qtd: form.quantidade, status: false };
            try {
              //this.utilService.load('Cadastrando Produto. Aguarde...', 2000);
              this.fire.addProducts(product);
            } catch (err) {
              this.utilService.load(err, 2000);
            }finally{
              this.utilService.toast('Produto Cadastrado com sucesso!', 'bottom', 'success');
            }

          }
        }
      ]
    });

    await alert.present();
  }
}
