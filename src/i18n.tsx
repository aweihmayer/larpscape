import { ConfigId } from "@/src";

export const I18N = {
    buttons: {
        edit: {
            en: "Edit",
            fr: "Modifier"
        },
        reset: {
            en: "Reset",
            fr: "Réinitialiser"
        },
        signin: {
            en: 'Sign in',
            fr: 'Se connecter'
        },
        signout: {
            en: "Sign out",
            fr: "Se déconnecter"
        },
        signup: {
            en: "Sign up",
            fr: "S'enregistrer"
        }
    },
    configs: {
        [ConfigId.OPEN_USER_SIGNUP]: {
            en: "Determines if guests are allowed to openly signup and create an account rather than doing so through a manager."
        },
        [ConfigId.SIGNUP_REQUIRES_EMAIL_CONFIRMATION]: {
            en: "Determines if new users are required to activate their accounts via email. If this is enabled, an email provider must be setup."
        },
        [ConfigId.MIN_USER_AGE]: {
            en: "Determines the minimum age a user must have to create an account."
        },
        [ConfigId.MAX_CHARACTERS_PER_USER]: {
            en: "Determines the maximum amount of characters a user can create."
        },
        [ConfigId.EMAIL_PROVIDER]: {
            en: "Determines the provider for email services."
        },
        [ConfigId.RESEND_API_KEY]: {
            en: "The API key used to send emails with Resend email provider."
        },
        [ConfigId.SYSTEM_EMAIL]: {
            en: "The email shown as the send for system generated emails."
        },
        [ConfigId.PAYMENT_PROVIDER]: {
            en: "Determines the provider for payment services for purchasing products."
        },
        [ConfigId.APP_LANG]: {
            en: "Determines the language of the user interface."
        },
        [ConfigId.APP_VERSION]: {
            en: "The version of the application."
        },
    },
    inputs: {
        password: {
            en: "Password",
            fr: "Mot de passe"
        },
        username: {
            en: "Username",
            fr: "Nom d'utilisateur"
        }
    },
    menu: {
        configs: {
            en: "Configurations",
            fr: "Configurations"
        },
        events: {
            en: "Events",
            fr: "Événements"
        },
        game: {
            en: "Game",
            fr: "Jeux"
        },
        home: {
            en: "Home",
            fr: "Accueil"
        },
        products: {
            en: "Products",
            fr: "Produits"
        },
        self: {
            account: {
                en: "Manager my account",
                fr: "Gérer mon compte"
            },
            events: {
                en: "My events",
                fr: "Mes événements"
            },
            purchases: {
                en: "My purchases",
                fr: "Mes achats"
            }
        },
        users: {
            en: "Users",
            fr: "Usagers"
        }
    },
    tables: {
        actions: {
            en: "Actions",
            fr: "Actions"
        },
        description: {
            en: "Description",
            fr: "Description"
        },
        id: {
            en: "ID",
            fr: "ID"
        },
        name: {
            en: "Name",
            fr: "Nom"
        },
        value: {
            en: "Value",
            fr: "Valeur"
        }
    },
    toasts: {
        error: {
            en: "Error",
            fr: "Erreur"
        },
        userNotFound: {
            en: "Incorrect username or password.",
            fr: "Nom d'utilisateur ou mot de passe incorrect."
        },
        signedIn: {
            en: "Signed in",
            fr: "Connecté"
        }
    }
}