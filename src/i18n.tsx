import { ConfigId, Gender, Role } from "@/src";

export const I18N = {
    boolean: {
        true: {
            en: "Yes",
            fr: "Oui"
        },
        false: {
            en: "No",
            fr: "Non"
        }
    },
    buttons: {
        create: {
            en: "Create",
            fr: "Créer"
        },
        edit: {
            en: "Edit",
            fr: "Modifier"
        },
        reset: {
            en: "Reset",
            fr: "Réinitialiser"
        },
        save: {
            en: "Save",
            fr: "Sauvegarder"
        },
        select: {
            en: "Select",
            fr: "Sélectionner"
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
    constants: {
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
        data_type: {
            bool: {
                en: "Yes/No",
                fr: "Oui/Non"
            },
            float: {
                en: "Decimal number",
                fr: "Nombre décimal"
            },
            int: {
                en: "Whole number",
                fr: "Nombre entier"
            },
            str: {
                en: "Text",
                fr: "Texte"
            }
        },
        gender: {
            [Gender.MALE]: {
                en: "Man",
                fr: "Homme"
            },
            [Gender.FEMALE]: {
                en: "Woman",
                fr: "Femme"
            },
            [Gender.NON_BINARY]: {
                en: "Non-binary",
                fr: "Non binaire"
            },
            [Gender.UNDISCLOSED]: {
                en: "Undisclosed",
                fr: "Non divulgué"
            }
        },
        role: {
            [Role.GUEST]: {
                en: "Guest",
                fr: "Anonyme"
            },
            [Role.MEMBER]: {
                en: "Member",
                fr: "Membre"
            },
            [Role.MEMBER_PLUS]: {
                en: "Member+",
                fr: "Membre+"
            },
            [Role.REFEREE]: {
                en: "Referee",
                fr: "Arbitre"
            },
            [Role.MANAGER]: {
                en: "Manager",
                fr: "Gestionnaire"
            },
            [Role.ADMIN]: {
                en: "Administrator",
                fr: "Administrateur"
            },
            [Role.SUPER_ADMIN]: {
                en: "Super administrator",
                fr: "Super administrateur"
            },
            [Role.SYSTEM]: {
                en: "System",
                fr: "Système"
            },
        }
    },
    headings: {
        credentials: {
            en: "Credentials",
            fr: "Identifiants"
        },
        newUser: {
            en: "Create new user",
            fr: "Créer un utilisateur"
        },
        personalDetails: {
            en: "Personal details",
            fr: "Informations personnelles"
        }
    },
    models: {
        date_of_birth: {
            en: "Date of birth",
            fr: "Date de naissance"
        },
        email: {
            en: "Email",
            fr: "Address courriel"
        },
        first_name: {
            en: "First name",
            fr: "Prénom"
        },
        gender: {
            en: "Gender",
            fr: "Genre"
        },
        id: {
            en: "ID",
            fr: "ID"
        },
        last_name: {
            en: "Last name",
            fr: "Nom de famille"
        },
        password: {
            en: "Password",
            fr: "Mot de passe"
        },
        phone: {
            en: "Phone number",
            fr: "Numéro de téléphoneÈ"
        },
        role: {
            en: "Role",
            fr: "Rôle"
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
                en: "Manage my account",
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
        data_type: {
            en: "Data type",
            fr: "Type de valeur"
        },
        description: {
            en: "Description",
            fr: "Description"
        },
        id: {
            en: "ID",
            fr: "ID"
        },
        initial_value: {
            en: "Initial value",
            fr: "Valeur initiale"
        },
        is_editable: {
            en: "Is editable",
            fr: "Est modifiable"
        },
        is_secret: {
            en: "Is secret",
            fr: "Est secret"
        },
        name: {
            en: "Name",
            fr: "Nom"
        },
        options: {
            en: "Options",
            fr: "Options"
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