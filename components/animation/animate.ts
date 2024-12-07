import deploy from '@/public/cloud2.json';
import cd from '@/public/cd.json';
import infra from '@/public/infrastructure.json';
import cloud from '@/public/cloud1.json';
import { LottieOptions } from "@/components/animation/type";
import { Variants } from "framer-motion";

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





const createAnimation = (animationData: AnimationData): LottieOptions => ({
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
});

export const deployAnimation = createAnimation(deploy);
export const cloudAnimation = createAnimation(cloud);
export const infraAnimation = createAnimation(infra);
export const cdAnimation = createAnimation(cd);

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export const fadeUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
}

export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
}

export const scaleOnHover: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
}