import { StyleSheet } from 'react-native';
export const COLORS = {
    background: 'white',
    secondary: '#C473FF',
    accent: '#FB6F92',
}
export const TEXTSTYLES = StyleSheet.create({
    h1: {
       fontSize: 64,
       fontWeight: '600',
    },
    h3: {
      fontSize: 36,
      fontWeight: '600',
    },
     h4: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: '700'
     },
      subtitle1: {
        fontSize: 16,
        fontWeight: '600',
      },
      subtitle2: {
          fontSize: 14,
          fontWeight: '600'
      },
      body1:{
          fontSize: 16,
          fontWeight: '500'
      },
      body2: {
        fontSize: 14,
        fontWeight: '600',
      },
       caption: {
        fontSize: 12,
        fontWeight: '500'
      },
      overline: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.2
      }
});
export const BUTTONSTYLE = StyleSheet.create({
  btnSecondary: {
      backgroundColor: COLORS.secondary,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 4,
    },
    btnPrimary2: {
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 4,
      },
});