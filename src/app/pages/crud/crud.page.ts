import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  id: number;

    //exportation des valeurs des champs sur au niveau du html
    your_name: string = "";
    monPrenom: string = "";
    gender: string = "";
    email_address: string = "";
    password: string = "";
    confirm_pass: string = "";
    monTel: number;
    Role: string = "Admin";
    disabledButton: boolean;
    mobilPattern = "^((\\+91-?)|0)?[0-9]{8}$";
    mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    typeExam: string;
  Exam: string;
  value: string;


  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;

      if (this.id != 0) {
        this.loadUser();
      }
    })
  }

  backToLogin() {
    this.router.navigate(['/home']);
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

    //fonction de rafraichissement de la page
    async doRefresh(event) {
      const loader = await this.loadingCtrl.create({
        message: 'Patientez SVP!...........',
      });
      loader.present();
      this.ionViewDidEnter();
      event.target.complete();
    }

  loadUser() {
    return new Promise(resolve => {
      let body = {
        aksi: 'load_single_data',
        id: this.id,
      }
      this.accsPrvds.postData(body).subscribe((res: any) => {
        this.your_name = res.result.your_name;
        this.gender = res.result.gender;
        this.email_address = res.result.email_address;
        });
      });
  
  }
  
  openLogin() {
    this.router.navigate(['/login']);
  }
  

  async crudAction(p) {
    console.log("++++++++++**************************** : ", p);
    if (this.your_name == "" && p == "proses_crud") {
      this.presentToast('Votre nom est requis');
    } else if (this.monPrenom == "" && p == "proses_crud") {
      this.presentToast('Votre prenom est requis')
    } else if (this.email_address == "" && p == "proses_crud") {
      this.presentToast('Vérifiez votre adresse mail');
    } else if (this.password == "" && p == "proses_crud") {
      this.presentToast('Votre mot de passe est requis');
    } else if (this.confirm_pass != this.password && p == "proses_crud") {
      this.presentToast('Recopier votre mot de passe');
    } else if (this.monTel == null && p == "proses_crud") { 
      this.presentToast('Votre numéro doit être constitué de 8 chiffres');
    } else if (this.typeExam == "" && p == "proses_crud_type_exam") {
      this.presentToast('Ecrivez un nom SVP!');
    }else if (this.Exam == "" && p == "proses_crud_exams") {
      this.presentToast('Ecrivez un nom SVP!');
    }
    else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Veillez patienter...........',
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: p,
          your_name: this.your_name,
          monprenom: this.monPrenom,
          email_address: this.email_address,
          password: this.password,
          montel: this.monTel,
          role: this.Role,
          typeexam: this.typeExam,
          exams: this.Exam,
          action: 'Create',
        }
        this.accsPrvds.postData(body).subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/crud/:id']);
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
      position: 'top'
    });
    toast.present();
    
  }

  
    async presentAlert(a) {
      const alert = await this.alertCtrl.create({
        header: a,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Close',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          },{
            text: 'Try Again',
            handler: () => {
              this.crudAction(a);
            }
          }
        ]
      });
  
      await alert.present();
    }
    

    //Fonction asynchronne pour la deconnexion
    async prosesLogout() {
      this.storage.clear();
      this.navCtrl.navigateRoot('/login');
      const toast = await this.toastCtrl.create({
        message: 'Logout successfuly',
        duration: 1500,
      });
      toast.present(); 
    }

  
}
