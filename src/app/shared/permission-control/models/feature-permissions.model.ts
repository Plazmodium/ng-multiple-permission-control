import { Permission } from "./permission.enum";
import { Features } from "./features.enum";

export interface FeaturePermission{
    feature: Features;
    permission: Permission;
}