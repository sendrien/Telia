import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { AccessProviders } from '../providers/access-providers';


@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  private lastTimeBackButtonWasPressed = 0;
  private timePeriodToAction = 2000;
  pageName: string = "";

  init() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      let currentUrl = this.router.url;
      if (currentUrl === "/login" ) {
         this.withAlert("Vous Quittez?", () => {
          this.prosesLogout();
           navigator['app'].exitApp();
         })
        //this.withDoublePress("Pressez encore pour quitter", () => {
         // navigator['app'].exitApp();
          //this.prosesLogout();
        //})
      } else {
        this.navControlelr.back();
        this.backToLogin();
        //this.prosesLogout();
      }

    });
  }

  // Fonction de retour sur la page precedente
  backToLogin() {
    if (this.pageName == "Type de consultation") {
      this.navControlelr.navigateRoot('/typeconsultation');
    } else {
      this.navControlelr.navigateRoot('/examen');
    }
    // Transition vers la page precedente pour rediriger vers le même nom de page
    //this.accsPrvds.transitFunction(this.pageName);
  }

  prosesLogout() {
    this.storage.clear();    
  }

  async withDoublePress(message: string, action: () => void) {
    const currentTime = new Date().getTime();

    if (currentTime - this.lastTimeBackButtonWasPressed < this.timePeriodToAction) {
      action();
    } else {
      const toast = await this.toastController.create({
        message: message,
        duration: this.timePeriodToAction
      });

      await toast.present();

      this.lastTimeBackButtonWasPressed = currentTime;
    }
  }

  async withAlert(message: string, action: () => void) {
    const alert = await this.alertController.create({
      cssClass: 'infoAlert, new-background',
      message: message,
      buttons: [{
        text: "Annuler",
        role: "cancel"
      },
      {
        text: "Oui",
        handler: action
      }]
    });
    await alert.present();
  }

  constructor(
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private navControlelr: NavController,
    private alertController: AlertController,
    private accsPrvds: AccessProviders,
    private toastController: ToastController,
    ) 
    { }
}