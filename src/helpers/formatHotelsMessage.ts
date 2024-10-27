import type { AddressHotelReceived, HotelBookingRequest, HotelDataReceived, IataInfo } from "../interfaces";

const airportData = require("aircodes");

export const formatHotelsMessage = (
    hotelsOffer: HotelDataReceived[],
    cityParameters: HotelBookingRequest,
    hotelAddressDto: AddressHotelReceived[]
) => {

    const { checkInDate, checkOutDate, roomQuantity } = cityParameters;
    const { country, city }: IataInfo = airportData.getAirportByIata(cityParameters.cityCode);

    const hotelsBooking = hotelsOffer.map((hotelOffer) => {
        const hotelAddress = hotelAddressDto.find((address) => {
            return address.hotelId === hotelOffer.hotel.hotelId;
        });

        return {
            name: hotelOffer.hotel.name,
            hotelId: hotelOffer.hotel.hotelId,
            address: hotelAddress?.address,
            price: hotelOffer.offers.map((offer) => {
                return {
                    currency: offer.price.currency,
                    total: offer.price.total,
                };
            }),
            roomsAvalaible: roomQuantity
        };
    });

    return {
        country,
        city,
        checkInDate,
        checkOutDate,
        hotels: hotelsBooking,
    };
};
