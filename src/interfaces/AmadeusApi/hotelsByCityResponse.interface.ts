export interface HotelsResponse {
    headers: HotelsResponseHeaders;
    statusCode: number;
    request: Request;
    body: string;
    result: Result;
    data: Datum[];
    parsed: boolean;
}

interface Datum {
    chainCode: string;
    iataCode: Code;
    dupeId: number;
    name: string;
    hotelId: string;
    geoCode: GeoCode;
    address: Address;
    lastUpdate: Date;
}

interface Address {
    countryCode: CountryCode;
}

enum CountryCode {
    Co = "CO",
}

interface GeoCode {
    latitude: number;
    longitude: number;
}

enum Code {
    Mde = "MDE",
}

interface HotelsResponseHeaders {
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

interface Request {
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

interface RequestHeaders {
    "User-Agent": string;
    Accept: string;
    Authorization: string;
    "Content-Type": string;
}

interface Params {
    cityCode: Code;
}

interface Result {
    data: Datum[];
    meta: Meta;
}

interface Meta {
    count: number;
    links: Links;
}

interface Links {
    self: string;
}
