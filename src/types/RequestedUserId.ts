const RequestedUserIdBrand = Symbol();

export type RequestedUserId = string & { [RequestedUserIdBrand]: unknown };

export function createUserId(rawId: string): RequestedUserId {
    return rawId as RequestedUserId;
}
