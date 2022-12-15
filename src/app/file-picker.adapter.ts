

import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  FilePickerAdapter,
  UploadResponse,
  UploadStatus,
  FilePreviewModel
} from 'ngx-awesome-uploader';
import {Butler} from '@app/services/butler.service';

export class DemoFilePickerAdapter extends FilePickerAdapter {
  constructor(
    private http: HttpClient,
    public _butler: Butler
    ) {
    super();
  }
  public uploadFile(fileItem: FilePreviewModel): Observable<any> {
    const form = new FormData();
    form.append('file', fileItem.file);
    const api = 'https://db.buckapi.us:3333/api/containers/tixsImages/upload';
    const req = new HttpRequest('POST', api, form, { reportProgress: true });
    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {



        //   if (res.type === HttpEventType.Response) {
        //  this._butler.file=res.body.result.files.file;
        //  // console.log("Nombre: ",this._butler.file[0].name);
        //  this._butler.images.push('https://db.buckapi.us:80/s/imgApi/server/local-storage/tixsImages/'+this._butler.file[0].name);
        //   return res.body.id.toString();
       
        // } else if (res.type ===  HttpEventType.UploadProgress) {
        //     // Compute and show the % done:
        //     const UploadProgress = +Math.round((100 * res.loaded) / res.total);
        //     return UploadProgress;
        // }

        if (res.type === HttpEventType.Response) {
           this._butler.file=res.body.result.files.file;
           this._butler.images.push('https://db.buckapi.us/s/imgApi/server/local-storage/tixsImages/'+this._butler.file[0].name);
   
          // this._butler.file=res.body.result.files.file;
          //const responseFromBackend = res.body;
            return res.body.id.toString();
       //   return {
         //   body: responseFromBackend,
          //  status: UploadStatus.UPLOADED
         // };
        } else if (res.type === HttpEventType.UploadProgress) {
          /** Compute and show the % done: */
          if (res.total!=undefined){

          const UploadProgress = +Math.round((100 * res.loaded) / res.total);
          return UploadProgress;
          }
          // return {
          //   status: UploadStatus.IN_PROGRESS,
          //   progress: uploadProgress
          // };
        }


      }),
     catchError(error => {
      //  console.log(error);
        return of({ status: UploadStatus.ERROR, body: error });
      })
    );
  }
  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    const id = 50;
    const responseFromBackend = fileItem.uploadResponse;
    console.log(fileItem);
    const removeApi =
      'https://run.mocky.io/v3/dedf88ec-7ce8-429a-829b-bd2fc55352bc';
    return this.http.post(removeApi, { id });
  }
}