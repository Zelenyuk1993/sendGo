import {Component, OnInit, ViewChild} from '@angular/core';
import {FacebookService} from '../../shared/services/facebook-service';
import {FacebookAccountModel} from '../../shared/models/facebook-account.model';
import {FacebookPostModel} from '../../shared/models/facebook-post.model';
import {ToastService} from '../../shared/services/toast-service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.scss'],
})
export class CreatePost implements OnInit {
  public isLoaded = true;

  public imagePath;
  imgURL: any;
  // @ts-ignored
  @ViewChild('fileInput') public  fileInput;

  public facebookAccountArray: FacebookAccountModel[] = [];

  public inputText: string;
  constructor( private facebookService: FacebookService, private toastService: ToastService) { }

  ngOnInit() {}
  changeAccountStatus(account: FacebookAccountModel) {
    if (account.statusSelect) {
      this.facebookAccountArray.push(account);
    } else  {
      this.facebookAccountArray.splice(this.facebookAccountArray.indexOf(account), 1);
    }

    console.log(this.facebookAccountArray);
  }

  test() {
    this.toastService.showToastWithCloseButton('test toast');
  }

  uploadFile(event) {
    if (event) {
      this.fileInput.nativeElement.click();
    }
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.previewImage(fileBrowser.files);
  }

   private previewImage(files) {
      if (files.length === 0) {
        return;
      }
      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }

}
