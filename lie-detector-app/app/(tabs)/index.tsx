import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Image, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Make sure axios is imported
const { width, height } = Dimensions.get('window');

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'login' | 'signup' | 'main'>('landing');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup fields
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [consentMedia, setConsentMedia] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- New handleLogin function ---
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Info', 'Please enter both email and password.');
      return;
    }

    try {
      // Replace 192.168.0.183 with your backend server's IP address or domain
      const response = await axios.post('https://cd18-113-193-19-90.ngrok-free.app/api/login', {
        email: email,
        password: password,
      });

      // Assuming your backend returns a success status or user data on successful login
      if (response.status === 200) { // Or check for a specific success field in response.data
        Alert.alert('Success', 'Logged in successfully!');
        setScreen('main'); // Navigate to the main screen
      } else {
        // Handle other status codes or error responses from backend
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error(error);
      // Handle network errors or backend errors
      Alert.alert('Error', 'Failed to log in. Please try again.');
    }
  };
  // --- End of new handleLogin function ---


  const handleSignup = async () => {
    if (
      !fullName ||
      !signupEmail ||
      !username ||
      !phone ||
      !dob ||
      !signupPassword ||
      !confirmPassword
    ) {
      Alert.alert('Missing Info', 'Please fill in all the fields.');
      return;
    }

    if (signupPassword !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    if (!agreeTerms || !consentMedia) {
      Alert.alert('Consent Required', 'Please agree to the terms and consent to media processing.');
      return;
    }

    const formData = new FormData();

    if (profilePic) {
      const filename = profilePic.split('/').pop();
      const type = `image/${filename.split('.').pop()}`;
      formData.append('profilePic', {
        uri: profilePic,
        name: filename,
        type,
      });
    }

    formData.append('fullName', fullName);
    formData.append('email', signupEmail);
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('dob', dob);
    formData.append('password', signupPassword);
    formData.append('agreeTerms', agreeTerms.toString());
    formData.append('consentMedia', consentMedia.toString());

    try {
      // Replace 192.168.0.183 with your backend server's IP address or domain
      const response = await axios.post('https://cd18-113-193-19-90.ngrok-free.app/api/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Account created. Please log in.');
      setScreen('login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create account.');
    }
  };

  const renderOverlay = () => {
    if (screen === 'landing') {
      return (
        <View style={styles.overlay}>
          <View style={styles.loginContainer}>
              <Text style={styles.title}>🕵️‍♂️ Lie Detector</Text>
              <Text style={styles.subtitle}>Detect truth using AI-powered facial & voice analysis.</Text>
              <Button title="Get Started" onPress={() => setScreen('login')} />
          </View>
        </View>
      );
    }

  const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert('Permission Denied', 'You need to allow access to your photos to upload a profile image.');
    return;
  }

  //For profile picture
  const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri); // Set the image URI to state
    }
  };


    if (screen === 'login') {
      return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.overlay}>
          <View style={styles.loginContainer}>
            <ScrollView contentContainerStyle={styles.formContainer}>
              <Text style={styles.title}>Login</Text>
              <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" /> {/* Added keyboardType */}
              <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
              {/* --- Modified Button onPress to call handleLogin --- */}
              <Button title="Login" onPress={handleLogin} />
              {/* --- End of modification --- */}
              <Text style={styles.switchText} onPress={() => setScreen('signup')}>
                Don't have an account? Sign up
              </Text>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      );
    }

    if (screen === 'signup') {
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.overlay}
        >
          <ScrollView contentContainerStyle={styles.formContainer}>
            <View style={styles.signupContainer}>
              <Text style={styles.title}>Sign Up</Text>

              <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />
              <TextInput placeholder="Email Address" value={signupEmail} onChangeText={setSignupEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
              <TextInput placeholder="Username or Display Name" value={username} onChangeText={setUsername} style={styles.input} autoCapitalize="none" />
              <TextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
              <TextInput placeholder="Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} style={styles.input} />
              <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Password"
                    value={signupPassword}
                    onChangeText={setSignupPassword}
                    secureTextEntry={!showPassword}
                    style={styles.passwordInput}
                  />
                  <Text style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? '🙈' : '👁️'}
                  </Text>
                </View>

                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    style={styles.passwordInput}
                  />
                  <Text style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </Text>
                </View>
                <View style={styles.imageUploadContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>
                    {profilePic ? 'Change Profile Picture' : 'Upload Profile Picture (Optional)'}
                  </Text>
                </TouchableOpacity>

                {profilePic ? (
                  <Image source={{ uri: profilePic }} style={styles.profileImage} />
                ) : null}
              </View>
              <View style={styles.checkboxContainer}>
                <Text onPress={() => setAgreeTerms(!agreeTerms)} style={styles.checkboxText}>
                  {agreeTerms ? '☑' : '☐'} I agree to the Terms & Privacy Policy
                </Text>
              </View>

              <View style={styles.checkboxContainer}>
                <Text onPress={() => setConsentMedia(!consentMedia)} style={styles.checkboxText}>
                  {consentMedia ? '☑' : '☐'} I consent to video/audio processing
                </Text>
              </View>

              <Button title="Sign Up" onPress={handleSignup} />
              <Text style={styles.switchText} onPress={() => setScreen('login')}>
                Already have an account? Log in
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }


    if (screen === 'main') {
      return (
        <View style={styles.overlay}>
          <Text style={styles.title}>🔍 Uploading...</Text>
          <Button title="Log Out" onPress={() => setScreen('landing')} />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('@/assets/videos/background.mp4')}
        rate={1.0}
        volume={0.0}
        isMuted
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
      {renderOverlay()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    paddingBottom: 40,
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 20,
    borderRadius: 10,
  },
  signupContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  switchText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 8,
  },
  //for profile picture upload
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    marginBottom: 10,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#007AFF',
    paddingHorizontal: 5,
  },

});
