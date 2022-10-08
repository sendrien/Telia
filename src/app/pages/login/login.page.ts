import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  email: string = "";
  mdp: string = "";
  tel: number;
  mobilPattern = "^((\\+91-?)|0)?[0-9]{8}$";
  disabledButton: boolean;


  constructor( 
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,

  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }
  
// Fonction sur le click du boutton Nouveau login.html
  Register() {
    this.router.navigate(['/register']);
  }

  returnAccueil() {
    this.router.navigate(['/preface']);
  }

  async tryLogin() {
        const loader = await this.loadingCtrl.create({
          message: 'Patientez....',
        });
        loader.present();
        return new Promise(resolve => {
          let body = {
            aksi: 'proses_log',
            email: this.email,
            tel: this.tel,
            mdp: this.mdp,
          }
          this.accsPrvds.postData(body).subscribe((res: any) => {
            if(res.success == true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Connexion réussie');
              this.storage.set('storage_xxx', res.result); /* create storage session */
              this.navCtrl.navigateRoot('/home');
            }else{
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Vérifiez vos identifiants');
            }
          },(err)=>{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Vérifiez votre connexion');
            this.storage.clear();
          });
        });
      
    }
  
    async presentToast(a) {
      const toast = await this.toastCtrl.create({
        message: a,
        duration: 1500,
        position: 'top',
        cssClass: 'toast-1-css',
      });
      toast.present(); 
    }

    
}


