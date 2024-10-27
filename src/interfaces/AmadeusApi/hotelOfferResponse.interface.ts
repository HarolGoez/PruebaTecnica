export interface HotelOfferResponse {
    headers: TransaccionHeaders;
    statusCode: number;
    request: Request;
    body: string;
    result: Result;
    data: HotelDataReceived[];
    parsed: boolean;
}

export interface HotelDataReceived {
    type: string;
    hotel: Hotel;
    available: boolean;
    offers: Offer[];
    self: string;
}

interface Hotel {
    type: string;
    hotelId: string;
    chainCode: string;
    dupeId: string;
    name: string;
    cityCode: string;
    latitude: number;
    longitude: number;
}

interface Offer {
    id: string;
    checkInDate: Date;
    checkOutDate: Date;
    rateCode: string;
    boardType: string;
    room: Room;
    guests: Guests;
    price: Price;
    policies: Policies;
    self: string;
}

interface Guests {
    adults: number;
}

interface Policies {
    cancellations: Cancellation[];
    guarantee: Guarantee;
    paymentType: string;
}

interface Cancellation {
    deadline: Date;
}

interface Guarantee {
    acceptedPayments: AcceptedPayments;
}

interface AcceptedPayments {
    creditCards: string[];
    methods: string[];
    creditCardPolicies: CreditCardPolicy[];
}

interface CreditCardPolicy {
    vendorCode: string;
}

interface Price {
    currency: string;
    base: string;
    total: string;
    taxes: Tax[];
    variations: Variations;
}

interface Tax {
    code: string;
    pricingFrequency: string;
    pricingMode: string;
    percentage?: string;
    included: boolean;
    amount?: string;
    currency?: string;
}

interface Variations {
    average: Average;
    changes: Change[];
}

interface Average {
    base: string;
}

interface Change {
    startDate: Date;
    endDate: Date;
    base: string;
}

interface Room {
    type: string;
    typeEstimated: TypeEstimated;
    description: Description;
}

interface Description {
    text: string;
    lang: string;
}

interface TypeEstimated {
    category: string;
    beds: number;
    bedType: string;
}

interface TransaccionHeaders {
    date: string;
    "content-type": string;
    "content-length": string;
    connection: string;
    "access-control-allow-headers": string;
    "access-control-allow-origin": string;
    "ama-request-id": string;
    "ama-gateway-request-id": string;
    "access-control-max-age": string;
    "access-control-allow-methods": string;
    server: string;
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
    hotelIds: string;
    adults: number;
    checkInDate: Date;
    checkOutDate: Date;
    rooms: number;
}

interface Result {
    data: HotelDataReceived[];
    warnings: Warning[];
}

interface Warning {
    code: number;
    title: string;
    detail: string;
    source: Source;
}

export interface Source {
    parameter: string;
}
