// @generated by protobuf-ts 2.7.0 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "protobuf/apps/gs/response/device/item.proto" (package "protobuf.apps.gs.response.device", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
import { Device } from "../../device";
/**
 * @generated from protobuf message protobuf.apps.gs.response.device.Item
 */
export interface Item {
    /**
     * @generated from protobuf field: protobuf.apps.gs.Device data = 1;
     */
    data?: Device;
}
// @generated message type with reflection information, may provide speed optimized methods
class Item$Type extends MessageType<Item> {
    constructor() {
        super("protobuf.apps.gs.response.device.Item", [
            { no: 1, name: "data", kind: "message", T: () => Device }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message protobuf.apps.gs.response.device.Item
 */
export const Item = new Item$Type();
