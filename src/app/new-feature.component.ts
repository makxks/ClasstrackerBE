import { Component } from '@angular/core';

@Component ({
  selector: 'new-features',
  templateUrl: './new-feature.component.html',
  styleUrls: ['./new-feature.component.css']
})

export class NewFeatureComponent {

  collapse(event: any){
    var subitems = event.target.parentElement.nextElementSibling;
    var inner = event.target;

    if(subitems.style.display == "none"){
      subitems.style.display = 'block';
      inner.style.transform = "rotate(90deg)";
    }
    else {
      subitems.style.display = 'none';
      inner.style.transform = "rotate(0deg)";
    }
  }
  
}
