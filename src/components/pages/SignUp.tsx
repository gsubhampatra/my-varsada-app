import { useQueries } from '@tanstack/react-query';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PersonalInformation from '../ui/Profile/PersonalInformation';
import { API_ROUTES } from '../../kv';
import api from '../../http/axiosconfig';
import { useNavigation } from 'expo-router';
import { useUserStore } from '../../store/useStore';
import { ActivityIndicator } from 'react-native';
import NavBarMobile from '../ui/Layout/mobile/NavBarMobile';
import ErrorBox from '../ui/Layout/Error/ErrorBox';


type MeData = {
  status: boolean;
  user: {
    uid: string;
    uid_type: 'EMAIL' | 'PHONE';
  };
};

async function fetchMe(): Promise<MeData> {
  const res = await api.get(API_ROUTES.AUTH.ME);
  return res.data;
}

async function fetchMeDetails() {
  const res = await api.get(API_ROUTES.USER.GET_DETAILS);
  return res.data;
}

export default function SignUp() {
  const navigation = useNavigation();
  const { setIsLogedIn } = useUserStore();

  const results = useQueries({
    queries: [
      {
        queryKey: ['me'],
        queryFn: fetchMe,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['userdetails'],
        queryFn: fetchMeDetails,
        refetchOnWindowFocus: false,
        onSuccess: (data: {
          user: { uid: string; uid_type: 'EMAIL' | 'PHONE' };
        }) => {
          console.log(data);
          setIsLogedIn(true);
          navigation.navigate('/');
        },
      },
    ],
  });
  const [me] = results;

  if (me.isLoading)
    return (
      <SafeAreaView style={styles.container}>
         <NavBarMobile />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C473FF" />
        </View>
      </SafeAreaView>
    );
  if (me.isError) navigation.navigate('/login');

  if (me.data) {

    const requiredProps = me.data?.user.uid_type === 'EMAIL' ? 
      { email: `${me.data.user.uid}`, phone: null } :
      { email: null, phone: `${me.data?.user.uid}` };

    return (
      <SafeAreaView style={styles.container}>
         <NavBarMobile />
        <ImageBackground
          source={require('../../assets/ban1.png')} // Use require for static image imports
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
              <PersonalInformation
                required={requiredProps}
                dark={false}
              />
            </View>
        </ImageBackground>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavBarMobile />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ErrorBox text="Failed to load content" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',    // Center content horizontally
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 10,
    backdropFilter: 'blur(5px)', // Apply blur effect
    width: Dimensions.get('window').width * 0.8, // Occupy 80% of screen width
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});
