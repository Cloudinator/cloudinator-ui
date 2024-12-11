export type ServiceType = 'frontend' | 'backend' | 'database' | 'subworkspace';

export interface Service {
    name: string;
    gitUrl: string;
    branch: string;
    subdomain: string;
    type: ServiceType;
}

export interface Workspace {
    uuid: string;
    name: string;
}

