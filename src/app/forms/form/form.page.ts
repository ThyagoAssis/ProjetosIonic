import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  image = 'https://cdn.pixabay.com/photo/2016/11/19/20/55/apples-1841132_960_720.jpg';
  routerId: string = null;
  product =  {}
  constructor(
    private activedRouter: ActivatedRoute,
    private fireBase: FirebaseService,
    private utilService: UtilService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.routerId = this.activedRouter.snapshot.params['id'];

    if(this.routerId){
      this.fireBase.getProduct(this.routerId).subscribe(results => this.product = results);
    }
  }

  //Método de atualização
  onSubmit(formUp){
    this.fireBase.upProduct(this.routerId,formUp.value);
    this.utilService.load('Atualizando os dados. Aguarde...', 2000);
    this.navCtrl.navigateBack('/home');
  }


}
