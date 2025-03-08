import { StyleSheet, Platform } from 'react-native';
import { ThemeType } from './theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingTop: theme.spacing.lg, // Add padding top to the container
    },
    header: {
      backgroundColor: theme.background.primary,
    },
    headerTitle: {
      color: theme.text.primary,
    },
    card: {
      backgroundColor: theme.background.secondary,
      padding: theme.spacing.md,
      marginVertical: theme.spacing.sm,
      marginHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      shadowColor: theme.shadow.light.shadowColor,
      shadowOffset: theme.shadow.light.shadowOffset,
      shadowOpacity: theme.shadow.light.shadowOpacity,
      shadowRadius: theme.shadow.light.shadowRadius,
      elevation: theme.shadow.light.elevation,
    },
    firstCard: {
      marginTop: theme.spacing.xxl, // Add margin top for the first card
    },
    authorName: {
      color: theme.text.accent,
      marginBottom: theme.spacing.xs,
    },
    cardTitle: {
      ...theme.typography.h2,
      marginBottom: theme.spacing.sm,
    },
    cardTitleDark: {
      color: theme.text.primary,
    },
    cardBody: {
      ...theme.typography.body1,
      marginBottom: theme.spacing.sm, // Reduce margin bottom
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    cardBodyDark: {
      color: theme.text.primary,
    },
    button: {
      backgroundColor: theme.button.primary.backgroundColor,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      textAlign: 'center',
    },
    buttonText: {
      color: theme.button.primary.textColor,
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
    },
    link: {
      marginTop: 0, // Remove margin top
      alignSelf: 'center', // Align the link to the center of the container
    },
    linkText: {
      color: theme.text.accent,
      textDecorationLine: 'underline',
    },
    cardContent: {
      paddingBottom: theme.spacing.sm, // Reduce padding bottom
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.sm, // Reduce margin top
    },
    commentsCount: {
      color: theme.text.accent,
      marginLeft: theme.spacing.sm,
    },
    postContainer: {
      padding: theme.spacing.md,
      marginHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.background.card,
    },
    postTitle: {
      ...theme.typography.h1,
      marginBottom: theme.spacing.sm,
    },
    authorLink: {
      ...theme.typography.body1,
      color: theme.text.link,
      textDecorationLine: 'underline',
      marginBottom: theme.spacing.sm,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border.light,
      marginVertical: theme.spacing.md,
    },
    postBody: {
      ...theme.typography.body1,
    },
    commentsSection: {
      padding: theme.spacing.md,
      marginHorizontal: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    commentsTitle: {
      ...theme.typography.h2,
      marginBottom: theme.spacing.md,
    },
    commentContainer: {
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      borderColor: theme.background.secondary,
      borderWidth: 1,
    },
    commentName: {
      ...theme.typography.subtitle,
      marginBottom: theme.spacing.xs,
    },
    commentEmail: {
      ...theme.typography.caption,
      marginBottom: theme.spacing.sm,
    },
    commentBody: {
      ...theme.typography.body1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: theme.spacing.md,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.md,
    },
    errorTitle: {
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    errorMessage: {
      textAlign: 'center',
    },
    noCommentsContainer: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderColor: theme.background.secondary,
      borderWidth: 1,
      alignItems: 'center',
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: theme.spacing.lg,
    },
    commentsList: {
      paddingBottom: theme.spacing.lg,
    },
    // Styles for about.tsx
    aboutContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background.primary,
    },
    aboutTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 12,
      color: theme.text.primary,
    },
    aboutSubtitle: {
      fontSize: 16,
      marginBottom: 24,
      lineHeight: 22,
      color: theme.text.primary,
    },
    aboutSeparator: {
      height: 1,
      width: '100%',
      marginVertical: 20,
      backgroundColor: theme.border.light,
    },
    aboutSectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.text.primary,
    },
    aboutScrollView: {
      flex: 1,
      marginBottom: 16,
    },
    aboutScrollViewContent: {
      paddingBottom: 20,
    },
    aboutTechCard: {
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.border.light,
      backgroundColor: theme.background.card,
      shadowColor: theme.shadow.light.shadowColor,
      shadowOffset: theme.shadow.light.shadowOffset,
      shadowOpacity: theme.shadow.light.shadowOpacity,
      shadowRadius: theme.shadow.light.shadowRadius,
      elevation: theme.shadow.light.elevation,
    },
    aboutTechHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    aboutTechName: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      marginRight: 10,
      color: theme.text.accent,
    },
    aboutVersionContainer: {
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: theme.background.secondary,
    },
    aboutTechVersion: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text.primary,
    },
    aboutTechDescription: {
      fontSize: 16,
      lineHeight: 22,
      marginTop: 8,
      color: theme.text.primary,
    },
    aboutFooter: {
      marginTop: 24,
      alignItems: 'center',
    },
    aboutFooterText: {
      fontSize: 14,
      opacity: 0.7,
      color: theme.text.primary,
    },
    // Styles for settings.tsx
    settingsContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background.primary,
    },
    settingsContentContainer: {
      flex: 1,
      padding: 16,
      paddingTop: 8,
    },
    sectionTitle: {
      marginTop: 24,
      marginBottom: 16,
      fontWeight: '700',
      color: theme.text.primary,
    },
    settingsGroup: {
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 24,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    settingsItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border.light,
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingInfo: {
      flex: 1,
      marginRight: 8,
    },
    settingTitle: {
      fontWeight: '600',
      color: theme.text.primary,
    },
    settingDescription: {
      marginTop: 4,
      color: theme.text.secondary,
    },
    themeOptionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
      flexWrap: 'wrap',
    },
    themeOption: {
      flex: 1,
      minWidth: 95,
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 4,
      marginBottom: 8,
      alignItems: 'center',
      backgroundColor: theme.background.card,
      borderColor: theme.border.light,
      borderWidth: 1,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    themeOptionActive: {
      borderColor: theme.button.primary.backgroundColor,
      borderWidth: 2,
      transform: [{ scale: 1.03 }],
    },
    themeIconContainer: {
      marginBottom: 12,
      padding: 8,
      borderRadius: 20,
    },
    themeTitle: {
      marginBottom: 4,
      textAlign: 'center',
      fontWeight: '600',
      color: theme.text.primary,
    },
    themeTitleActive: {
      fontWeight: '700',
      color: theme.button.primary.backgroundColor,
    },
    themeDescription: {
      textAlign: 'center',
      fontSize: 12,
      color: theme.text.secondary,
    },
  });
