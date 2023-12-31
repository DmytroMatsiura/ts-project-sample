// @generated by protobuf-ts 2.7.0 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "protobuf/apps/gs/request/device/bulk_battery_update.proto" (package "protobuf.apps.gs.request.device", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message protobuf.apps.gs.request.device.BulkBatteryUpdate
 */
export interface BulkBatteryUpdate {
    /**
     * @generated from protobuf field: protobuf.apps.gs.request.device.BulkBatteryUpdate.Data data = 1;
     */
    data?: BulkBatteryUpdate_Data;
}
/**
 * @generated from protobuf message protobuf.apps.gs.request.device.BulkBatteryUpdate.Data
 */
export interface BulkBatteryUpdate_Data {
    /**
     * @generated from protobuf field: repeated uint32 device_ids = 1;
     */
    deviceIds: number[];
    /**
     * @generated from protobuf field: bool battery_save = 2;
     */
    batterySave: boolean;
}
// @generated message type with reflection information, may provide speed optimized methods
class BulkBatteryUpdate$Type extends MessageType<BulkBatteryUpdate> {
    constructor() {
        super("protobuf.apps.gs.request.device.BulkBatteryUpdate", [
            { no: 1, name: "data", kind: "message", T: () => BulkBatteryUpdate_Data }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message protobuf.apps.gs.request.device.BulkBatteryUpdate
 */
export const BulkBatteryUpdate = new BulkBatteryUpdate$Type();
// @generated message type with reflection information, may provide speed optimized methods
class BulkBatteryUpdate_Data$Type extends MessageType<BulkBatteryUpdate_Data> {
    constructor() {
        super("protobuf.apps.gs.request.device.BulkBatteryUpdate.Data", [
            { no: 1, name: "device_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "battery_save", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message protobuf.apps.gs.request.device.BulkBatteryUpdate.Data
 */
export const BulkBatteryUpdate_Data = new BulkBatteryUpdate_Data$Type();
