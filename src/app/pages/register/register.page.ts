import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //exportation des valeurs des champs sur au niveau du html
  your_name: string = "";
  monPrenom: string = "";
  gender: string = "";
  email_address: string = "";
  age: number = null;
  password: string = "";
  confirm_pass: string = "";
  monTel: number;
  disabledButton: boolean;
  mobilPattern = "^((\\+91-?)|0)?[0-9]{11}$";
  mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  backToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }


  async tryRegister() {
    console.log("Aggggggggggggge:", this.age, this.monTel)
    if (this.your_name == "") {
      this.presentToast('Votre nom est requis');
    } else if (this.monPrenom == "") {
      this.presentToast('Votre prenom est requis')
    }else if (this.gender == "") {
      this.presentToast('Votre genre est requis');
    }else if (this.age == null ) { 
      this.presentToast('Votre date de naissance (aaaa/mm/jj)')
    }else if (this.email_address == "") {
      this.presentToast('Vérifiez votre adresse mail');
    } else if (this.password == "") {
      this.presentToast('Votre mot de passe est requis');
    } else if (this.confirm_pass != this.password ) {
      this.presentToast('Recopier votre mot de passe');
    } else if (this.monTel == null ) { 
      this.presentToast('Votre numéro doit être constitué de 8 chiffres')
    }else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Veillez patienter !',
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: 'proses_register',
          your_name: this.your_name,
          monprenom: this.monPrenom,
          gender: this.gender,
          monage: this.age,
          email_address: this.email_address,
          password: this.password,
          montel: '+'+226+this.monTel
        }
        this.accsPrvds.postData(body).subscribe((res: any) => {
          console.log("EEEESSSS: ", res)
          this.presentToast(res.success);

          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = true;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
          }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Timeout');
        });
      });
    }

  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position:'top',
      cssClass: 'toast-1-css',
    });
    toast.present();
  }

  
  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Fermer',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },{
          text: 'Réessayez',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });
  
      await alert.present();
    }
    



}
