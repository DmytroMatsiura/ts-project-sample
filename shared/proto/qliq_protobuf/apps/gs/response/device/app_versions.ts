// @generated by protobuf-ts 2.7.0 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "protobuf/apps/gs/response/device/app_versions.proto" (package "protobuf.apps.gs.response.device", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message protobuf.apps.gs.response.device.AppVersions
 */
export interface AppVersions {
    /**
     * @generated from protobuf field: uint32 ios = 1;
     */
    ios: number;
    /**
     * @generated from protobuf field: uint32 android = 2;
     */
    android: number;
    /**
     * @generated from protobuf field: uint32 mac = 3;
     */
    mac: number;
    /**
     * @generated from protobuf field: uint32 windows = 4;
     */
    windows: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class AppVersions$Type extends MessageType<AppVersions> {
    constructor() {
        super("protobuf.apps.gs.response.device.AppVersions", [
            { no: 1, name: "ios", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "android", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "mac", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "windows", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message protobuf.apps.gs.response.device.AppVersions
 */
export const AppVersions = new AppVersions$Type();
