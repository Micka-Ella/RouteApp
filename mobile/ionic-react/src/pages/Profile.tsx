import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonLabel, IonAvatar, IonButton, IonIcon
} from '@ionic/react';
import { logOut, create } from 'ionicons/icons';
import './Profile.css';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mon Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="profile-header">
          <IonAvatar className="profile-avatar">
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Avatar" />
          </IonAvatar>
          <h2>Utilisateur</h2>
          <p>utilisateur@email.com</p>
        </div>

        <IonList>
          <IonItem button>
            <IonIcon slot="start" icon={create} color="primary" />
            <IonLabel>Modifier le profil</IonLabel>
          </IonItem>
        </IonList>

        <div className="logout-container">
          <IonButton expand="block" color="danger">
            <IonIcon slot="start" icon={logOut} />
            Se déconnecter
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
