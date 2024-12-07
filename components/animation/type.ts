
type AnimationData = {
    v: string;
    fr: number;
    ip: number;
    op: number;
    w: number;
    h: number;
    nm: string;
    ddd: number;
    assets: object[];
    layers: object[];
};

export type LottieOptions = {
    loop: boolean;
    autoplay: boolean;
    animationData: AnimationData; // Update this line to accept AnimationData
    rendererSettings: {
        preserveAspectRatio: string;
    };
};

export interface AnimationProps {
    options: LottieOptions;
    width?: number;
    height?: number;
}

export interface ServiceProps {
    title: string;
    description: string;
    animationOptions: LottieOptions;
    gradientFrom: string;
    gradientTo: string;
    reverse?: boolean;
}

