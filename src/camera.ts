import { Matrix4, Vector3 } from "math.gl";
import { toRad, toDeg } from "./helper/math";


export default class Camera {
    position: Vector3;
    front: Vector3;
    up: Vector3;
    right: Vector3;
    private fov: number;
    aspectRatio: number;
    private yaw: number;
    private pitch: number;
    constructor(position: Vector3, aspectRatio: number) {
        this.yaw = toRad(-90);
        this.pitch = toRad(90);
        this.position = position;
        this.front = new Vector3(0, 0, 1);
        this.up = new Vector3(0, 1, 0);
        this.right = new Vector3(1, 0, 0);

        this.fov = toRad(90);
        this.aspectRatio = aspectRatio;
    }
    set Pitch(value: number) {
        this.pitch = toRad(value);
        this.updateVectors();
    }
    get Pitch(): number {
        return toDeg(this.pitch);

    }
    get Yaw(): number {
        return toDeg(this.yaw);
    }
    set Yaw(value: number) {
        this.yaw = toRad(value);
        this.updateVectors();
    }

    getViewMatrix(): Matrix4 {
        var temp = new Vector3(this.position);

        temp.add(this.front);
        // return new Matrix4().lookAt(this.position,this.position +  this.front, this.up);
        // console.log(this.position, temp, this.up)
        return new Matrix4().lookAt(this.position, temp, this.up);
    }
    getProjectionMatrix(): Matrix4 {
        // console.log("test")
        // console.log(this.fov);
        // console.log(this.aspectRatio);
        // console.log({ fov: this.fov, fovy: this.fov, aspect: this.aspectRatio, near: 0.001, far: 20 })
        return new Matrix4().perspective({  fovy: this.fov, aspect: this.aspectRatio, near: 0.01, far: 120 });
        // return new Matrix4().perspective(
        // {
            // 
        // }    
        // });
    }
    updateVectors(): void {
        this.front.x = Math.cos(this.pitch) * Math.cos(this.yaw);
        this.front.y = Math.sin(this.pitch);
        this.front.z = Math.cos(this.pitch) * Math.sin(this.yaw);

        this.front = new Vector3(this.front).normalize();
        this.right = new Vector3(this.front).cross(new Vector3(0, 1, 0));
        this.up = new Vector3(this.right).cross(this.front).normalize();

    }
}