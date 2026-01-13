import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonLabel, IonToggle, IonIcon
} from '@ionic/react';
import { moon, notifications, language, informationCircle } from 'ionicons/icons';
import './Settings.css';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Paramètres</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonIcon slot="start" icon={moon} color="primary" />
            <IonLabel>Mode sombre</IonLabel>
            <IonToggle slot="end" />
          </IonItem>
          
          <IonItem>
            <IonIcon slot="start" icon={notifications} color="primary" />
            <IonLabel>Notifications</IonLabel>
            <IonToggle slot="end" checked />
          </IonItem>
          
          <IonItem button>
            <IonIcon slot="start" icon={language} color="primary" />
            <IonLabel>Langue</IonLabel>
            <IonLabel slot="end" color="medium">Français</IonLabel>
          </IonItem>
          
          <IonItem button>
            <IonIcon slot="start" icon={informationCircle} color="primary" />
            <IonLabel>À propos</IonLabel>
          </IonItem>
        </IonList>

        <div className="version-info">
          <p>RouteApp v1.0.0</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
