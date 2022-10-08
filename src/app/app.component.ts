import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { BackButtonService } from './services/back-button.service';
//import { Network } from '@awesome-cordova-plugins/network/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    //private network: Network,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public navCtrl: NavController,
    private Back_button_service: BackButtonService,
  ) {
    this.initializeApp();
  }


// Cette methode permet de rester sur la page login au demarrage de l'app tant qu'il n'y a pas de données
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault
      this.splashScreen.show();
      this.Back_button_service.init()
    });
    this.storage.get('storage_xxx').then((res) => {
      if (res == null) {
        this.navCtrl.navigateRoot('/info-produit');
      } else if(res.role == 'Admin' || res.role == 'SupAdm' ) {
        this.navCtrl.navigateRoot('/crud/:id');
      } else {
        this.navCtrl.navigateRoot('/home');
      }
    });
  }
}
