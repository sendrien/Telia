import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/Storage';
import { BackButtonService } from '../../services/back-button.service';


@Component({
  selector: 'app-laboratoire',
  templateUrl: './laboratoire.page.html',
  styleUrls: ['./laboratoire.page.scss'],
})
export class LaboratoirePage implements OnInit {
  datastorage: any;
  name: string;
  datastorageStruct: string;
  datastorage1: string;
  StructName: string;
  pageName: string = "";
  value: string = "";
  examItemName: string = "";
  examName: string = "";
  users: any = [];
  limit: number = 13; //limit get data
  start: number = 0;
  index: number;
  details: any = [];
  rendezVous: any;
  detailstructure: any = [];
  hideConditionExam: boolean = true;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private navCtrl: NavController,
    private storage: Storage,
    private Back_button_service: BackButtonService,
  ) { }

  ngOnInit() {
  }

//Cette fonction permet d'afficher sur la page home les données sur l'utilisateur
  ionViewDidEnter() {
  this.storage.get('storage_xxx').then((res) => {
    this.datastorageStruct = res;
    this.StructName = this.datastorageStruct;
    //Recupère les données de la page precedente à travers le provider
    this.details = this.accsPrvds.struct;
    this.details = this.details[this.accsPrvds.datasIndex]
    this.pageName = this.accsPrvds.val;
    this.examItemName = this.accsPrvds.itemVal;
  });
  this.start = 0;
  this.users = [];
}
//Function permettant de mettre en place un temps mort
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
  }
//Celle ci permet de prendre un rendez. Elle est associée au bouton "Prendre rendez vous" actu.
//elle devra rediriger vers la page pour choisir le creno de rdv. Actu elle redirige vers la page home.
async takeDuty() {
  if (this.rendezVous == ""){
    this.presentToast('Pas de rendez vous disponible');
  }else {
      const loader = await this.loadingCtrl.create({
        message: 'Patientez....',
      });
      loader.present();
      await this.delay(6000);
      return new Promise(resolve => {
            loader.dismiss();
            //this.presentToast('Connexion réussie');
            this.navCtrl.navigateRoot('/home');
      });
    }
  }
  // Fonction de retour sur la page precedente
  backToLogin() {
    if (this.pageName == "Type de consultation") {
      this.navCtrl.navigateRoot('/typeconsultation');
    } else {
      this.navCtrl.navigateRoot('/examen');
      this.Back_button_service.init()
    }
    // Transition vers la page precedente pour rediriger vers le même nom de page
    this.accsPrvds.transitFunction(this.pageName);
  }

async presentToast(a) {
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 1500,
  });
  toast.present(); 
}

async prosesLogout() {
  this.storage.clear();
  this.navCtrl.navigateRoot('/login');
  const toast = await this.toastCtrl.create({
    message: 'Logout successfuly',
    duration: 1500,
  });
  toast.present(); 
}

functionReturn(){
  //this.navCtrl.navigateRoot('/home');
  //this.Back_button_service.init()
}














}
