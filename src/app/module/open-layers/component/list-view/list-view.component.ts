import {Component, Input} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {AbstractFeatureGroup} from '../../../../ol-kml-factory/elements/abstract-feature-group';
import {Kml} from '../../../../ol-kml-factory/elements/kml';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {

  rootNode?: TreeNode<AbstractFeatureGroup>[];

  @Input() set kml(kml: Kml | undefined) {
    if (!kml || !kml.feature) {
      this.rootNode = [];
      return;
    }
    this.rootNode = [kml.feature as TreeNode<AbstractFeatureGroup>];
  }

  onSetVisible(element: AbstractFeatureGroup) {

    if (element.setVisible) {
      element.setVisible();
    } else {
      console.log('Could not set feature visible, because method setVisible is undefined');
    }
  }

  onSetInvisible(element: AbstractFeatureGroup) {

    if (element.setInvisible) {
      element.setInvisible();
    } else {
      console.log('Could not set feature invisible, because method setInvisible is undefined');
    }
  }
}