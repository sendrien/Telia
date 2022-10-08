import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'

const IMAGE_DIR = 'stored_images';

interface LocalFile {
  name:string,
  path:string,
  data:string
}

@Component({
  selector: 'app-info-produit',
  templateUrl: './info-produit.page.html',
  styleUrls: ['./info-produit.page.scss'],
})
export class InfoProduitPage implements OnInit {
  image: any;
  imageSelected: any;

  constructor(private http: HttpClient) { }
  
  async ngOnInit() {
  }

  /*selectedFile(event){
    if (event.target.files && event.target.files.length > 0) {
      this.imageSelected = event.target.files[0].type;
    }
    
  }

  onClick(){
    const formData = new FormData();
    formData.append('image', this.image);
    console.log('formData => ', formData);
    this.http.post('https://localhost/api/upload_image.php', this.image).subscribe((response:any)=>{
      console.log('response', response);
    })
  }*/

  async selectImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log("IMAGE, image");
    

  }


}
