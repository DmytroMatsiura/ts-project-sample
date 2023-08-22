// @generated by protobuf-ts 2.7.0 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "protobuf/apps/gs/request/device/update.proto" (package "protobuf.apps.gs.request.device", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message protobuf.apps.gs.request.device.Update
 */
export interface Update {
    /**
     * @generated from protobuf field: uint32 id = 1;
     */
    id: number;
    /**
     * @generated from protobuf field: protobuf.apps.gs.request.device.Update.Data data = 2;
     */
    data?: Update_Data;
}
/**
 * @generated from protobuf message protobuf.apps.gs.request.device.Update.Data
 */
export interface Update_Data {
    /**
     * @generated from protobuf field: bool app_supported = 1;
     */
    appSupported: boolean;
    /**
     * @generated from protobuf field: bool battery_save = 2;
     */
    batterySave: boolean;
    /**
     * @generated from protobuf field: bool lock = 3;
     */
    lock: boolean;
    /**
     * @generated from protobuf field: bool unlock = 4;
     */
    unlock: boolean;
    /**
     * @generated from protobuf field: bool wipe_data = 5;
     */
    wipeData: boolean;
}
// @generated message type with reflection information, may provide speed optimized methods
class Update$Type extends MessageType<Update> {
    constructor() {
        super("protobuf.apps.gs.request.device.Update", [
            { no: 1, name: "id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "data", kind: "message", T: () => Update_Data }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message protobuf.apps.gs.request.device.Update
 */
export const Update = new Update$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Update_Data$Type extends MessageType<Update_Data> {
    constructor() {
        super("protobuf.apps.gs.request.device.Update.Data", [
            { no: 1, name: "app_supported", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "battery_save", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "lock", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "unlock", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "wipe_data", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message protobuf.apps.gs.request.device.Update.Data
 */
export const Update_Data = new Update_Data$Type();
