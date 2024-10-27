export interface HotelsOffersDto {
    country: string;
    city: string;
    checkInDate: string;
    checkOutDate: string;
    hotels: {
        name: string;
        hotelId: string;
        address: Address | undefined;
        price: {
            currency: string;
            total: string;
        }[];
    }[];
}

interface Address {
    countryCode: string;
}
