import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/Storage';
import { IonInfiniteScroll } from '@ionic/angular';
//import { SelectSearchableModule } from 'ionic-select-searchable';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  datastorage: any;
  datastorage1: any;
  name: string;
  typeExamenName: string;
  users: any = [];
  typeExamen: any = [];
  infos: any = [];
  bandeinfo: any = [];
  description: string = "";
  bandeMessage: string = "";
  limit: number = 13; //limit get data
  start: number = 0;
  accueil: string = "";
  itemValue: string;
  image: string="";
  done: string;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,
  
  ) {this.bandinfo();}

  ngOnInit() {
  }

//Cette fonction permet d'afficher sur la page home les données sur l'utilisateur
  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res) => {
      this.datastorage = res;
      this.name = this.datastorage.your_name;
      if (this.datastorage.gender == "H") {
        this.accueil = "monsieur";
      } else {
        this.accueil = "madame";
      }
      // pas utilisé
      this.image="./assets/consultation.png"
    });
    this.storage.get('storage_xxx').then((res) => {
      this.datastorage1 = res;
      this.typeExamenName = this.datastorage1.NomTypeExamen;
    });
    this.start = 0;
    this.users = [];
    this.typeExamen = [];
    this.loadUsers();
    this.loadTypeExamen();
  }

  // Info Bulle
  info(a){
    this.infos=[]
    new Promise(resolve => {
      let body = {
        aksi: 'infobulle',
        typeexamname: a,
      }
      this.accsPrvds.postData(body).subscribe((res: any) => {
        for (let datas of res.result) {
          this.infos.push(datas);
          this.description = this.infos[0].Description;
        }
        this.presentAlert(a, this.description);
        resolve(true);
      });
    });
}

  // Info BandeAnnonce
  bandinfo(){
    new Promise(resolve => {
      let body = {
        aksi: 'bandeannonce',
      }
      this.accsPrvds.postData(body).subscribe((res: any) => {
        for (let datas of res.result) {
          this.bandeinfo.push(datas);
          this.bandeMessage = this.bandeinfo[0];
        }
        //this.infos=[]
        resolve(true);
      });
    });
}

  loadDatas(event) {
    setTimeout(() => {
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.datastorage.length == this.datastorage.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  //fonction de rafraichissement de la page
  async doRefresh(event) {
    const loader = await this.loadingCtrl.create({
      message: 'En cours...',
    });
    loader.present();
    this.ionViewDidEnter();
    event.target.complete();
  }

  loadData(event) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadUsers().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  //Fonction asynchronne permettant de lire les données
  loadUsers() {
    return new Promise(resolve => {
      let body = {
        aksi: 'load_users',
        start: this.start,
        limit: this.limit,
      }
      this.accsPrvds.postData(body).subscribe((res: any) => {
        for (let datas of res.result) {
          this.users.push(datas);
        }
        resolve(true);
      });
    });
  }

    //Fonction asynchronne permettant de lire les données TypeExamen
    loadTypeExamen() {
      return new Promise(resolve => {
        let body = {
          aksi: 'load_TypeExamen',
          start: this.start,
          limit: this.limit,
        }
        this.accsPrvds.postData(body).subscribe((res: any) => {
          for (let datas of res.result) {
            this.typeExamen.push(datas);
          }
          resolve(true);
        });
      });
    }


  //Affiche le message sur la page s'il y a erreure ou reussite
  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      cssClass:"toast-1-css",
    });
    toast.present(); 
  }

  //Fonction asynchronne pour la deconnexion
  async prosesLogout() {
    this.storage.clear();
    this.navCtrl.navigateRoot('/login');
    const toast = await this.toastCtrl.create({
      message: 'Deconnexion réussie',
      duration: 1500,
      position:"top",
      cssClass:"toast-1-css",
    });
    toast.present(); 
  }

  openCrud(a) {
    this.router.navigate(['/crud/'+a]);
  }

//Fonction qui permet de recuperer tous les examens liés à ce type d'examen
  showExamens(value) {
    if (value == "Consultations") {
      this.navCtrl.navigateRoot('/typeconsultation');
    } else {
      this.navCtrl.navigateRoot('/examen');
      this.itemValue = value;
      this.accsPrvds.contData(this.itemValue);
    }
    
  }
// Message alerte bule info 
  async presentAlert(titre, message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'infoAlert',
      header: titre,
      //subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    }); 
    await alert.present();

    const { role } = await alert.onDidDismiss();
    
  }

  functionReturn(){
    //this.navCtrl.back(); 
  }
}
