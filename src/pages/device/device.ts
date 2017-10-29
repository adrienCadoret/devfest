import { Component } from '@angular/core';
import {Device} from "@ionic-native/device";
import {Network} from "@ionic-native/network";

/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {

  constructor(public device: Device,
              public network: Network) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

}
