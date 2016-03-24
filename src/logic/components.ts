import {Action} from '../action';
import stores from './stores';
import Component from './component';
import * as Firebase from 'firebase';
import * as Vue from 'vue';
import './scenarios';

let db: Firebase = new Firebase('https://brilliant-fire-9189.firebaseio.com/');
let components: Firebase = db.child('components');

export function initComponents (): Promise {
  return new Promise((resolve: () => void) => {
    components.on('value', () => {
      resolve();
    });

    components.on('child_added', (snapshot: FirebaseDataSnapshot) => {
      let comp: Component = new Component(snapshot.val());
      Vue.set(stores.components, comp.name, comp);

      if (!stores.currentComponent) {
        stores.currentComponent = comp;
      }
    });

    components.on('child_changed', (snapshot: FirebaseDataSnapshot) => {
      let comp: Component = snapshot.val();
      stores.components[comp.name] = new Component(comp);
      if (stores.currentComponent.name === comp.name) {
        stores.currentComponent = stores.components[comp.name];
      }
    });
  });
}

// --- Actions ---- //

Action('createNewComponent', (name: string) => {
  let comp: Component = new Component({name});
  components.child(name).set(comp, () => {
    stores.currentComponent = comp;
  });
});

Action('setCurrentComponentTemplate', (template: string) => {
  stores.currentComponent.setTemplate(template);
});

Action('setCurrentComponentStyle', (style: string) => {
  stores.currentComponent.setStyle(style);
});

Action('setCurrentComponent', (name: string) => {
  stores.currentComponent = stores.components[name];
});

Action('addDependencyToCurrentComponent', (name: string) => {
  stores.currentComponent.addDependency(name);
});

Action('saveCurrentComponent', () => {
  components.child(stores.currentComponent.name).update(stores.currentComponent);
});

Action('addPropertyToCurrentComponent', (prop: string) => {
  stores.currentComponent.addProperty(prop);
});

Action('addActionToCurrentComponent', (action: string) => {
  stores.currentComponent.addAction(action);
});

Action('setCurrentRunningScenarioOfComponent', (scenarioName: string) => {
  stores.currentComponent.setCurrentRunningScenario(scenarioName);
});
