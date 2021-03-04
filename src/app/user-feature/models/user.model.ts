import { FeaturePermission } from "../../shared/permission-control/models/feature-permissions.model";

export interface IUserRequest {
    email: string;
    password: string;
}

export interface IUserResponse {
    name: string;
    email: string;
    featurePermission: FeaturePermission[]
}