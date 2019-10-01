import {Component, OnInit, ViewChild} from '@angular/core';
import {FacebookService} from '../../shared/services/facebook-service';
import {FacebookAccountModel} from '../../shared/models/facebook-account.model';
import {ToastAndAlertService} from '../../shared/services/toast-alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.scss'],
})
export class CreatePost implements OnInit {
    public imgURL: any;
    public imgBlob: any;
    public minDataTime: string;

    public useLink = false;
    public inputLink = '';

    public useSchedule = false;
    public inputSchedule = '';

    public inputText: string;

  // @ts-ignored
  @ViewChild('fileInput') public  fileInput;

  public facebookAccountArray: FacebookAccountModel[] = [];
  constructor( private facebookService: FacebookService, private toastAndAlertService: ToastAndAlertService) { }

  ngOnInit() {}

  public initDateTimeNow() {
      this.minDataTime =  moment().add(10, 'minutes').toISOString(true);
  }
  public changeAccountStatus(account: FacebookAccountModel) {
    if (account.statusSelect) {
      this.facebookAccountArray.push(account);
    } else  {
      this.facebookAccountArray.splice(this.facebookAccountArray.indexOf(account), 1);
    }
  }
  public uploadFile(event) {
    if (event) {
      this.fileInput.nativeElement.click();
    }
  }

  public addToQueue() {
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

      this.createBlob(files[0]);
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
   }
    private createBlob(file: File) {
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
            this.imgBlob = new Blob([fileReader.result], {type: 'image/jpg'});
            console.log(this.imgBlob);
        };
        fileReader.readAsArrayBuffer(file );
    }
    public sendPost() {
      if (!this.facebookAccountArray.length) {
          this.toastAndAlertService.presentAlert('Ups, something went wrong', 'No selected accounts. Please check it and try again');
          return;
      }
      this.toastAndAlertService.presentLoading();
      const postObj = {
          message: this.inputText,
          published: !this.useSchedule,
          scheduled_publish_time: (this.useSchedule && this.inputSchedule.length) ? moment( this.inputSchedule).unix() : null,
          link: (this.useLink && this.inputLink.length) ? this.inputLink : null,
      };

      this.facebookAccountArray.forEach((account, index)  => {
          this.facebookService.postFacebookFeed(account, postObj, this.imgBlob ? this.imgBlob : null ).subscribe(() => {
              if (index === this.facebookAccountArray.length - 1 ) {
                  this.toastAndAlertService.dismissLoading();
                  this.toastAndAlertService.showToastWithCloseButton('This post was successfully posted');
              }

          }, error => {
                  this.toastAndAlertService.dismissLoading();
                  this.toastAndAlertService.presentAlert(error.error.error.error_user_msg, error.error.error.message);
                  return;
          });
      });
    }

}
