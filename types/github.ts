export interface TreeItem {
    path: string;
    mode: string;
    type: 'tree' | 'blob';
    sha: string;
    size: number;
    url: string;
    lastCommit?: {
        message: string;
        date: string;
    };
}

export interface RepoStructure {
    sha: string;
    url: string;
    tree: TreeItem[];
}

