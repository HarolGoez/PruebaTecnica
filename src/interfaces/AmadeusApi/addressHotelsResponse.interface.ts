export interface AddressHotelResponse {
    headers: AddressHotelResponseHeaders;
    statusCode: number;
    request: Request;
    body: string;
    result: Result;
    data: AddressHotelReceived[];
    parsed: boolean;
}

export interface AddressHotelReceived {
    chainCode: string;
    iataCode: IataCode;
    dupeId: number;
    name: string;
    hotelId: string;
    geoCode: GeoCode;
    address: Address;
    lastUpdate: Date;
}

export interface Address {
    countryCode: string;
}

export enum CountryCode {
    De = "DE",
}

export interface GeoCode {
    latitude: number;
    longitude: number;
}

export enum IataCode {
    Muc = "MUC",
}

export interface AddressHotelResponseHeaders {
    date: string;
    "content-type": string;
    "content-length": string;
    connection: string;
    "access-control-request-headers": string;
    "ama-request-id": string;
    "ama-gateway-request-id": string;
    "access-control-allow-headers": string;
    "access-control-max-age": string;
    "access-control-allow-methods": string;
    server: string;
    "access-control-allow-origin": string;
}

export interface Request {
    host: string;
    port: number;
    ssl: boolean;
    scheme: string;
    verb: string;
    path: string;
    params: Params;
    queryPath: string;
    bearerToken: string;
    clientVersion: string;
    languageVersion: string;
    appId: null;
    appVersion: null;
    headers: RequestHeaders;
    ListHTTPOverride: string[];
}

export interface RequestHeaders {
    "User-Agent": string;
    Accept: string;
    Authorization: string;
    "Content-Type": string;
}

export interface Params {
    hotelIds: string;
}

export interface Result {
    data: AddressHotelReceived[];
    meta: Meta;
}

export interface Meta {
    count: number;
    links: Links;
}

export interface Links {
    self: string;
}
