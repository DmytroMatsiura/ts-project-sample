import { GroupCallingLocation } from '@protots/apps/gs/group_calling_location'
import { GroupPhoneNumber } from '@protots/apps/gs/group_phone_number'
import { OncallGroup } from '@protots/apps/gs/oncall_group'
import { Nullable } from '@shared/models/types/primary'

export interface DeletableListType {
  id: number
  text: string
}

export interface TableRow {
  callingLocation: Nullable<GroupCallingLocation>
  dialedNumber: Nullable<GroupPhoneNumber>
  routeTo: Nullable<OncallGroup>
  oncallCallRouteId: number
}

export interface UpdateRow {
  row: TableRow
  newValue: number
}

export interface UpdateCallerId {
  id?: number
  callerId: string
}

export interface ISetting {
  label: string
  id: number
  condition(): boolean
  handler(): void
  warning: string
}
