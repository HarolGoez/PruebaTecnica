
import { formatHotelsMessage } from "../helpers/formatHotelsMessage";
import type {
    AddressHotelResponse,
    HotelBookingRequest,
    HotelOfferResponse,
    HotelsOffersDto,
    HotelsResponse
} from "../interfaces";
import { getEnvs } from "../config/envs";

const Amadeus = require("amadeus");

export class AmadeusAction {

    private amadeus: any;

    constructor() {

        // Esto no es una buena practica pero fue la unica forma que encontre
        // para poner a funcionar el sdk de amadeus sin las credenciales,
        // porque el ejercicio requiere que el sistema devuelva un error 401 cuando
        // el usuario no ingrese las credenciales, pero el sdk de amadeus no permitia iniciar
        // el codigo sin usar las credenciales.  ya se que es raro, y no deberia de ser asi, 
        // pero no encontre otra forma de hacerlo.
        try {
            this.amadeus = new Amadeus({
                clientId: getEnvs().api_key,
                clientSecret: getEnvs().api_secret,
            });

        } catch (error) {
            console.log("You need write the credentials in the .env file");
        }
    }

    public searchHotelsInCity = async (cityParameters: HotelBookingRequest): Promise<HotelsOffersDto> => {
        try {
            const { data: hotelsList }: HotelsResponse = await this.amadeus.referenceData.locations.hotels.byCity.get({
                cityCode: cityParameters.cityCode,
            });

            //Para evitar el problema que sale Size of URI parameters exceeds 2048 bytes, debido a que hay muchos hoteles
            //para consultar, se exceden en los parametros de la petición, entonces limito los hoteles de consulta a 30.

            const hotelsIdSeparedByComma: string = hotelsList
                .slice(0, 30)
                .map((hotelsList) => {
                    return hotelsList.hotelId;
                })
                .join(",");

            const [{ data: hotelsOffersDto }, { data: addressHotelsDto }]: [HotelOfferResponse, AddressHotelResponse] =
                await Promise.all([
                    this.amadeus.shopping.hotelOffersSearch.get({
                        hotelIds: hotelsIdSeparedByComma,
                        adults: cityParameters.guests,
                        checkInDate: cityParameters.checkInDate,
                        checkOutDate: cityParameters.checkOutDate,
                        rooms: cityParameters.roomQuantity,
                    }),
                    this.amadeus.referenceData.locations.hotels.byHotels.get({
                        hotelIds: hotelsIdSeparedByComma,
                    }),
                ]);

            const hotelsOffers: HotelsOffersDto = formatHotelsMessage(
                hotelsOffersDto,
                cityParameters,
                addressHotelsDto
            );

            return hotelsOffers;

        } catch (error) {

            console.log(error);
            return {
                country: "error",
                city: "error",
                checkInDate: "error",
                checkOutDate: "error",
                hotels: [],
            };
        }
    };
}
