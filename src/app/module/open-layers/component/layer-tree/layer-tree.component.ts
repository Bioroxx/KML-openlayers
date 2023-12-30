import {Component, Input} from '@angular/core';
import {MenuItem, TreeNode} from 'primeng/api';
import {AbstractFeatureGroup} from '../../../../ol-kml-factory/elements/abstract-feature-group';

@Component({
  selector: 'app-layer-tree',
  templateUrl: './layer-tree.component.html',
  styleUrls: ['./layer-tree.component.scss']
})
export class LayerTreeComponent {

  _rootNode: TreeNode<AbstractFeatureGroup>[];

  get rootNode(): TreeNode<AbstractFeatureGroup>[] {
    return this._rootNode;
  }

  @Input() set rootNode(value: TreeNode<AbstractFeatureGroup>[]) {
    console.log('Setting: ', value);
    this._rootNode = value;
  }

  contextMenuItems: MenuItem[] = [
    {label: 'View', icon: 'pi pi-search', command: (event) => console.log(event)},
    {label: 'Unselect', icon: 'pi pi-times', command: (event) => console.log('Unselect')}
  ];

  onRender(element: AbstractFeatureGroup) {

    if (element.render) {
      element.render();
    } else {
      console.log('Could not render, because method render is undefined');
    }
  }

  onUnRender(element: AbstractFeatureGroup) {

    if (element.unRender) {
      element.unRender();
    } else {
      console.log('Could not unRender, because method unRender is undefined');
    }
  }
}
