import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonText
} from '@ionic/react';
import { logIn, personAdd } from 'ionicons/icons';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      history.push('/home');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Connexion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="login-container">
          <h1>RouteApp</h1>
          <p>Connectez-vous pour continuer</p>

          <form onSubmit={handleLogin}>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput 
                type="email" 
                value={email} 
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Mot de passe</IonLabel>
              <IonInput 
                type="password" 
                value={password} 
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
              />
            </IonItem>

            {error && (
              <IonText color="danger">
                <p className="error-message">{error}</p>
              </IonText>
            )}

            <IonButton 
              expand="block" 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              <IonIcon slot="start" icon={logIn} />
              {loading ? 'Connexion...' : 'Se connecter'}
            </IonButton>
          </form>

          <IonButton 
            expand="block" 
            fill="outline" 
            routerLink="/register"
            className="register-button"
          >
            <IonIcon slot="start" icon={personAdd} />
            Créer un compte
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
