// @generated by protobuf-ts 2.7.0 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "protobuf/apps/gs/response/device/behind_device_versions_counters.proto" (package "protobuf.apps.gs.response.device", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message protobuf.apps.gs.response.device.BehindDeviceVersionsCounters
 */
export interface BehindDeviceVersionsCounters {
    /**
     * @generated from protobuf field: protobuf.apps.gs.response.device.BehindDeviceVersionsCounters.Data data = 1;
     */
    data?: BehindDeviceVersionsCounters_Data;
}
/**
 * @generated from protobuf message protobuf.apps.gs.response.device.BehindDeviceVersionsCounters.Data
 */
export interface BehindDeviceVersionsCounters_Data {
    /**
     * @generated from protobuf field: uint32 behind_one = 1;
     */
    behindOne: number;
    /**
     * @generated from protobuf field: uint32 behind_two = 2;
     */
    behindTwo: number;
    /**
     * @generated from protobuf field: uint32 behind_three_plus = 3;
     */
    behindThreePlus: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class BehindDeviceVersionsCounters$Type extends MessageType<BehindDeviceVersionsCounters> {
    constructor() {
        super("protobuf.apps.gs.response.device.BehindDeviceVersionsCounters", [
            { no: 1, name: "data", kind: "message", T: () => BehindDeviceVersionsCounters_Data }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message protobuf.apps.gs.response.device.BehindDeviceVersionsCounters
 */
export const BehindDeviceVersionsCounters = new BehindDeviceVersionsCounters$Type();
// @generated message type with reflection information, may provide speed optimized methods
class BehindDeviceVersionsCounters_Data$Type extends MessageType<BehindDeviceVersionsCounters_Data> {
    constructor() {
        super("protobuf.apps.gs.response.device.BehindDeviceVersionsCounters.Data", [
            { no: 1, name: "behind_one", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "behind_two", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "behind_three_plus", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message protobuf.apps.gs.response.device.BehindDeviceVersionsCounters.Data
 */
export const BehindDeviceVersionsCounters_Data = new BehindDeviceVersionsCounters_Data$Type();
