

export function toRad(degree: number): number {
    return degree * (Math.PI / 180);
}

export function toDeg(radians: number): number {
    return (radians / Math.PI) * 180;
}