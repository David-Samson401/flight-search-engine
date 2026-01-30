import axios from "axios";

const AMADEUS_BASE_URL = "https://test.api.amadeus.com";

// Cache for access token
let cachedToken = null;
let tokenExpiry = null;

/**
 * Get OAuth2 access token from Amadeus API
 * Caches the token until it expires
 */
export async function getAccessToken() {
  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 60000) {
    return cachedToken;
  }

  const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
  const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error(
      "Amadeus API credentials not found. Please set VITE_AMADEUS_API_KEY and VITE_AMADEUS_API_SECRET in your .env file.",
    );
  }

  try {
    const response = await axios.post(
      `${AMADEUS_BASE_URL}/v1/security/oauth2/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: apiSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    cachedToken = response.data.access_token;
    // Set expiry time (token usually valid for 1799 seconds)
    tokenExpiry = Date.now() + response.data.expires_in * 1000;

    return cachedToken;
  } catch (error) {
    console.error(
      "Failed to get Amadeus access token:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to authenticate with Amadeus API");
  }
}

/**
 * Search for flight offers
 * @param {string} origin - Origin airport IATA code (e.g., "JFK")
 * @param {string} destination - Destination airport IATA code (e.g., "LHR")
 * @param {string} departureDate - Departure date in YYYY-MM-DD format
 * @param {object} options - Additional search options
 * @returns {Promise<object>} Flight offers response
 */
export async function searchFlights(
  origin,
  destination,
  departureDate,
  options = {},
) {
  try {
    const accessToken = await getAccessToken();

    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: options.adults || 1,
      currencyCode: options.currencyCode || "USD",
      max: options.max || 20,
    };

    // Add optional parameters if provided
    if (options.returnDate) {
      params.returnDate = options.returnDate;
    }
    if (options.children) {
      params.children = options.children;
    }
    if (options.infants) {
      params.infants = options.infants;
    }
    if (options.travelClass) {
      params.travelClass = options.travelClass; // ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST
    }
    if (options.nonStop !== undefined) {
      params.nonStop = options.nonStop;
    }
    if (options.maxPrice) {
      params.maxPrice = options.maxPrice;
    }

    const response = await axios.get(
      `${AMADEUS_BASE_URL}/v2/shopping/flight-offers`,
      {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to search flights:",
      error.response?.data || error.message,
    );

    // Provide more specific error messages
    if (error.response?.status === 401) {
      // Token might be invalid, clear cache and retry once
      cachedToken = null;
      tokenExpiry = null;
      throw new Error("Authentication failed. Please try again.");
    }

    if (error.response?.status === 400) {
      const errorDetail = error.response?.data?.errors?.[0]?.detail;
      throw new Error(
        errorDetail || "Invalid search parameters. Please check your input.",
      );
    }

    throw new Error("Failed to search for flights. Please try again later.");
  }
}

/**
 * Transform Amadeus flight offer to app-friendly format
 * @param {object} offer - Amadeus flight offer
 * @param {object} dictionaries - Amadeus dictionaries (carriers, aircraft, etc.)
 * @returns {object} Transformed flight data
 */
export function transformFlightOffer(offer, dictionaries) {
  const firstSegment = offer.itineraries[0]?.segments[0];
  const lastSegment =
    offer.itineraries[0]?.segments[offer.itineraries[0].segments.length - 1];
  const segments = offer.itineraries[0]?.segments || [];

  // Calculate total duration
  const duration = offer.itineraries[0]?.duration || "";
  const formattedDuration = duration
    .replace("PT", "")
    .replace("H", "h ")
    .replace("M", "m")
    .trim();

  // Get carrier info
  const carrierCode = firstSegment?.carrierCode || "";
  const carrierName = dictionaries?.carriers?.[carrierCode] || carrierCode;

  // Determine stops
  const stopCount = segments.length - 1;
  const stopsText =
    stopCount === 0
      ? "Non-stop"
      : stopCount === 1
        ? "1 Stop"
        : `${stopCount} Stops`;

  return {
    id: offer.id,
    price: parseFloat(offer.price.total),
    currency: offer.price.currency,
    airline: carrierName,
    airlineCode: carrierCode,
    flightNumber: `${carrierCode}${firstSegment?.number || ""}`,
    origin: firstSegment?.departure?.iataCode || "",
    destination: lastSegment?.arrival?.iataCode || "",
    departureTime: formatTime(firstSegment?.departure?.at),
    arrivalTime: formatTime(lastSegment?.arrival?.at),
    duration: formattedDuration,
    durationMinutes: parseDurationToMinutes(duration),
    stops: stopsText,
    stopCount: stopCount,
    segments: segments.map((seg) => ({
      departure: seg.departure,
      arrival: seg.arrival,
      carrierCode: seg.carrierCode,
      flightNumber: `${seg.carrierCode}${seg.number}`,
      aircraft:
        dictionaries?.aircraft?.[seg.aircraft?.code] || seg.aircraft?.code,
      duration: seg.duration,
    })),
    bookingClass:
      offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ||
      "ECONOMY",
    seatsAvailable: offer.numberOfBookableSeats,
    rawOffer: offer, // Keep original for booking
  };
}

/**
 * Format ISO datetime to readable time
 */
function formatTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Parse ISO 8601 duration to minutes
 */
function parseDurationToMinutes(duration) {
  if (!duration) return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  return hours * 60 + minutes;
}
