import {Component, Input} from '@angular/core';
import {MenuItem, TreeNode} from 'primeng/api';
import {AbstractFeatureGroup} from '../../../../ol-kml-factory/elements/abstract-feature-group';
import {Kml} from '../../../../ol-kml-factory/elements/kml';
import {TreeNodeSelectEvent, TreeNodeUnSelectEvent} from 'primeng/tree';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {

  rootNode: TreeNode<AbstractFeatureGroup>[];

  @Input() set kml(kml: Kml) {
    if (!kml) {
      return;
    }
    this.rootNode = [kml.feature as TreeNode<AbstractFeatureGroup>];
  }

  contextMenuItems: MenuItem[] = [
    {label: 'View', icon: 'pi pi-search', command: (event) => console.log(event)},
    {label: 'Unselect', icon: 'pi pi-times', command: (event) => console.log('Unselect')}
  ];

  onSetVisible(element: AbstractFeatureGroup) {

    if (element.setVisible) {
      element.setVisible();
    } else {
      console.log('Could not set to visible, because method setVisible is undefined');
    }
  }

  onSetInvisible(element: AbstractFeatureGroup) {

    if (element.setInvisible) {
      element.setInvisible();
    } else {
      console.log('Could not set to invisible, because method setInvisible is undefined');
    }
  }

  onNodeSelect(event: TreeNodeSelectEvent) {
    console.log('On Node Select');
  }

  onNodeUnselect(event: TreeNodeUnSelectEvent) {
    console.log('On Node Unselect');
  }

  onFocusOut() {
    console.log('On Focus out');

    /*
    const rootAbstractFeatureGroup = this.rootNode[0] as AbstractFeatureGroup;
    if (rootAbstractFeatureGroup.onUnselect) {
      rootAbstractFeatureGroup.onUnselect();
    }*/
  }
}
