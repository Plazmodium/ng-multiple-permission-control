import { FeaturePermission } from "../../shared/permission-control/models/feature-permissions.model";

export interface User {
    name: string;
    email: string;
    featurePermission: FeaturePermission[]
}