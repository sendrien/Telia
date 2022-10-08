import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-preface',
  templateUrl: './preface.page.html',
  styleUrls: ['./preface.page.scss'],
})
export class PrefacePage implements OnInit {

  constructor(private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,) { }

  ngOnInit() {
  }
  goToLogin(){
    this.router.navigate(['/login']);

  }

  quit(){
    
  }
}
