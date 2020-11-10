export interface ContactConfig {
    name: string
    email: string
}

export interface SocialConfig {
    instagram: string
}

export interface ProgrammingConfig {
    github: string
}

export interface Config {
    contact: ContactConfig
    social: SocialConfig
    programming: ProgrammingConfig
}

export const CONFIG: Config = {
    contact: {
        name: 'Arjan Frans',
        email: 'arjanfrans.com@gmail.com'
    },
    social: {
        instagram: 'arjan.frans'
    },
    programming: {
        github: 'arjanfrans'
    }
}
