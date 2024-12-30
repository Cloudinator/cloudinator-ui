export type GitProvider = 'github' | 'gitlab'

export interface DeploymentState {
    step: 'provider' | 'github' | 'gitlab'
    gitProvider?: GitProvider
    projectName?: string
    branch?: string
    gitUrl?: string
    automate?: boolean
    accessToken?: string
}


export type BuildHistory = {
    status: string;
    buildNumber: number;
};

export type BuildNumberResponse = BuildHistory[];


