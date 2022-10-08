import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, IonSearchbar } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/Storage';
import { FormsModule } from '@angular/forms';
import { BackButtonService } from '../../services/back-button.service';


@Component({
  selector: 'app-examen',
  templateUrl: './examen.page.html',
  styleUrls: ['./examen.page.scss'],
})
export class ExamenPage implements OnInit {
  datastorage: any;
  datastorage1: any;
  datastorageStruct: any;
  name: string;
  StructName: string;
  examens: any = [];
  villes: any = [];
  sectrs: any = [];
  bandeinfo: any = [];
  bandeMessage: string = "";
  structures: any = [];
  limit: number = 13; //limit get data
  start: number = 0;
  public HIDE1: boolean = true;
  public HIDE2: boolean = true;
  hideRowstructure: boolean = false;
  //index: number;
  pageName: string = "";
  recherchValue: string = "";
  labelValue: string;
  value: string = '';
  ville: string = '';
  sectr: string = '';
  el: string;
  Tampon: string;
  
  // Variables de la barre de recherche des examens
  @ViewChild('search', { static: false}) search:IonSearchbar;
  hideListe: boolean = true;
  ListeValue: string = "";
  public list: Array<Object> = [];
  private searchedItem: any;

  // Variables de la barre de recherche des villes
  @ViewChild('town', { static: false}) town:IonSearchbar;
  hideListVille: boolean = true;
  hideColville: boolean = false;
  ListeValueVille: string = "";
  public listVille: Array<Object> = [];
  private searchedVille: any;

  // Variables de la barre de recherche des secteurs
  @ViewChild('secter', { static: false}) secter:IonSearchbar;
  hideListSecteurs: boolean = true;
  hideColsecteur: boolean = false;
  ListeValueSecteurs: string = "";
  public listSecteur: Array<Object> = [];
  private searchedSecteur: any;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private navCtrl: NavController,
    private storage: Storage,
    private Back_button_service: BackButtonService,
  ) {}

ngOnInit() {
}
//
backToLogin() {
    this.navCtrl.navigateRoot('/home');
    this.Back_button_service.init()
}
//Info BandeAnnonce
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
//Cette fonction execute les fonctions sur le fichier access-providers pour transmettre les retours sur d'autres pages
showLabo(a, index) {
    this.navCtrl.navigateRoot('/laboratoire');
    //transmission des données necessaires pour la page suivante aux fonctions providers
    this.accsPrvds.contDataExam(a); // affiche le nom de la clinique sur la page des details
    this.accsPrvds.contDataExamName(this.ListeValue); // affiche le nom du laboratoire sur la page des details
    this.accsPrvds.DataIndex(index) // permet de renvoyer l'index de la structure choisie sur la page laboratoire
    this.accsPrvds.contStructures(this.structures)
    //console.log("INDEX-------------------: ", this.accsPrvds.DataIndex(index))
}

//Cette fonction permet d'afficher sur la page home les données sur l'utilisateur
ionViewDidEnter() {
    if (this.accsPrvds.transitVal != "") {
      this.pageName = this.accsPrvds.transitVal;
      //this.pageName = this.pageName.toUpperCase();
    }
    console.log('EXAMMMMMM' ,this.accsPrvds.val)
    this.pageName = this.accsPrvds.val;
    this.pageName = this.pageName.toUpperCase();
    this.start = 0;
    //this.examens = [];
    this.loadVilles();
    this.loadSecteurs();
    this.loadExamens();
    
    
    //this.loadSecteurs();
    // Config barre recherche examens 
    this.list = this.examens;
    //console.log(" examens=======> ", this.examens);
    this.searchedItem = this.list;
    // Config barre recherche villes
    this.listVille = this.villes
    this.searchedVille = this.listVille;
    
    
    setTimeout(()=>{
      this.search.setFocus();
      this.town.setFocus();
      this.secter.setFocus();
    });

}

autoresearche(i){
  this.structures = [];
  if(this.ListeValue != '' || this.ListeValueVille != '' || this.ListeValueSecteurs != ''){
    this.recherchExamen(i)
  }
  //console.log("tesstt: ", this.value)
  this.sectrs = [] // vide le tableau des secteurs
  this.loadSecteurs()
}
//RECHERCHE D'UN EXAMEN
async recherchExamen(i) {
  // Permet d'afficher les différents centres liés à l'examen choisi
  new Promise(resolve => {
    let body = {
      aksi: 'load_structures',
      examname: this.ListeValue,
      ville: this.ListeValueVille,
      secteur: this.ListeValueSecteurs,
      pagename: this.accsPrvds.val,
    }
    this.accsPrvds.postData(body).subscribe((res: any) => {
      for (let datas of res.result) {
        this.structures.push(datas);
        this.labelValue = this.structures[0].NomStructure;
        console.log(" CONTENU this.structures[0].NomStructure ", this.structures[0].NomStructure);
        console.log(" CONTENU this.structures ", this.structures);
      }
      /*if (this.structures == '' && i>= 3) {
        this.presentAlert("OUPS!\nAUCUNE STRUCTURE DISPONIBLE");
      }*/
      resolve(true);
    });
  });
}

async HideFunction(n){
  if(n == 1 && this.ListeValue != "" && this.hideListe != false)
  {
    this.HIDE1 = false;
  }
  else if(n == 2 && this.ListeValueVille != "" && this.hideListVille != false)
  {
    this.HIDE2 = false;
  }
  /*if (this.sectrs.length == 0 && this.ListeValueVille != '' ){
    this.presentAlert("OUPS!\nAUCUNE STRUCTURE\nA "+this.ListeValueVille.toUpperCase()+"\nPOUR L'EXAMEN "+this.ListeValue.toUpperCase())
  }*/
}

loadData(event) {
  this.start += this.limit;
  setTimeout(() => {
    this.loadExamens().then(() => {
      event.target.complete();
    });
  }, 500);
}
// Lecture de tous les éléments de la table 'examen' pour affichicher lors de la selection de l'examen
loadExamens() {
  return new Promise(resolve => {
    let body = {
      aksi: 'load_examens',
      start: this.start,
      limit: this.limit,
      pagename: this.accsPrvds.val,
    }
    this.accsPrvds.postData(body).subscribe((res: any) => {
      for (let datas of res.result) {
        this.examens.push(datas);
      }
      resolve(true);
    });
  });
}
// Lecture de tous les éléments de la table 'ville' pour affichicher lors de la selection de la ville
async loadVilles() {
  return new Promise(resolve => {
    let body = {
      aksi: 'load_villes',
    }
    this.accsPrvds.postData(body).subscribe((res: any) => {
      for (let datas of res.result) {
        this.villes.push(datas);
      }
      resolve(true);
    });
  });
}
// Lecture de tous les éléments de la table 'ville' pour affichicher lors de la selection de la ville
async loadSecteurs() {
  return new Promise(resolve => {
    let body = {
      aksi: 'load_secteurs',
      examNam: this.ListeValue,
      Ville: this.ListeValueVille,
    }
    this.accsPrvds.postData(body).subscribe((res: any) => {
      this.Tampon="";
      for (let datas of res.result) {
        console.log('+++++++++++++++-------------------',datas)
        if (datas.NomSecteur!==this.Tampon){
          this.Tampon=datas.NomSecteur
          this.sectrs.push(datas);
        }
      }
      resolve(true);
      // Config barre recherche secteurs
      this.listSecteur = this.sectrs
      this.searchedSecteur = this.listSecteur;
    });
  });
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
  
async presentAlert(m) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class textPolice',
    //header: 'Alert',
    //subHeader: 'Subtitle',
    message: m,
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
      }, 
      {
        text: 'Ok',
        role: 'Ok',
      }
    ]
  });
  await alert.present();
}

functionReturn(){
  //this.navCtrl.navigateRoot('/home');
  //this.Back_button_service.init()
}

ShowList(n){
  if (n==1){
    if(this.hideListe == true){
      this.hideListe = false;
      this.hideListVille = true;
      this.hideListSecteurs = true;
      if(this.HIDE1==false){
        this.hideColville = true;
        this.hideColsecteur = true;
      }
    }
    else if(this.hideListe == false){
      this.hideListe = true;
      if(this.HIDE1==false){
        this.hideColville = false;
        this.hideColsecteur = false;
      }
    }
  }
  else if (n==2){
    if(this.hideListVille == true){
      this.hideListVille = false;
      this.hideListe = true;
      this.hideListSecteurs = true;
      if(this.HIDE2==false){
        this.hideColsecteur = true;
      }
    }
    else if(this.hideListVille == false){
      this.hideListVille = true;
      if(this.HIDE2==false){
        this.hideColsecteur = false;
      }
    }
  }else if(n==3){
    if(this.hideListSecteurs == true){
      this.hideListSecteurs = false;
      this.hideListe = true;
      this.hideListVille = true;
      this.hideRowstructure = true;
    }
    else if(this.hideListSecteurs == false){
      this.hideListSecteurs = true;
      this.hideRowstructure = false;
    }
  }

}

selectItem(itemValue,n){
  if(n==1){
    this.ListeValue = "";
    this.ListeValue = itemValue;
    this.ShowList(n);
  }
  else if (n==2){
    this.ListeValueVille = "";
    this.ListeValueVille = itemValue;
    this.ShowList(n);
  }
  else if (n==3){
    this.ListeValueSecteurs = "";
    this.ListeValueSecteurs = itemValue;
    console.log("Valeur du champ: ",this.ListeValueSecteurs)
    this.ShowList(n);
  }
}

writingInSearch(event, n){
  if (n==1){
    const vale = event.target.value;
    console.log("val: ", vale)
    console.log(" examens=======> ", this.examens);
    //this.searchedItem = this.list;
    if (vale && vale.trim() != ""){
      this.searchedItem = this.searchedItem.filter((item: any)=>{
        console.log("valsecteur: => ", item.NomExamen)
        return (item.NomExamen.toLowerCase().indexOf(vale.toLowerCase()) > -1);
      })
    }else{
      // lorsque le champ de recherche est vide on réinitialise la list
      this.searchedItem=this.list;
    }
  }
  if (n==2){
    const val = event.target.value;
    console.log("val: ", val)
    //this.searchedVille = this.list;
    if (val && val.trim() != ""){
      this.searchedVille = this.searchedVille.filter((item: any)=>{
        return (item.NomVille.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      // lorsque le champ de recherche est vide on réinitialise la list
      this.searchedVille=this.listVille;
    }
  }
  if (n==3){
    const valu = event.target.value;
    console.log("valsecteur: => ", valu)
    if (valu && valu.trim() != ""){
      this.searchedSecteur = this.searchedSecteur.filter((item: any)=>{
        return (item.NomSecteur.toLowerCase().indexOf(valu.toLowerCase()) > -1);
      })
    }else{
      // lorsque le champ de recherche est vide on réinitialise la list
      this.searchedSecteur=this.listSecteur;
    }
  }
  
}


}
