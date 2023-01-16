import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { AvatarService } from '../services/avatar.service';
import { FirestorageService } from '../services/firestorage.service';
import { FirestoreService } from '../services/firestore.service';
import { Product } from './models';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  productos: Product[] = [];
  loading: any;

 newProduct: Product;
 newImage = '';
 newFile: '';
 private path = 'products';
 enabledNewProduct = false;
 profile = null;

  constructor(public menuController: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private avatarService: AvatarService,) {
               this.avatarService.getUserProfile().subscribe((data) => {
                this.profile = data;
              });}

  ngOnInit() {
    this.getProducts();
  }
  openMenu(){
    console.log('open menu');
    this.menuController.toggle('principal');
   }

   async guardarProducto(){
    this.presentLoading();
    const path = 'Products';
    const name = this.newProduct.name;
    const res = await this.firestorageService.uploadImage(this.newFile,path,name);
    this.newProduct.image = res;

    this.firestoreService.createDoc(this.newProduct, this.path, this.newProduct.id).then( () => {
      this.loading.dismiss();
      this.presentToast('Producto guardado con exito');
    }).catch( error => {
      this.presentToast('Error al guardar el producto');
    });
   }
   getProducts(){
      this.firestoreService.getColeccion<Product>(this.path).subscribe(res => {
        this.productos = res;
      });
   }
   async deleteProduct(product: Product){
    // this.firestoreService.deleteDoc(this.path, product.id);
      const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Advertencia',
        message: '¿Seguro que desea eliminar el producto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'normal',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              console.log('Confirm Okay');
              this.firestoreService.deleteDoc(this.path, product.id).then( res => {
                this.presentToast('Producto eliminado con exito');
                this.alertController.dismiss();
              }).catch( error => {
                this.presentToast('Error al eliminar el producto');
              });
            },
          },
        ],
      });
      await alert.present();
   }
   nuevo(){
      this.enabledNewProduct = true;
      this.newProduct={
        name: '',
        stock: null,
        price: null,
        description: '',
        image: '',
        id: this.firestoreService.getId(),
        fecha: new Date()
       };
   }

   async presentLoading(){
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando..',
    });
    await this.loading.present();
   // await loading.onDidDismiss();
    console.log('Loading dismissed');
  }
  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'normal',
      duration: 2000
    });
    toast.present();
   }
   async newImageUpload(event: any){
    if (event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
         this.newProduct.image = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
   }
}
